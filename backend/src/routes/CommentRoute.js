const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.post('/',commentController.createComment)
router.get('/:id',commentController.getCommentByQuestionId)

module.exports = router;