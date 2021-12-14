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
 
        //Creation request to database
        userUpdate = await prisma.user.update({
          where: {id: user_id,},
          data: body
        })

        return{
            body: userUpdate,
            statusCode: constants.ok
        } 

    } catch (error) {
      console.log("Error in  updatedUser user controller: ", error);
      return{
        body: "message" in error ? error.message : "Could not create the user from prisma DB", 
        statusCode: constants.badGateway
    } 


    }
  };