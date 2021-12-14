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
         
        } else {
          //In case the body of the request is not sent
          responseLambda.statusCode = constants.badRequest;
          responseLambda.body = constants.messageBadRequest;
        }
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


