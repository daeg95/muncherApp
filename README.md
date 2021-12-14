# Muncher Backend
## Development server
Install dependencies with npm install.
you must have postgres installed and change the .env with you credential to probe locally
Run `serverless offline` for a dev server. 

## Request

You can probe locally with the following request.
  ## Create an user 
  Create an user with the following fields name, email, balance, id, createdAt, and updatedAt 

    URL
    http://localhost:3000/users

    Body
    {
      "email": "ariadne@eahhdffeus.io",
      "name": "Ariadne",
      "balance": 450000
    }
  ## Create an order
  Create an order for the user. Therefore, it first evaluates if the total of the order is less than the user's balance, if it is true, it goes on to discount the total of the order to the balance. 

    URL
    http://localhost:3000/orders/{user_id} --> the user must exist in the database 

    Body --> is the name of the products and the price
    {
      "mango": 39, 
      "banano":0,
      "fresa": 0
    }

  ## Increase the user balance
  Increases the current balance of the user, the amount that is sent

    URL
    http://localhost:3000/users/{user_id} --> the user must exist in the database 

    Body --> is the name of the products and the price
    {
    "balance": 50000,
    "name": "dani"
    }