const Comment = require('../models/Comment');

// Create a new comment
exports.createComment =  async (req, res) => {
  const { content, author, answer, question } = req.body;
  try {
    const comment = new Comment({ content, author, answer, question });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCommentByQuestionId = async (req, res) => {
  try {
    const question = await Comment.find({question:req.params.id}).populate('author')

    if (!question) return res.status(404).json({ message: 'comments not found' });

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};