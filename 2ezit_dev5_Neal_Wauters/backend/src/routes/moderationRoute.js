const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationContrller');

router.delete('/questions/:id', moderationController.deleteQuestionById);
router.delete('/answers/:id', moderationController.deleteAnswerById);
router.delete('/comments/:id', moderationController.deleteCommentById);

module.exports = router;
