import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  const defaultStatus = {
    statusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong,try again later",
  };

  if (err.name === "ValidationError") {
    defaultStatus.statusCodes = err.statusCode || StatusCodes.BAD_REQUEST;
    defaultStatus.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
  }
  if (err.code && err.code === 11000) {
    defaultStatus.statusCodes = StatusCodes.BAD_REQUEST;
    defaultStatus.msg = `This ${Object.keys(
      err.keyValue
    )} has been sign up,please sign up with other ${Object.keys(err.keyValue)}`;
  }
  res.status(defaultStatus.statusCodes).json({ msg: defaultStatus });
};
export default errorHandlerMiddleware;
