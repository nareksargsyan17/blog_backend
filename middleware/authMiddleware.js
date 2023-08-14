const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async function auth(req, res, next) {
  try {
    console.log(req)
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(id);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(404).json({
        message: "id not found"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: error.message
    })
  }
}