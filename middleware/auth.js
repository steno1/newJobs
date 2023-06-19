import Jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  console.log("token:", token);

  try {
    const payload = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log("Error:", error.message);
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default authenticateUser;
