const { successHandler, errorHandler } = require("../utils/successHandler.util");
const User = require("../models/user.model");
const AddUser = async (req, res, next) => {
  try {
    let { name, email, mobilenumber } = req.body;
    mobilenumber = parseInt(mobilenumber);

    const findUser = await User.findOne({ mobilenumber, email });
    if (findUser) {
      return await next(errorHandler(res, "User Already Exist", 400));
    } else {
      const user = new User({
        name: name,
        email: email,
        mobilenumber: mobilenumber,
        refreshToken: null,
      });
      await user.save();
      return next(successHandler(res, "User Added Successfully", 201));
    }
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  AddUser
};