let express=require('express')
const { gettingQuestions } = require('./web/questions');
const { answerRoute } = require('./web/answer');
const {  authentication } = require('./web/authentication');
let website=express.Router()


website.use('/questions',gettingQuestions)

website.use('/answers', answerRoute);

website.use('/authentication', authentication);

module.exports={website}


//http://localhost:8000/website/questions   For gettig questions

//http://localhost:8000/website/answers     For submitting answers

//http://localhost:8000/website/authentication  For authentication routes