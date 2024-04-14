const {
  successHandler,
  errorHandler,
} = require("../utils/successHandler.util");
const User = require("../models/user.model");
const {
  GenerateAccessAuthToken,
  GenerateRefreshAuthToken,
} = require("../utils/generateToken.util");
const LoginUser = async (req, res, next) => {
  try {
    let { email, mobilenumber } = req.body;
    mobilenumber = parseInt(mobilenumber);

    const findUser = await User.findOne({ mobilenumber, email });
    if (findUser) {
      const getAccessToken = await GenerateAccessAuthToken(email, mobilenumber);
      const getRefreshToken = await GenerateRefreshAuthToken(
        email,
        mobilenumber
      );
      const data = {
        refreshToken: getRefreshToken,
        accessToken: getAccessToken,
      };
      findUser.refreshToken = getRefreshToken;
      await findUser.save();
      return await next(successHandler(res, "Login Successful", 200, data));
    } else {
      return next(errorHandler(res, "User Not Found", 400));
    }
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  LoginUser,
};
