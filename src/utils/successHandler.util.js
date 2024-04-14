const errorHandler = (res, message, statusCode) => {
    return res
      .status(statusCode)
      .json({ status: statusCode, message, success: false });
  };
  
  const successHandler = (res, message, statusCode, data) => {
    return res.status(statusCode).json({
      status: statusCode,
      success: true,
      message,
      data
    });
  };
  
  module.exports = { errorHandler, successHandler };