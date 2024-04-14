const {
  successHandler,
  errorHandler,
} = require("../utils/successHandler.util");
const User = require("../models/user.model");
const Dashboard = async (req, res, next) => {
  try {
    let {email, mobilenumber} = req.user;
    const findUser = await User.findOne({ email, mobilenumber }).select("-refreshToken -updatedAt -__v");
    if (findUser) {
      return next(successHandler(res, "Details Send Successfully", 200, findUser));
    } else {
      return next(errorHandler(res, "User Not Found", 400));
    }
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  Dashboard,
};
