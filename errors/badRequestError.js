import {StatusCodes} from "http-status-codes"
import CustomApiError from "./customApiError.js";

//custom error message
class BadRequestError extends CustomApiError {
    constructor(message) {
        super(message) 
        this.statusCode =StatusCodes.BAD_REQUEST
      }
    }
    export default BadRequestError;