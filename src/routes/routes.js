const express = require("express");
const { AddUser } = require("../controllers/register.controller");
const { LoginUser } = require("../controllers/login.controller");
const { Dashboard } = require("../controllers/dashboard.controller");
const authVerify = require("../middlewares/auth.middleware");
const { GenerateToken } = require("../controllers/getToken.controller");
const router = express.Router();


router.post("/api/v1/adduser", AddUser);
router.post("/api/v1/login", LoginUser);
router.get("/api/v1/getdashboardDetails", authVerify, Dashboard);
router.post("/api/v1/getToken", GenerateToken);


module.exports = router;