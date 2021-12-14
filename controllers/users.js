const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const constants = require("../constants/responses");


/**
 * Create an user
 * 
 * @param {*} event
 * @returns 
 */

 module.exports.createUser = async (event) => { 
    try {
        let userPost = null;
 
        //Creation request to database
        userPost = await prisma.user.create(  {data: JSON.parse(event)})

        return{
            body: userPost ,
            statusCode: constants.created
        } 

    } catch (error) {
      console.log("Error in  createUser user controller: ", error);
      return{
        body: "message" in error ? error.message : "Could not create the user from prisma DB", 
        statusCode: constants.badGateway
    } 


    }
  };


  /**
 * Get an user by ID
 * 
 * @param {*} user_id  
 * @returns 
 */

 module.exports.getUser = async (user_id) => { 
    try {
        let userGet = null;
 
        //Creation request to database
        userGet = await prisma.user.findUnique({ where: {id: user_id}});

        return{
            body: userGet ,
            statusCode: constants.ok
        } 

    } catch (error) {
      console.log("Error in  getUser user controller: ", error);
      return{
        body: "message" in error ? error.message : "Could not get the user from prisma DB", 
        statusCode: constants.badGateway
    } 


    }
  };


  /**
 * updated an user by ID
 * 
 * @param {*} user_id
 * @param {*} body 
 * @returns 
 */

 module.exports.updatedUser = async (user_id, body) => { 

    try {
      let userUpdate = null;

      dataItems = Object.keys(body)
      modelItems = ['name', 'balance']
     
      // start to search if the items to updated are can updated or are inside the model
      if (dataItems.every(r => modelItems.includes(r))) {
        
        //Creation request to database
        userUpdate = await prisma.user.update({
          where: {id: user_id,},
          data: body
        })

        return{
          body: userUpdate,
          statusCode: constants.ok
        } 

      } else {
        return{
          statusCode: constants.badRequest,
          body: "The user can only update the following items "+ modelItems,
        }
      }
    } catch (error) {
      console.log("Error in  updatedUser user controller: ", error);
      return{
        body: "message" in error ? error.message : "Could not create the user from prisma DB", 
        statusCode: constants.badGateway
    } 


    }
  };


    /**
 * updated the balance of an user by ID
 * 
 * @param {*} user_id
 * @param {*} body 
 * @returns 
 */

 module.exports.updatedBalanceUser = async (user_id, body) => { 

  try {
    let userUpdate = null;
    let userGet = null;

    dataItems = Object.keys(body)
    modelItems = ['name', 'balance']
   
    // start to search if the items to updated are can updated or are inside the model
    if (dataItems.every(r => modelItems.includes(r))) {
      
      userGet = await prisma.user.findUnique({ where: {id: user_id}});
      newBalance = userGet.balance + body.balance

      newBody = {
        ...body,
        balance : newBalance

      }

      //Creation request to database
      userUpdate = await prisma.user.update({
        where: {id: user_id,},
        data: newBody
      })

      return{
        body: userUpdate,
        statusCode: constants.ok
      } 

    } else {
      return{
        statusCode: constants.badRequest,
        body: "The user can only update the following items "+ modelItems,
      }
    }
  } catch (error) {
    console.log("Error in  updatedUser user controller: ", error);
    return{
      body: "message" in error ? error.message : "Could not create the user from prisma DB", 
      statusCode: constants.badGateway
  } 


  }
};

    /**
 * updated the balance of an user by ID
 * 
 * @param {*} user_id
 * @param {*} body 
 * @returns 
 */

     module.exports.transferBetweenUser = async (user_id, body) => { 

      try {
        let userUpdate = null;
        let userGet = null;
    
        dataItems = Object.keys(body)
        itemsTransferUser = ['balance', 'userTranferID']
       
        // start to search if the items to updated are can updated or are inside the model
        if (dataItems.every(r => itemsTransferUser.includes(r))) {

          // obtain the user who's goint to transfer

          userSend = await prisma.user.findUnique({ where: {id: user_id}});
          balanceUserSend = userSend.balance - body.balance

          console.log("lllllllllllllllllllll userSend", userSend)

          //Obtain the user to who the money will be transferred
          userReceive = await prisma.user.findUnique({ where: {id: body.userTranferID}});
          balanceuserReceive  = userReceive.balance + body.balance

          console.log("lllllllllllllllllllll userReceive",userReceive)


          if (balanceUserSend >= 0) {

          //Updated the balance of the user that send the money
          userSendUpdate = await prisma.user.update({
            where: {id: user_id,},
            data: {
              balance: balanceUserSend
            }
          })
          console.log("lllllllllllllllllllll userSendUpdate",userSendUpdate)


          userReceiveUpdate = await prisma.user.update({
            where: {id: body.userTranferID,},
            data: {
              balance: balanceuserReceive
            }
          })

          console.log("lllllllllllllllllllll userReceiveUpdate",userReceiveUpdate)

          return{
            body: userReceiveUpdate,
            statusCode: constants.ok
          } 
    
            
          } else {
            return{
              statusCode: constants.badRequest,
              body: "This doesn´t have enought balance to send this  amount, the user only can send: "+ userSend.balance,
            }
            
          }
   




          


    

    
          
        } else {
          return{
            statusCode: constants.badRequest,
            body: "To transfer between users must to send  only the following items "+ itemsTransferUser,
          }
        }
      } catch (error) {
        console.log("Error in  updatedUser user controller: ", error);
        return{
          body: "message" in error ? error.message : "Could not create the user from prisma DB", 
          statusCode: constants.badGateway
      } 
    
    
      }
    };