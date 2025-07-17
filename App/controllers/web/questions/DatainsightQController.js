const { default: alldataInsightsQuestions } = require("../../../Questions/alldatainsightQuestion");
// const { dbConnection } = require("../../Config/dbConfig");

let alldatainsightQuestion= (req,res)=>{

  //   const info = await transporter.sendMail({
  //   from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
  //   to: "bar@example.com, baz@example.com",
  //   subject: "Hello ✔",
  //   text: "Hello world?", // plain‑text body
  //   html: "<b>Hello world?</b>", // HTML body
  // });

    // let db=await dbConnection()
    // let save=await db.collection('mycolleciton')
    // await save.insertOne(req.body)

  //   let filteredQuestions = alldataInsightsQuestions.map(q => {
  // switch (q.type) {
  //   case "GraphicsInterpretation":
  //     return {
  //       id: q.id,
  //       type: q.type,
  //       question: q.question,
  //       chartImages: q.chartImages,
  //       text: q.text,
  //       prompts: q.prompts.map(p => ({
  //         statement: p.statement,
  //         options: p.options
  //         // 🔒 excluding answer, correctAnswer, explanation
  //       })),
  //       chartDescription: q.chartDescription
  //     };

    // case "TwoPartAnalysis":
    //   return {
    //     id: q.id,
    //     type: q.type,
    //     question: q.question,
    //     statement: q.statement,
    //     tableHeadings: q.tableHeadings,
    //     options: q.options
    //     // 🔒 excluding answer, correctCombination, explanation
    //   };

//     default:
//       return {
//         id: q.id,
//         type: q.type,
//         question: q.question,
//         // fallback for unknown types
//       };
//   }
// });

  let q=alldataInsightsQuestions

let response = {
  status: 1,
  data: q
};

res.send(response);


}

module.exports={alldatainsightQuestion}