const { Post } =  require("../models")

module.exports = async function validateId(req, res, next) {
   try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (post) {
         req.post = post
         next();
      } else {
         res.status(404).json({
            message: "id not found"
         })
      }
   } catch (error) {
      return res.status(400).send({
         message: error.message
      })
   }
}