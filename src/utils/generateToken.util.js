const jwt = require("jsonwebtoken");

const GenerateAccessAuthToken = (email, mobilenumber) => {
  mobilenumber = parseInt(mobilenumber);
  const token = jwt.sign(
    { email: email, mobilenumber: mobilenumber },
    process.env.ACCESS_TOKEN_SCERET,
    { expiresIn: "30m" }
  );
  return token;
};

const GenerateRefreshAuthToken = (email, mobilenumber) => {
  mobilenumber = parseInt(mobilenumber);
  const token = jwt.sign(
    { email: email, mobilenumber: mobilenumber },
    process.env.REFRESH_TOKEN_SCERET,
    { expiresIn: "1h" }
  );
  return token;
};
module.exports = {
  GenerateAccessAuthToken,
  GenerateRefreshAuthToken,
};
