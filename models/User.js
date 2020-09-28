/* Let's start by making a User model for mongodb using the mongoose library. 
This will be the template used to describe what each individual document will look like in our collection. */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports= mongoose.model('User',UserSchema)

/* Looks like a JS object doesn't it? 
That is one of the cool things about MongoDB, it is easy to transfer data from the frontend to the backend. 
Think of this as a factory, or mold, that can create new User documents in a User collection.

Looking at the model above, which key (name, email, or password) needs to have unique values? */
// email

/* Correct! In this case, emails need to be unique. 
It makes sense to have at least one unique value, to avoid errors with authentication later on.

Here we are using route chaining as a shorthand for the "get", "put", and "delete" routes, since they all use the '/users/:id' endpoint. 
Remember that in 'users/:id' endpoint, id is a variable which can be accessed in the "req.params". */

/* You can use the mongo shell to visualize your database and manipulate it through the command line. 
Before setting up our express routes with mongoose, try doing the following mongo shell commands:
    1. Open a new console and type in the mongo command.
        mongo
    2. Select our database: 
        use userData
    3. Insert a new user into a users collection:
        db.users.insertOne({name:"octocat",email:"octo@cat.com",password:"password"})
    4. Find all users: 
        db.users.find()
    5. Delete all users: 
        db.users.drop()
*/




