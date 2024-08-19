const express = require('express');
const answerController = require('../controllers/answerController');
const router = express.Router();

router.post('/', answerController.createAnswer);
router.get('/:id', answerController.getAnswersByQuestionId);

module.exports = router;
