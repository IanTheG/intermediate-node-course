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

// CREATE
app.post('/users',(req,res)=>{
  // User.create()
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
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

