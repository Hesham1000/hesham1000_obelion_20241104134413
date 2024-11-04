const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controllers/postController');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /posts - Create a new post
router.post('/posts', upload.single('image'), postController.createPost);

// GET /posts - Get all posts
router.get('/posts', postController.getAllPosts);

// GET /posts/:id - Get a single post by ID
router.get('/posts/:id', postController.getPostById);

// PUT /posts/:id - Update a post by ID
router.put('/posts/:id', upload.single('image'), postController.updatePostById);

// DELETE /posts/:id - Delete a post by ID
router.delete('/posts/:id', postController.deletePostById);

module.exports = router;