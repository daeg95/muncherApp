"use strict";

const UserController = require("../controllers/users");
const constants = require("../constants/responses");
const { constant } = require("async");


module.exports.users = async (event) => {
  //console.log("Event received: ", event);
  let responseLambda = {
    statusCode: 501,
    body: "Error in index",
  };

  try {
    switch (event.requestContext.http.method) {

      //Create an user
      case "POST":
        if (event.body) { 

          let createdUser = null
          createdUser = await UserController.createUser(event.body);
          
          responseLambda.statusCode = createdUser.statusCode
          responseLambda.body= JSON.stringify(createdUser.body)
         
        } else {
          //In case the body of the request is not sent
          responseLambda.statusCode = constants.badRequest;
          responseLambda.body = constants.messageBadRequest;
        }
      break;

      //Create an user
      case "PATCH":
        if (event.body && event.pathParameters.user_id) { 

          let updatedUser = null
          updatedUser = await UserController.updatedUser(JSON.parse(event.pathParameters.user_id),  JSON.parse(event.body));
          
          responseLambda.statusCode = updatedUser.statusCode
          responseLambda.body= JSON.stringify(updatedUser.body)
         
        } else {
          //In case the body of the request is not sent
          responseLambda.statusCode = constants.badRequest;
          responseLambda.body = constants.messageBadRequest;
        }
      break;



      }

  } catch (error) {
    console.log("error Handler User", error);

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


