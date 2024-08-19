const express = require('express');
require('dotenv').config();
const connectDB = require('../config/db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/questions', require('./routes/questionRoute'));
app.use('/api/comments', require('./routes/CommentRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/answers', require('./routes/answerRoute'));
app.use('/api/moderations', require('./routes/moderationRoute'));


if (process.env.NODE_ENV !== 'test') {
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
