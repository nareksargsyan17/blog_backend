const { User } = require("../models");

module.exports = async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await User.findByPk(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: "id not found"
      })
    }
  } catch (error) {
    return res.json({
      message: "Something is wrong"
    })
  }
}