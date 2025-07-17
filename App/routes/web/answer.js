const express = require('express');
const { submitQuantAnswers } = require('../../controllers/web/answer/submitQuantController');
const { submitVerbalAnswers } = require('../../controllers/web/answer/submitVerbalController');

const answerRoute = express.Router();

answerRoute.post('/quant', submitQuantAnswers); // 👈 POST /website/answers/quant

answerRoute.post('/verbal', submitVerbalAnswers);

module.exports = { answerRoute };



//http://localhost:8000/website/answers/quant

//http://localhost:8000/website/answers/verbal
