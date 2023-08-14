'use strict';
const {INTEGER, DATE, STRING} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('comments', {
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
      createdAt: {
        allowNull: false,
        type: DATE
      },
      updatedAt: {
        allowNull: false,
        type: DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('comments');
  }
};