const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// POST /api/users/signup - Sign up a new user
router.post('/signup', userController.signUp);

// POST /api/users/login - Log in a user
router.post('/login', userController.logIn);

// GET /api/users/:id - Get user details by ID
router.get('/:id', userController.getUserDetails);

// PUT /api/users/:id - Update user details by ID
router.put('/:id', userController.updateUserDetails);

// DELETE /api/users/:id - Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;

// Update in user model (e.g., models/user.js)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'
});

module.exports = User;

// Update database configuration (e.g., config/database.js)
module.exports = {
    host: 'db',
    username: 'your-username',
    password: 'your-password',
    database: 'your-database-name',
    dialect: 'mysql',
    // other sequelize options
};