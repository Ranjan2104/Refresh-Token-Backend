const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SCERET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token or Token Expired" });
  }
};

module.exports = authVerify;