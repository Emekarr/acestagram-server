const express = require("express");
const { create_user } = require("../../controller/user_controller.js");

const router = express.Router();

router.post("/v1/account/signup", create_user);

module.exports = router;
