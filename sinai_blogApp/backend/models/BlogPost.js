const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a file for Sequelize configuration

class Post extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title cannot be empty"
          }
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Content cannot be empty"
          }
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }
}

module.exports = Post;