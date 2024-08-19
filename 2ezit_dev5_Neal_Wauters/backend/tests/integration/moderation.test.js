const request = require('../setup');
const User = require('../../src/models/User');
const Question = require('../../src/models/Question');
const Answer = require('../../src/models/Answer');
const Comment = require('../../src/models/Comment');
const mongoose = require('mongoose');

describe('Moderation API', () => {
    let userId, questionId, answerId, commentId;

    beforeAll(async () => {
        const user = await User.create({
            username: 'author',
            role: 'teacher',
        });
        userId = user._id;

        const question = await Question.create({
            title: 'Test Question',
            content: 'This is a test question.',
            author: userId,
            isAnonymous: false,
        });
        questionId = question._id;

        const answer = await Answer.create({
            content: 'Test Answer',
            question: questionId,
            author: userId,
        });
        answerId = answer._id;

        const comment = await Comment.create({
            content: 'Test Comment',
            answer: answerId,
            question: questionId,
            author: userId,
        });
        commentId = comment._id;
    });

    it('should delete a question', async () => {
        const response = await request.delete(`/api/moderations/questions/${questionId}`);
        expect(response.status).toBe(204);

        const deletedQuestion = await Question.findById(questionId);
        expect(deletedQuestion).toBeNull();
    });

    it('should delete an answer', async () => {
        const response = await request.delete(`/api/moderations/answers/${answerId}`);
        expect(response.status).toBe(204);

        const deletedAnswer = await Answer.findById(answerId);
        expect(deletedAnswer).toBeNull();
    });

    it('should delete a comment', async () => {
        const response = await request.delete(`/api/moderations/comments/${commentId}`);
        expect(response.status).toBe(204);

        const deletedComment = await Comment.findById(commentId);
        expect(deletedComment).toBeNull();
    });
});
