let express=require('express');
const { allquantQuestion } = require('../../controllers/web/questions/QuantQController');
const { allverbalQuestion } = require('../../controllers/web/questions/VerbalQController');
const { alldatainsightQuestion } = require('../../controllers/web/questions/DatainsightQController');

let gettingQuestions=express.Router()


gettingQuestions.get('/quant',allquantQuestion)

gettingQuestions.get('/verbal',allverbalQuestion)

gettingQuestions.get('/datainsight',alldatainsightQuestion)

module.exports={gettingQuestions}


//http://localhost:8000/website/questions/quant

//http://localhost:8000/website/questions/verbal

//http://localhost:8000/website/questions/datainsight