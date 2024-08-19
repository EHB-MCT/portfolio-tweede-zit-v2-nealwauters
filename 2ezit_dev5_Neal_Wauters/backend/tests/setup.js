const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../src/index.js');
const supertest = require('supertest');

const request = supertest(app);

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

module.exports = request;
