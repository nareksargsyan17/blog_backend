const { User } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkingPass = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const { password } = req.body;

  const user = await User.findByPk(id);

  const isSame = await bcrypt.compare(password, user.password);

  if (!isSame) {
    return res.status(500)
      .json({
        message: "Invalid password"
      });
  } else {
    next();
  }
}

module.exports = checkingPass