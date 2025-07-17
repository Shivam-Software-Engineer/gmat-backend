let express=require('express')
const { gettingQuestions } = require('./web/questions');
const { answerRoute } = require('./web/answer');
let website=express.Router()


website.use('/questions',gettingQuestions)

website.use('/answers', answerRoute);

module.exports={website}


//http://localhost:8000/website/questions   For gettig questions

//http://localhost:8000/website/answers     For submitting answers