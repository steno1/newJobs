
import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleWare=(err, req, res, next)=>{
    //console.log(err)
    
    const defaultError = {
        statusCode:err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR,
        // statusCode:err.statusCode from basRequestError.js
        msg: err.message || "Something went wrong, try later"
       /*msg: err.message  from throw new BadRequestError
       ("Please provide all the compulsory field")in error_handler.js
        */ 
    }
/* err.message is from register controller*/
    if (err.name === 'ValidatorError'){
        defaultError.statusCode=StatusCodes.BAD_REQUEST;
       // defaultError.msg=err.message
defaultError.msg=Object.values(err.errors).map
((item)=>item.message).join("")
/*iterate the msg array, map out all the object and return message
object and join them as one string */
    }
    if(err.code && err.code===11000){
        defaultError.statusCode=StatusCodes.BAD_REQUEST;
defaultError.msg=`${Object.keys(err.keyValue)} field has to be unique`
    }
    
   res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}
export default errorHandlerMiddleWare;