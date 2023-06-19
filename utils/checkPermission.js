import { UnAuthenticatedError } from "../errors/index.js";
const checkPermission=(requestUser, resourceUserId)=>{
if(requestUser.userId===resourceUserId.toString())return

throw new UnAuthenticatedError("Not authorized to access this route")
}

export default checkPermission;

/* This function takes in two parameters: requestUser and 
resourceUserId. It checks if the userId property of requestUser
 matches the resourceUserId (after converting it to a string). 
 If the condition is not met, an instance of the UnAuthenticatedError 
 class is thrown with the message "Not authorized to access this route".

The checkPermission function is exported as the default export:*/