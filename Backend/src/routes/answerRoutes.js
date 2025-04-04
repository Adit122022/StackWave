 const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createAnswer } = require('../controllers/answerController');
 const route = express.Router();

route.post('/:questionId' , protect ,createAnswer )

 module.exports = route