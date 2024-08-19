const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');

exports.deleteQuestionById = async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
exports.deleteAnswerById =  async (req, res) => {
    try {
      await Answer.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
exports.deleteCommentById = async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }