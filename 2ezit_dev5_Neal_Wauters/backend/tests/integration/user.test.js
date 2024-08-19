const request = require('../setup');
const User = require('../../src/models/User.js');

describe('User API', () => {
    it('should create a new user', async () => {
        const response = await request.post('/api/users/user')
            .send({
                username: 'testuser',
                role: 'student',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('role', 'student');
    });

    it('should retrieve all users', async () => {
        await User.create({ username: 'user1', role: 'teacher' });
        await User.create({ username: 'user2', role: 'student' });

        const response = await request.get('/api/users/user');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('username', 'user1');
        expect(response.body[1]).toHaveProperty('username', 'user2');
    });
});
