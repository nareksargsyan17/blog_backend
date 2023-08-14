'use strict';
const {
  Model, STRING, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Post, User } = models

      this.belongsTo(Post, { foreignKey: "postId" })

      this.belongsTo(User, { foreignKey: "userId" })

    }
  }
  Image.init({
    path: {
      type: STRING,
      allowNull: false
    },
    postId: {
      type: INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'id',
      }
    },
    userId: {
      type: INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    timestamps: false,
    freezeTableName: true
  });
  return Image;
};