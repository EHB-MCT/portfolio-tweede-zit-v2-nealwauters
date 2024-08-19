const Question = require('../models/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
  const { title, content, author, isAnonymous } = req.body;
  try {
    const question = new Question({ title, content, author, isAnonymous });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('author')
      .populate('comments');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author')
      .populate('comments');

    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a question to mark the correct answer
exports.updateQuestionById = async (req, res) => {
  const { answerId } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: 'Question not found' });
    question.correctAnswer = answerId;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
