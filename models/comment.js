'use strict';
const {
  Model, STRING, INTEGER
} = require('sequelize');
module.exports = (sequelize) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(Comment, {foreignKey: "parentId", as: "answers"})
    }
  }
  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    comment: {
      type: STRING,
      allowNull: false,
    },
    parentId: {
      type: INTEGER,
      defaultValue: null
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "cascade"
    },
    postId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id"
      },
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: "comments",
    freezeTableName: true
  });
  return Comment;
};