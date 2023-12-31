const {Comment, User, Image} = require("../models")
const commentSchema = require("../validations/commentSchema");
const {Op} = require("sequelize");

const addComment = async (req, res) => {
    try {
        const {...data} = req.body;
        data.userId = req.user.id;
        await commentSchema.validateAsync(data);
        const created = await Comment.create(data);
        const comData = await Comment.findByPk(created.id, {
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["firstName", "lastName", "avatar"]
                }
            ]
        })
        return res.status(200).send({
            data: comData
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

const getComments = async (req, res) => {
    try {
        const {id} = req.params;
        const {parent} = req.query;
        let parentId;
        if (parent === "null") {
            parentId = null;
        } else {
            parentId = parent;
        }
        const comments = await Comment.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            where: {
                [Op.and]: [
                    {
                        parentId: parentId,
                    },
                    {
                        postId: id
                    }
                ]
            },

        })
        const data = [];

        for (const index in comments) {
            const comment = await Comment.findByPk(comments[index].id, {
                include: [
                    {
                        model: User,
                        as: "owner",
                        attributes: ["firstName", "lastName", "avatar"]
                    }
                ]
            });
            console.log('comment.id', comment.id);
            const answers = await comment.getAnswers({
                order: [
                    ["createdAt", "DESC"]
                ],
                include: [
                    {
                        model: User,
                        as: "owner",
                        attributes: ["firstName", "lastName", "avatar"]
                    }
                ]
            });
            data.push({
                comment,
                answers
            })
        }

        return res.status(200).send({
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    addComment,
    getComments
}