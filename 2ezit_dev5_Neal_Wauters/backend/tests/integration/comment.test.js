const request = require('../setup');
const User = require('../../src/models/User');
const Question = require('../../src/models/Question');
const Answer = require('../../src/models/Answer');
const Comment = require('../../src/models/Comment');
const mongoose = require('mongoose');

describe('Comment API', () => {
    let userId, questionId, answerId;

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
    });

    it('should create a new comment', async () => {
        const response = await request.post('/api/comments/')
            .send({
                content: 'This is a test comment.',
                answer: answerId,
                question: questionId,
                author: userId,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content', 'This is a test comment.');
        expect(response.body).toHaveProperty('answer', answerId.toString());
        expect(response.body).toHaveProperty('question', questionId.toString());
        expect(response.body).toHaveProperty('author', userId.toString());
    });

});
