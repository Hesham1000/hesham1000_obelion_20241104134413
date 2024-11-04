const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('sinai_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Comment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      replies: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
    }, {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      timestamps: false,
    });
  }
}

module.exports = Comment;