const User = require("../model/user.js");

const create_user = async (req, res) => {
  const user_info = req.body.user_info;

  try {
    const new_user = new User(user_info);
    const user = await new_user.save();
    user.generate_token();
    res.send({
      status: "success",
      message: "User created successfully.",
      data: {},
    });
  } catch (e) {
    res.status(400).send({
      status: "failure",
      message: e.message,
      data: {},
    });
  }
};

module.exports = {
  create_user,
};
