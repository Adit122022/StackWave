const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createPost, getPosts, likePost, commentPost } = require('../controllers/postController');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
