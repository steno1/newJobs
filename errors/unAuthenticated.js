import {StatusCodes} from "http-status-codes"
import CustomApiError from "./customApiError.js";

//custom error message
class UnAuthenticatedError extends CustomApiError {
    constructor(message) {
        super(message) 
        this.statusCode =StatusCodes.UNAUTHORIZED
      }
    }
    export default UnAuthenticatedError;