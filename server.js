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

const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

/* Now that we have a model, let's import it and connect to our database. 
Go to your server.js file and add these lines after all the libraries are imported. 
The first line makes our User model available to use in express routes. 
The second line connects us to a local mongoDB database called: userData. */
const User= require('./models/User');
mongoose.connect('mongodb://localhost/userData')

const port=8000;
const app= express();

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
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
*/
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

app.route('/users/:id')
/* READ (old code template)
.get((req,res)=>{
  // User.findById()
}) */

// READ (new code)
/* Great, your user has an id of 5f7239451672097c537f1d61. 
This is what we will use in place of :id, as we make the other requests. 
Find the "READ" route in our server file, and replace it with this code:
*/ 
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

// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})

/* Inside each (req,res) callback function we use mongoose methods on our User model to Create, Read, Update, and Delete individual user documents in our users collection. 
The "POST" route is different than the others because mongoDB automatically creates an ID for each document when it is created. 
We are using route chaining as a shorthand for the "GET", "PUT", and "DELETE" routes, since they all use the /users/:id endpoint. 
The :id part of the endpoint is a variable which can be accessed in the "req.params". */

