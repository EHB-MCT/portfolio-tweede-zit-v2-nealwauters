const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
});

module.exports = mongoose.model('Comment', commentSchema);