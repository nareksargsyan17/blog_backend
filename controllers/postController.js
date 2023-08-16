const { Post, User, Image, Comment } = require("../models")
const postSchema  = require("../validations/postSchema");

const addPost = async (req, res) => {
  try {
    const { ...data } = req.body;
    data.ownerId = req.user.id;
    await postSchema.validateAsync(data)
    const post = await Post.create(data);
    const postData = await Post.findOne({
      where: {
        id: post.id
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["firstName", "lastName", "id"],
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
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName"],
        },
        {
          model: User,
          as : "comments",
          attributes: ["firstName", "lastName"],
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
          attributes: ["firstName", "lastName", "id"],
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
        },
        {
          model: Image,
          attributes: ["path"],
          as: "images"
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id"],
        },
        {
          model: User,
          as : "comments",
          attributes: ["firstName", "lastName",  "id"],
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
          attributes: ["firstName", "lastName", "id"],
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
        },
        {
          model: Image,
          attributes: ["path"],
          as: "images"
        },
        {
          model: User,
          as : "likes",
          attributes: ["firstName", "lastName",  "id"],
        },
        {
          model: User,
          as : "comments",
          attributes: ["firstName", "lastName",  "id"],
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
}

module.exports = {
  addPost,
  getPosts,
  getPostById
}