
import "express-async-errors"
import express from "express";
import morgan from "morgan"

import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet"
import xss from "xss-clean"
import ExpressMongoSanitize from "express-mongo-sanitize";



import cors from "cors"
const app=express();


import dotenv from "dotenv";
dotenv.config();

//db and authenticate user
import connectDB from './db/connect.js';
//routers
import authRouter from "./routes/authRoutes.js";

import jobRouter from "./routes/jobRoutes.js";
// middleWare
import authenticateUser from "./middleware/auth.js";
import notFoundMiddleware from "./middleware/not_found.js";
import errorHandlerMiddleWare from "./middleware/error_handler.js";

//const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000']; // Replace with your frontend URL

/*
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};  */

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // ... rest of your code ...
});

if (process.env.NODE_ENV !== "production"){
app.use(morgan("dev"))
}

// Enable CORS for all routes
app.use(cors());
//app.use(cors(corsOptions));

const __dirname=dirname(fileURLToPath(import.meta.url))
/*obtains the directory name of the current module file and
 storing it in the __dirname constant.*/

//only when ready to deploy

app.use(express.static(path.resolve(__dirname, "./client/build")))
/* get the absolute path to the ./client/build directory.

app.use() function is used to add the static file-serving middleware
 to the Express application. This means that any requests for static
  files (e.g., CSS, JavaScript, images)
 made to the server will be served from the ./client/build directory.
*/



app.use(express.json());//makes json available in controllers

app.use(helmet());/* his middleware is used to set various HTTP
 headers to improve security*/
app.use(xss()) /* This middleware is used to sanitize user input
 to protect against Cross-Site Scripting (XSS) attacks.
 
 The xss() middleware intercepts incoming request data and
  sanitizes it by escaping or removing potentially dangerous
   HTML and JavaScript characters.*/
app.use(ExpressMongoSanitize()) /* This middleware is used to 
sanitize user-supplied data to prevent NoSQL injection attacks.
 NoSQL injection is a type of attack that targets NoSQL databases, 
 such as MongoDB, by exploiting vulnerabilities in the input 
 validation process.

The ExpressMongoSanitize() middleware intercepts incoming
 request data and sanitizes it by removing any keys or values 
 containing prohibited characters that could be used to manipulate
  MongoDB queries. This prevents attackers
 from executing malicious queries and protects your database.*/

//routes
app.use("/api/v1/auth", authRouter);

app.use("/api/v1",authenticateUser, jobRouter);


//only when ready to deploy
app.get("*", (req, res)=>{
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})
/* app.get() is a method in Express that registers a route handler 
for HTTP GET requests.The route pattern * is a wildcard that matches
 any path. So, this route handler will be invoked for any GET request
that hasn't been handled by a previous route.The route handler 
function takes two parameters: req (the request object) and res 
(the response object).Inside the route handler function, 
res.sendFile() is used to send a file in the response.path.resolve()
 is a function from the path module that resolves a sequence of paths
or path segments into an absolute path. It takes multiple arguments
and returns the absolute path.In this case, __dirname is the base
directory, "./client/build" is the relative path to the directory
containing the static files, and "index.html" is the file to be
sent.By using path.resolve(__dirname, "./client/build", "index.html"),
 we get the absolute path to the index.html file inside the 
 ./client/build directory.The res.sendFile() method sends the
  specified file (in this case, index.html) as the response to the 
  client.This code is typically used when serving a single-page
   application (SPA) built with frameworks like React, Vue, or 
   Angular. It ensures that for any unmatched routes, the index.html
   file is sent back to the client. This is important because the
  SPA's JavaScript code is responsible for handling the routing
   on the client-side.By sending the index.html file, the
   client's browser will load the SPA and then handle the 
  routing internally based on the requested URL. This enables
   the SPA to provide a seamless user experience with dynamic
   content updates without a full page reload.*/

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const port=process.env.PORT || 5000;


//restart server if only connection to db was successful
const start=async ()=>{
    try {
       await connectDB(process.env.MONGO_URL)
       app.listen(port, ()=>{
        console.log(`server is listening on port ${port}`)
    });
    } catch (error) {
      console.log(error);  
    }
}
start();