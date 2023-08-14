const { userSchema } =  require("../validations/userSchema");
const { User, Image } =  require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { changePassSchema } = require("../validations/changePassSchema");
require("dotenv").config()

const registration = async (req, res) => {
 try {
   console.log(req)
   const { ...data } = req.body;
   console.log(data)
   await userSchema.validateAsync(data);

   const user = await User.findOne({
     where: {
       email: data.email
     }
   })

   if (!user) {
     data.password = await bcrypt.hash(data.password, 10);
     await User.create(data);
   } else {
     const {firstName, lastName} = data;
     const password = await bcrypt.hash(data.password, 10);
     await user.update({firstName, lastName, password})
   }

   return res.status(200).send({
     successMessage: "Registration completed"
   })
 } catch (error) {
   return res.status(401).send({
     message: error.message
   })
 }
}



const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email }, attributes: {exclude: ["password"]}});

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {});

    return res.status(200).send({
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { ...data } = req.body;
    await changePassSchema.validateAsync(data);

    const password = await bcrypt.hash(data.newPassword, 10);
    await User.update(
      { password },
      {
        where: { id }
      }
    );

    return res.status(200).send({
      successMessage: "Your password was changed"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {exclude: ["password"]},
      include: [
        {
          where: {
            postId: null
          },
          model: Image,
          attributes: ["path"],
          as: "images"
        }
    ]
    });
    console.log(user)
    return res.status(200).send({
      data: user
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
};

module.exports =  {
  registration,
  login,
  changePassword,
  getUser
}