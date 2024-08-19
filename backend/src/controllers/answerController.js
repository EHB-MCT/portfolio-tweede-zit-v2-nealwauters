const Answer = require('../models/Answer');

// Create a new answer
exports.createAnswer = async (req, res) => {
  const { content, author, question } = req.body;
  try {
    const answer = new Answer({ content, author, question });
    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all answers for a specific question
exports.getAnswersByQuestionId = async (req, res) => {
  try {
      const answers = await Answer.find({ question: req.params.id }).populate('author');
      res.json(answers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

