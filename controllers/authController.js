/*
In the context of React and Node.js web applications, 
a controller is a module or function that handles a specific
 request or set of requests from a client 
 (typically a browser or mobile app).
 Controllers act as an intermediary between the client
  and the database, and they are responsible for processing
   incoming requests, fetching or updating data from the database, 
   and returning a response back to the client.

In the case of Node.js, controllers are typically implemented as
 functions or methods that are registered as routes using a
  web framework like Express. For example, a controller might handle 
  a POST request to create a new user in the database:*/

import User from "../models/User.js"
import {StatusCodes} from "http-status-codes"
import {BadRequestError, UnAuthenticatedError} from "../errors/index.js";

//Register

const register =async(req, res)=>{
    const {name, email, password}=req.body;
    //i used "express-async-error" package for Authentication
    
    if(!name|| !email || !password ){
        throw new BadRequestError("Please provide all the compulsory field")
    }
    const userAlreadyExist= await User.findOne({
       email 
    })
    if(userAlreadyExist){
throw new BadRequestError("Email already in use")
    }
    const user=await User.create(
        {name,email,password}
    )
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user:{
        email:user.email,
        lastName:user.lastName,
        location:user.location,
        name:user.name
    }, token })
  
}

const login =async(req, res)=>{
    const {email, password}=req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide all values")
    }
    const user =await User.findOne({email}).select("+password")
if(!user){
throw new UnAuthenticatedError("Invalid credentials. Email does not exist")
}
console.log(user)
const isPasswordCorrect= await user.comparePassword(password)
if(!isPasswordCorrect){
    throw new UnAuthenticatedError("Invalid credentials. Wrong Password")
}
const token=user.createJWT()
user.password=undefined//remove password from response

/*const {password:userPassword, ...info}=user._doc;
    return res.status(StatusCodes.OK).json({...info, token}) }*/

res.status(StatusCodes.OK).json({user,
    token,
location:user.location})
} 

const update =async(req, res)=>{
    const {email, name, lastName, location}=req.body
    if(!email || !name || !lastName || !location){
throw new BadRequestError("Please provide all values")
    }
    //check user whose id matches
 const user=await User.findOne({_id:req.user.userId}) 
 /* The controller uses the User model and the findOne
  method to find the user whose id matches the req.user.userId.
   This assumes that the user is authenticated and
  the userId is stored in the req.user object.*/

  /* Updating the User's Information:
Once the user is found, the controller updates the user's
 email, name, lastName, and location fields
 with the values provided in the request body.*/
 user.email=email
 user.name=name 
 user.lastName=lastName
 user.location=location
 /*Saving the Updated User:
The updated user object is saved back to the database using the
 save method. This ensures that the changes are persisted. */
 await user.save(); 

 //create a new token
 /* Creating a New Token:
After saving the updated user, a new JWT token is generated for 
the updated user using the createJWT method of the user object.
 This token can be used for subsequent authenticated requests.*/
 const token=user.createJWT()
 res.status(StatusCodes.OK).json({user, token, location:user.location})
    console.log(req.user);
    
}
export  { register, login, update}