const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('sinai_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

// Define the Comment model
class Comment extends Model {}
Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  replies: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: false,
});

// Function to add a new comment
exports.addComment = async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const newComment = await Comment.create({ name, email, text });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Function to get all comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

// Function to like a comment
exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.likes += 1;
      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
};

// Function to reply to a comment
exports.replyComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.replies.push({ id: Date.now(), text });
      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to reply to comment' });
  }
};

// Function to delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comment.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};