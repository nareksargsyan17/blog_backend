const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async function validateId(req, res, next) {
   try {
      const { userId } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      console.log(id, "and", userId)
      if (parseInt(userId) === parseInt(id)) {
         const user = await User.findByPk(id);
         if (user) {
            req.user = user;
            next();
         } else {
            res.status(404).json({
               message: "id not found"
            })
         }
      } else {
         return res.json({
            message: "Something is wrong"
         })
      }

   } catch (error) {
      console.log(error)
      return res.json({
         message: "Something is wrong"
      })
   }
}