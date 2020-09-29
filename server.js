/*
In this tutorial, you will learn how to connect your server to a NoSQL database called MongoDB. 
You will also learn how to refactor repetitive code, to make it easier to maintain. 
By the end of this you have a Rest API that can Create, Read, Update, and Delete (CRUD) documents in MongoDB.
*/

/* TO GET SERVER RUNNING IN TERMINAL:
1. Start the server with: 
    brew services start mongodb-community@4.4
2. Type: 
    npm run start
3. In a new terminal window, type in: 
    mongo
4. When finished, control+c the first terminal window and type:
    brew services stop mongodb-community@4.4
*/ 

/*
Good Job! 👍 You are finished! But, there is still much more you can do with Node.js, Express.js, and MongoDB. 
If you want to continue working on this, here are some next steps to improve security:

    Encrypt your user passwords with a library like "bcrypt" before saving them.

    Add a nested collection (activities, pets, blog posts, etc... ) to your User model using the "populate" method.

    Use a library like JSON web token to authenticate your users in a login route.

    Use middleware for your mongoose model or express routes to check if there is a valid token that matches the user's id before saving data.
*/

const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();

/* Now that we have a model, let's import it and connect to our database. 
Go to your server.js file and add these lines after all the libraries are imported. 
The first line makes our User model available to use in express routes. 
The second line connects us to a local mongoDB database called: userData. */
const User= require('./models/User');
mongoose.connect('mongodb://localhost/userData')

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

/* We are handling the response in the same way each time. 
We should define a function to shorten this and make it easier to maintain. 
Paste this in your server file above your routes: */
function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

// Now, let's call the "sendResponse" function in our mongoose callback functions:
/* We can shorten these routes further by using the JavaScript spread syntax, 
which copies each key/value pair in our newData object. */
/* This: 
{
  name:req.body.newData.name,
  email:req.body.newData.email,
  password:req.body.newData.password
} 

becomes this: {...req.body.newData}
*/

app.post('/users',(req,res)=>{
  User.create(
    {...req.body.newData},
    (err,data)=>{sendResponse(res,err,data)}
  )
})

app.route('/users/:id')
.get((req,res)=>{
  User.findById(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)})
})
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {new:true},
    (err,data)=>{sendResponse(res,err,data)})
})
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)})
})










// In the server.js file, you will notice some express routes set up for our users. 

/* CREATE (old code template)
app.post('/users',(req,res)=>{
  // User.create()
}) */

// CREATE (new code)
/* When you want to make a new document in MongoDB, you can simply call the "create" method on your mongoose model. 
The first argument is an object containing the values for the new document (stored in req.body). 
The next argument is a callback function, which handles the response (res) from the database.

app.post('/users',(req,res)=>{
  User.create(
    {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    },
    (err,data)=>{
    if (err){
      res.json({success: false,message: err})
    } else if (!data){
      res.json({success: false,message: "Not Found"})
    } else {
      res.json({success: true,data: data})
    }
  })
})


app.route('/users/:id') */
/* READ (old code template)
.get((req,res)=>{
  // User.findById()
}) */

// READ (new code)
/* Great, your user has an id of 5f7239451672097c537f1d61. 
This is what we will use in place of :id, as we make the other requests. 
Find the "READ" route in our server file, and replace it with this code:

.get((req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    if (err){
      res.json({
        success: false,
        message: err
      })
    } else if (!data){
      res.json({
        success: false,
        message: "Not Found"
      })
    } else {
      res.json({
        success: true,
        data: data
      })
    }
  })
})
*/
/* UPDATE (old code)
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
*/

// UPDATE (new code)
/* If you want to update a document in mongoDB, you can do it with the User.findByIdAndUpdate method. 
This takes three arguments (id, newData, callback). The id is still coming from "req.params", but newData is an object sent through the "req.body". 
Also, by default the update method will return the unmodified document. 
We can add an "options" argument before the callback ({new:true}) to make it return the modified document. 
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    },
    {
      new:true
    },
    (err,data)=>{
      if (err){
        res.json({
          success: false,
          message: err
        })
      } else if (!data){
        res.json({
          success: false,
          message: "Not Found"
        })
      } else {
        res.json({
          success: true,
          data: data
        })
      }
    }
  )
})
*/

/* DELETE (old code template)
.delete((req,res)=>{
  // User.findByIdAndDelete()
})
*/

/* To delete a document, you can use the User.findByIdAndDelete method, 
which takes an id and callback as arguments. 
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{
      if (err){
        res.json({
          success: false,
          message: err
        })
      } else if (!data){
        res.json({
          success: false,
          message: "Not Found"
        })
      } else {
        res.json({
          success: true,
          data: data
        })
      }
    }
  )
})
*/

/* Inside each (req,res) callback function we use mongoose methods on our User model to Create, Read, Update, and Delete individual user documents in our users collection. 
The "POST" route is different than the others because mongoDB automatically creates an ID for each document when it is created. 
We are using route chaining as a shorthand for the "GET", "PUT", and "DELETE" routes, since they all use the /users/:id endpoint. 
The :id part of the endpoint is a variable which can be accessed in the "req.params". */

