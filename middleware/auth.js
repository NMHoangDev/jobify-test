import { StatusCodes } from "http-status-codes";
import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeaders.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (error) {
    console.log(error);
  }
  next();
};
export default auth;
