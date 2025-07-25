// Quant Controller (submitQuantAnswers.js)
const { default: allquantQuestions } = require("../../../Questions/allquantQuestions");
const { saveSubmission } = require("../../../utility/saveResult");


const submitQuantAnswers = async (req, res) => {
  try {
    const { email, responses: userResponses } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).send({ status: 0, message: "Email required" });
    }
    if (!Array.isArray(userResponses)) {
      return res.status(400).send({ status: 0, message: "'responses' should be array" });
    }

    const responseMap = new Map();
    userResponses.forEach(r => {
      if (typeof r.id !== 'number') throw new Error("Invalid id");
      responseMap.set(r.id, r.selected);
    });

    const evaluated = allquantQuestions.map(q => {
      const selected = responseMap.get(q.id);
      let status = null;
      if (selected !== undefined && selected !== null) status = selected === q.correct;

      return {
        id: q.id,
        type: q.type,
        text: q.text,
        options: q.options,
        selected: selected ?? null,
        correct: q.correct,
        explanation: q.explanation,
        status
      };
    });

    
    await saveSubmission({ email, field: "quantResponses", responses: evaluated });

    res.send({ status: 1, email, data: evaluated });

  } catch (err) {
    console.error("❌ Quant Error:", err.message);
    res.status(400).send({ status: 0, message: err.message });
  }
};

module.exports = { submitQuantAnswers };
