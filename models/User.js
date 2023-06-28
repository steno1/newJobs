/* 
In the context of React and Node.js,
 a model typically refers to a representation of data or
a schema for data that is used to interact with a database or
other data storage system.

In a Node.js application, you might use a model to define
 the structure of a collection in a MongoDB database or to 
 define the fields and data types for a table in a SQL database.
  Models can also be used to perform validation,
 to enforce business logic, and to provide a layer of abstraction
  between your application code and the underlying database.

In a React application, you might use a model to represent data 
that is retrieved from a server or API. This model can be used to
 store the data in a standardized format and provide a consistent 
 
interface for accessing and updating the data throughout your
  application.*/
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const UserSchema=new mongoose.Schema({
    name:{type:String, required:[true, "please provide name"],
minlength:2, maxlength:45, trim:true},

email:{type:String, required:[true, "please provide email"],
//see custom validator in mongoose documentation
validate: {
    validator:validator.isEmail,//validator library was installed and used instead of the
    message:"please provide a valid email"
  },
  
unique:true},
/* documentation on not passing password to frontend
 https://mongoosejs.com/docs/api/schematype.html#SchemaType.prototype.select()*/
password:{type:String,
   required:[true, "please provide password"],
   minlength: 4,
  
 select:false//remove from being passed to frontend
},

lastName:{type:String, maxlength:25, trim:true, default:"Last Name"},
location:{type:String, maxlength:25, trim:true, default:"My City"},


})
// from mongoose documentation
/* Within the function passed to the pre hook, this refers to
 the document being saved.
 It represents an individual instance of the UserSchema.
*/
UserSchema.pre('save', async function() {
  //console.log(this.modifiedPaths())
  if(!this.isModified("password"))return

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


//https://mongoosejs.com/docs/guide.html#methods
UserSchema.methods.createJWT=function(){
  return jwt.sign({userId:this._id},
    process.env.JWT_SECRET,
    //all key generator site for secret generation
    
    {
    expiresIn:process.env.JWT_LIFETIME
    
  }
   
  )
}
/* 
In the given code snippet, methods is a keyword used in Mongoose
 to define instance methods for a schema. It allows you to add
  custom methods to the instances of a particular schema.

  In above code, createJWT is being added as an instance
   method to the UserSchema. This method generates a JSON 
   Web Token (JWT) for a user instance.
*/
UserSchema.methods.comparePassword=async function(candidatePassword){
  const isMatch=await bcrypt.compare(candidatePassword, this.password)
  return isMatch;
  
}
/* 
bcrypt.compare():

bcrypt is a library used for password hashing and comparison.
The compare() function is used to compare a plain text password
 (referred to as candidatePassword)with a hashed password
  (referred to as this.password) stored in the user instance.
The compare() function takes two parameters: the candidate password
 and the hashed password to compare against.

The await keyword is used to wait for the comparison operation
 to complete before proceeding further.
In order to use await, the function containing this code snippet
 must be declared as async. It allows the code to use asynchronous
  operations and wait for their completion.

The result of the comparison operation is stored in the variable
 isMatch.If the candidate password matches the stored hashed password,
  isMatch will be true. Otherwise, it will be false.


*/
export default mongoose.model("User", UserSchema)