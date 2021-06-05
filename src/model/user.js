const { Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validateEmail.test(value)) throw new Error("Invalid email used.");
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_KEY);
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.pre("save", async function (exit) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  exit();
});

module.exports = model("User", userSchema);
