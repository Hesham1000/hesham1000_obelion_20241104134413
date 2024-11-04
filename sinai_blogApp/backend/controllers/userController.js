const { User } = require('../models/User');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('sinai_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

User.init(sequelize, { modelName: 'users' });

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    return res.status(201).json({ message: 'A verification email has been sent. Please verify to log in.' });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    return res.status(500).json({ error: 'Error signing up. Please try again.' });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.validatePassword(email, password);
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching user details. Please try again.' });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    return res.status(200).json({ message: 'User details updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating user details. Please try again.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.destroy();
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting user. Please try again.' });
  }
};