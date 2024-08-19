const express = require('express');
const user = require('../controllers/userController');
const router = express.Router();

router.post('/user', user.createUser);
router.get('/user/:id', user.getProfile);
router.get('/user', user.getAllUsers);

module.exports = router;