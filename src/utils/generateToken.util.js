const jwt = require("jsonwebtoken");

const GenerateAccessAuthToken = (email, mobilenumber) => {
  mobilenumber = parseInt(mobilenumber);
  const token = jwt.sign(
    { email: email, mobilenumber: mobilenumber },
    process.env.ACCESS_TOKEN_SCERET,
    { expiresIn: "40s" }
  );
  return token;
};

const GenerateRefreshAuthToken = (email, mobilenumber) => {
  mobilenumber = parseInt(mobilenumber);
  const token = jwt.sign(
    { email: email, mobilenumber: mobilenumber },
    process.env.REFRESH_TOKEN_SCERET,
    { expiresIn: "3m" }
  );
  return token;
};
module.exports = {
  GenerateAccessAuthToken,
  GenerateRefreshAuthToken,
};
