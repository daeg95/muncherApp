"use strict";

const OrderController = require("../controllers/orders");
const UserController = require("../controllers/users");
const constants = require("../constants/responses");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.orders = async (event) => {
  //console.log("Event received: ", event);
  let responseLambda = {
    statusCode: 501,
    body: "Error in index",
  };

  try {
    switch (event.requestContext.http.method) {

      //Create an user
      case "POST":
        if (event.body && event.pathParameters.user_id) {

          
          // Find is the user exist 
          let userModel
          userModel = await UserController.getUser(JSON.parse(event.pathParameters.user_id));

          // If the user exist pass to create the purchase of the products
          if (userModel.body != null) {

            let createdOrder = null
            createdOrder= await OrderController.createOrder(event);

            responseLambda.statusCode = createdOrder.statusCode;
            responseLambda.body = JSON.stringify(createdOrder.body);
            
          } else {
            responseLambda.statusCode = constants.notFound;
            responseLambda.body = constants.messageNotFound;
            
          }
          

          // const porder = await prisma.order.create(
          //    {
          //             data: {
                        
          //               products:{
          //                 "mango":3000,
          //                 "uva":5000,
          //                 "manzana":900
          //               },
          //               userId:1
          //           }
          //         }
          //           )


            // const hola =       await prisma.user.findUnique({
            //           where: {
            //             id: 100,
            //           },
            //           // include: {
            //           //   orders : true, // All posts where authorId == 20
            //           // },
            //         });


            //         console.log("hhhhhhhhhhhhhh", hola)


         
        } else {
          //In case the body of the request is not sent
          responseLambda.statusCode = constants.badRequest;
          responseLambda.body = constants.messageBadRequest;
        }
      break;

        //GET method get the items filtered, order and page and  get by ID  
        case "GET":
          // if (event.pathParameters && "user_id" in event.pathParameters && event.pathParameters.user_id) { 
          //   responseLambda.body = await User.getUser(event.pathParameters.user_id);
          //   responseLambda.statusCode = 200;
          // } else if (event.queryStringParameters) {

          //   if('user_id' in event.queryStringParameters && event.queryStringParameters.user_id) {
          //     responseLambda.body = await User.getUsersByUserId(event.queryStringParameters.user_id, event.queryStringParameters.filterby, event.queryStringParameters.orderBy, parseInt(event.queryStringParameters.page), parseInt(event.queryStringParameters.size))
          //     responseLambda.statusCode = 200;
          //   } else {
          //     // If the user wants filter, order and paginate
          //     responseLambda.body  = await User.filterUsers(
          //       'filterby' in event.queryStringParameters && event.queryStringParameters.filterby ? event.queryStringParameters.filterby : null, 
          //       'orderBy' in event.queryStringParameters && event.queryStringParameters.orderBy ? event.queryStringParameters.orderBy : null, 
          //       'page' in event.queryStringParameters && event.queryStringParameters.page ? parseInt(event.queryStringParameters.page) : null, 
          //       'size' in event.queryStringParameters && event.queryStringParameters.size ? parseInt(event.queryStringParameters.size) : null
          //     );
          //     responseLambda.statusCode = 200;



          //   }
          // } else {

          //   //In case the query string Parametersis not sent
          //   return {
          //     statusCode: _constants.badRequest,
          //     body: _constants.messageBadRequest,
          //     headers: {
          //       "Access-Control-Allow-Origin": "*",
          //       "Access-Control-Allow-Credentials": true,
          //     },
          //   };
          // }
        break;

        //Here you update the user by ID
        case "PATCH":

          // if (event.body) {

          //   responseLambda.body = await User.updateById(event.pathParameters.user_id, JSON.parse(event.body), type);
          //   responseLambda.statusCode = 200;
         
          // } else {
          //   responseLambda.statusCode = _constants.badRequest;
          //   responseLambda.body = _constants.messageBadRequest;
          // }  
        break;

        //  Here you delete the user by ID
        case "DELETE":
          // if (event.pathParameters.user_id) {
          //   responseLambda.body = await User.deleteById(event.pathParameters.user_id);
          //   responseLambda.statusCode = 200;
          // } else {
          //   responseLambda.body = "please send user_id in the path",
          //   responseLambda.statusCode = _constants.badRequest;
          // }
        break;


      }

  } catch (error) {
    console.log("error Handler Order", error);

    responseLambda.body = "message" in error ? error.message : "The request could no be processed";
    responseLambda.statusCode = "statusCode" in error ? error.statusCode : "501";
  }
  finally {
    return responseLambda
  }
};


// module.exports.users = async (event) => {

//   console.log(event)


//   // const user = await prisma.user.create({
//   //   data: {
//   //     email: 'ariadne@edru.io',
//   //     name: 'Ariadne',
//   //     balance: 4500
//   //   },
//   // })


//   // return {
//   //   statusCode: 200,
//   //   body: JSON.stringify(event   ),
//   // };



// };


