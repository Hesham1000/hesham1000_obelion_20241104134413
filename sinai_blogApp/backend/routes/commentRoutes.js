const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to add a new comment
router.post('/comments', commentController.addComment);

// Route to get all comments
router.get('/comments', commentController.getComments);

// Route to like a comment
router.put('/comments/:id/like', commentController.likeComment);

// Route to reply to a comment
router.put('/comments/:id/reply', commentController.replyComment);

// Route to delete a comment
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;

// models/commentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    replies: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    tableName: 'comments'
});

module.exports = Comment;

// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;