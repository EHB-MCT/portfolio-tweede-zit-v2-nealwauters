const request = require('../setup');
const User = require('../../src/models/User');
const Question = require('../../src/models/Question');
const { default: mongoose } = require('mongoose');

describe('Question API', () => {
    let userId;
    beforeAll(async () => {
        const user = await User.create({
            username: 'author',
            role: 'teacher',
        });
        userId = user._id;
    });

    it('should create a new question', async () => {
        const response = await request.post('/api/questions')
            .send({
                title: 'Test Question',
                content: 'This is a test question.',
                author: userId,
                isAnonymous: false,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('title', 'Test Question');
        expect(response.body).toHaveProperty('content', 'This is a test question.');
        expect(response.body).toHaveProperty('author', userId.toString());
        expect(response.body).toHaveProperty('isAnonymous', false);
    });

    it('should retrieve all questions', async () => {
        await Question.create({
            title: 'Question 1',
            content: 'Content 1',
            author: userId,
            isAnonymous: false,
        });
        await Question.create({
            title: 'Question 2',
            content: 'Content 2',
            author: userId,
            isAnonymous: true,
        });

        const response = await request.get('/api/questions');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('title', 'Question 1');
        expect(response.body[1]).toHaveProperty('title', 'Question 2');
    });

    it('should retrieve a specific question by ID', async () => {
        const user = await User.create({ username: 'author', role: 'teacher' });
        const question = await Question.create({
            title: 'Question by ID',
            content: 'Content by ID',
            author: user._id,
            isAnonymous: false,
        });
    
        console.log('Created Question:', question);
        console.log('Created User:', user);
        const response = await request.get(`/api/questions/${question._id}`);    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Question by ID');
        expect(response.body).toHaveProperty('content', 'Content by ID');
        expect(response.body).toHaveProperty('author');
        expect(response.body.author._id.toString()).toBe(user._id.toString());
    });

    it('should update a question with a correct answer', async () => {
        const question = await Question.create({
            title: 'Question to Update',
            content: 'Content to Update',
            author: userId,
            isAnonymous: false,
        });

        const answerId = new mongoose.Types.ObjectId(); // Mock or create an answer
        const response = await request.put(`/api/questions/${question._id}/update-answer`)
            .send({ answerId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('correctAnswer', answerId.toString());
    });
});
