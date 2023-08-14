'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Like.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
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
    modelName: 'Like',
    tableName: "likes",
    freezeTableName: true
  });
  return Like;
};