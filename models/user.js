'use strict';
const {
  Model, STRING, DATE
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Image, Post, Like, Comment } = models

      this.hasMany(Post, { foreignKey: "ownerId", as: "posts" });

      this.belongsToMany(Post, { through: Like, foreignKey: "userId", otherKey: "postId", onDelete: "cascade", as: "likes" });

      this.belongsToMany(Post, { through: Comment, foreignKey: "userId", otherKey: "postId", onDelete: "cascade", as: "comments" });

      this.hasMany(Comment, {foreignKey: "userId", as: "owner"})
    }
  }
  User.init({
    firstName: {
      type: STRING,
      allowNull: false
    },
    lastName: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    avatar: {
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
    modelName: 'User',
    tableName: "users",
    freezeTableName: true
  });
  return User;
};