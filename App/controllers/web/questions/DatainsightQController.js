const { default: alldataInsightsQuestions } = require("../../../Questions/alldatainsightQuestion");


let alldatainsightQuestion= (req,res)=>{

  let q=alldataInsightsQuestions

let response = {
  status: 1,
  data: q
};

res.send(response);


}

module.exports={alldatainsightQuestion}