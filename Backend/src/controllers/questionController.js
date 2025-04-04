const questionModel = require('../models/questionModel');

// Create a Post
module.exports.Create = async (req, res) => {
    try {
        const { title, body, tags } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required' });
        }

        const newQuestion = await questionModel.create({
            title,
            body,
            tags,
            authorId: req.user.id
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get All Posts
module.exports.getAllQuestion =  async (req, res) => {
    try {
        const questions = await questionModel.find().populate('authorId', 'name'); 
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getOneQuestion =  async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id).populate('authorId', 'name');
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Comment on a Post
module.exports.Delete = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (question.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await question.deleteOne();
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


