const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const UserController = require("../controllers/users");
const constants = require("../constants/responses");


/**
 * Create an user
 * 
 * @param {*} event Lambda handler invocation event 
 * @returns 
 */

 module.exports.createOrder = async (event) => { 
    try {

        let productsOrder = JSON.parse(event.body)
        let user_id = JSON.parse(event.pathParameters.user_id)

        // We obtain the total products valua and compare with the balance

        valueProductsOrder =  Object.values(productsOrder)
        totalValue = valueProductsOrder.reduce((a, b) => a + b, 0);
        userGet = await UserController.getUser(user_id);

          if ( userGet.body.balance >= totalValue) {

            let newBalance = userGet.body.balance - totalValue;

            body_order = {
              data: {
                products: productsOrder,
                userId: user_id
                    }
              }

            orderPost = await prisma.order.create(body_order )
            console.log("3333333333333", orderPost)

            bodyUpdated = {balance : newBalance}
            userUpdate = await UserController.updatedUser(user_id, bodyUpdated);

              console.log("3333333yyyyyyyy333333", userUpdate.body)

            
          
            UserOrderGet = await prisma.user.findUnique(
              {
                where: {id: user_id},
                include: {orders : true}
              }
              );
  
            return{
              body: UserOrderGet,
              statusCode: constants.ok
            } 
            
          } else {

            return{
              body: constants.messageNotOrder ,
              statusCode: constants.badRequest
            } 
            
          }





    } catch (error) {
      console.log("Error in  createOrder order controller: ", error);
      return{
        body: "message" in error ? error.message : "Could not create the user from prisma DB", 
        statusCode: constants.badGateway
    } 


    }
  };