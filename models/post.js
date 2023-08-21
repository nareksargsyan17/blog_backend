'use strict';
const {
  Model, STRING, DATE, INTEGER
} = require('sequelize');
module.exports = (sequelize) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {  User, Like, Comment } = models;

      this.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

      this.belongsToMany(User, { through: Like, foreignKey: "postId", otherKey: "userId", onDelete: "cascade", as: "likes" });

      this.belongsToMany(User, { through: Comment, foreignKey: "postId", otherKey: "userId", onDelete: "cascade", as: "comments" });

      this.hasMany(Comment, {foreignKey: "postId", as: "postComments"})
    }
  }
  Post.init({
    title: {
      type: STRING,
      allowNull: false
    },
    content: {
      type: STRING,
      allowNull: false
    },
    ownerId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "cascade"
    },
    image: {
      type: STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DATE
    },
    updatedAt: {
      allowNull: false,
      type: DATE
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts",
    freezeTableName: true
  });
  return Post;
};