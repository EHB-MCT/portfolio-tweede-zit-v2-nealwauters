const request = require('../setup');
const User = require('../../src/models/User');
const Question = require('../../src/models/Question');
const Answer = require('../../src/models/Answer');
const mongoose = require('mongoose');

describe('Answer API', () => {
    let userId;
    let questionId;

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
    });

    it('should create a new answer', async () => {
        const response = await request.post('/api/answers')
            .send({
                content: 'This is a test answer.',
                question: questionId,
                author: userId,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content', 'This is a test answer.');
        expect(response.body).toHaveProperty('question', questionId.toString());
        expect(response.body).toHaveProperty('author', userId.toString());
    });

    it('should retrieve answers by question ID', async () => {
        await Answer.create({
          content: 'First answer',
          question: questionId,
          author: userId,
        });
        await Answer.create({
          content: 'Second answer',
          question: questionId,
          author: userId,
        });
      
        const response = await request.get(`/api/answers/${questionId}`);
      
        console.log('Response Body:', response.body);  // Add this line to inspect the output
      
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('content', 'First answer');
        expect(response.body[1]).toHaveProperty('content', 'Second answer');
      });
      
});
