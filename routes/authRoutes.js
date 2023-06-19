/* 
In the context of React and Node.js, routes refer to 
the mapping of URLs (Uniform Resource Locators)
 to specific actions or
 components within an application.
 In Node.js, routes are typically defined using a framework 
 such as Express. Express allows you to define routes for your
application by specifying the HTTP method (such as GET or POST),
the URL pattern to match, and a callback function to execute when
 the route is requested. This allows you to handle different types
 of requests and serve different responses based on
  the URL and HTTP method.
*/

import express from 'express'

const router = express.Router();
import rateLimiter from "express-rate-limit"

const apilimiter = rateLimiter({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 10,
     message:"Too many request from this Ip address, please try again after 15 minutes"
   });

import { register,
     login,
      update
     } from "../controllers/authController.js";
     import authenticateUser from '../middleware/auth.js';

//set up routers

router.route("/register").post(apilimiter, register)
router.route("/login").post(apilimiter, login)
router.route("/update").patch(authenticateUser, update)


export default router