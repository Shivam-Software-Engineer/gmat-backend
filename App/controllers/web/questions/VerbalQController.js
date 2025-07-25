const { default: verbalQuestions } = require("../../../Questions/allverbalQuestions");
// const { dbConnection } = require("../../Config/dbConfig");


let allverbalQuestion= (req,res)=>{

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

    let filteredQuestions = verbalQuestions.map(q => ({
  id: q.id,
  type: q.type,
  text: q.text,
  passage:q.passage,
  options: q.options
}));

let response = {
  status: 1,
  data: filteredQuestions
};

res.send(response);

}

module.exports={allverbalQuestion}