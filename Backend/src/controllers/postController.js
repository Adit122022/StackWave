const Post = require('../models/postModel');

// Create a Post
const createPost = async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });

        const post = await Post.create({ title, content, image, author: req.user.id });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Get All Posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name avatar').sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Like a Post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.likes.includes(req.user.id)) {
            post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        } else {
            post.likes.push(req.user.id);
        }

        await post.save();
        res.status(200).json({ likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error });
    }
};

// Comment on a Post
const commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments.push({ user: req.user.id, text });
        await post.save();

        res.status(201).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

module.exports = { createPost, getPosts, likePost, commentPost };
