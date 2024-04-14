const {
  successHandler,
  errorHandler,
} = require("../utils/successHandler.util");
const jwt = require("jsonwebtoken");
const { GenerateAccessAuthToken } = require("../utils/generateToken.util");

const User = require("../models/user.model");
const GenerateToken = async (req, res, next) => {
  try {
    let { refreshtoken } = req.body;
    const decoded = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SCERET);
    if (!decoded) {
      return next(errorHandler(res, "Invalid Token or Expired", 401));
    }
    let { email, mobilenumber } = decoded;
    const findUser = await User.findOne({ email, mobilenumber });
    if(findUser.refreshToken !== refreshtoken) {
        return next(errorHandler(res, "Refresh Not Matched", 400))
    }
    const getAccessToken = await GenerateAccessAuthToken(email, mobilenumber);
    const data = {
      accessToken: getAccessToken,
    };
    return next(successHandler(res, "new access token created", 201, data));
  } catch (error) {
    console.log("error", error.message);
    if(error.message === "jwt expired") return next(errorHandler(res, "Refresh Token Expired, Login again!", 401));
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  GenerateToken,
};
