const { Post, User, Like, Comment } = require("../models")
const postSchema  = require("../validations/postSchema");
const { Op } = require("sequelize");

const addPost = async (req, res) => {
  try {
    const { ...data } = req.body;
    data.ownerId = req.user.id;
    data.image = req.file.path
    await postSchema.validateAsync(data);
    const post = await Post.create(data);
    const postData = await Post.findOne({
      where: {
        id: post.id
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id", "avatar"]
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName", "avatar"],
        },
        {
          model: User,
          as : "comments",
          attributes: ["firstName", "lastName", "avatar"],
        },
        {
          required: false,
          model: Comment,
          as : "postComments",
        }
      ]
    })

    return res.status(200).send({
      data: postData
    })
  } catch (error) {

    return res.status(500).send({
      message: error.message
    })
  }
}


const getPosts = async (req, res) => {
  try {
    const { page } = req.query;

    const posts = await Post.findAll({
      order: [
        ["createdAt", "DESC"]
      ],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id", "avatar"]
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id", "avatar"],
        },
        {
          required: false,
          model: Comment,
          as : "postComments",
        }
      ]
    })

    return res.status(200).send({
      data: posts
    })
  } catch (error) {

    return res.status(500).send({
      message: error.message
    })
  }
}

const getUserPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } = req.params

    const posts = await Post.findAll({
      where: {
        ownerId: id
      },
      order: [
        ["createdAt", "DESC"]
      ],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id", "avatar"]
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id", "avatar"],
        },
        {
          required: false,
          model: Comment,
          as : "postComments",
        }
      ]
    })

    return res.status(200).send({
      data: posts
    })
  } catch (error) {

    return res.status(500).send({
      message: error.message
    })
  }
}

const getUserLikedPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const { userId } = req.params;
    console.log("page", page)

    const likedPosts = await Like.findAll({
      where: {
        userId
      }
    });
    const postsId = likedPosts.map(elem => elem.postId)

    console.log(postsId)
    const posts = await Post.findAll({
      where: {
        id: {
          [Op.in]: postsId
        }
      },
      order: [
        ["createdAt", "DESC"]
      ],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id", "avatar"]
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id", "avatar"],
        },
        {
          required: false,
          model: Comment,
          as : "postComments",
        }
      ]
    })

    return res.status(200).send({
      data: posts
    })
  } catch (error) {

    return res.status(500).send({
      message: error.message
    })
  }
}


const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id,{
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id", "avatar"]
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id", "avatar"],
        },
        {
          model: User,
          as : "comments",
          attributes: ["firstName", "lastName",  "id", "avatar"],
        },
        {
          required: false,
          model: Comment,
          as : "postComments",
        }
      ]
    })
    return res.status(200).send({
      data: post
    })
  } catch (error) {

    return res.status(500).send({
      message: error.message
    })
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({
      where: {
        id
      }
    })
    return res.status(200).send({
      data: id
    })
  } catch (error) {
    return res.status(400).send({
      message: error.message
    })
  }
};

const editPost = async (req, res) => {
  try {
    const { ...data } = req.body;
    const { id } = req.params;

    await Post.update(data, {
      where: {
        id
      }
    })

    const updated = await Post.findByPk(id);
    return res.status(200).send({
      data: updated
    })

  } catch (error) {

    return res.status(400).send({
      message: error.message
    })
  }
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  deletePost,
  getUserPosts,
  getUserLikedPosts,
  editPost
}