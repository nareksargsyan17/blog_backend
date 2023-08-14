'use strict';
const {DATE, STRING, INTEGER} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('images');
  }
};