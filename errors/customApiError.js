
class CustomApiError extends Error {
    constructor(message) {
      super(message) 
    }
}
export default CustomApiError;

/* customApiError is an instance of Error from
 throw new  in authController*/