const { User } = require("../models");
const bcrypt = require("bcrypt");


module.exports = async function verifyUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({where: { email }});

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
          next();
      } else {
        return res.status(401).send({
          message: "Authentication failed"
        });
      }
    } else {
      return res.status(401).send({
        message: "Authentication failed"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
}
