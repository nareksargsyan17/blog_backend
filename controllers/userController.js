const { userSchema } =  require("../validations/userSchema");
const { User, Image } =  require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { changePassSchema } = require("../validations/changePassSchema");
const fs = require("fs");
require("dotenv").config()

const registration = async (req, res) => {
 try {
   const { ...data } = req.body;
   data.avatar = "public\\images\\download.png"
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
      attributes: {exclude: ["password"]}
    });
    return res.status(200).send({
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {attributes: ["firstName", "lastName", "id", "avatar"]});
    return res.status(200).send({
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong!"
    })
  }
};


const editUser = async (req, res) => {
  try {
    const { ...data } = req.body;
    if (req?.file?.path) {
      const user = await User.findByPk(req.user.id);
      if (user.dataValues.avatar !== "public\\images\\download.png") {
        fs.unlinkSync(user.dataValues.avatar);
      }
      data.avatar = req.file.path;
    } else {
      data.avatar = "public\\images\\download.png";
    }

    const updatedId = await User.update(data, {
      where: {
        id : req.user.id
      }
    })

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: ["firstName", "lastName", "id", "avatar"]
    });
    return res.status(200).send({
      data: updatedUser
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports =  {
  registration,
  login,
  changePassword,
  getUser,
  getUserById,
  editUser
}