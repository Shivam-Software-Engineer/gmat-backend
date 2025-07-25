const { saveSubmission } = require("../../../utility/saveResult");

const submitDatainsightAnswers = async (req, res) => {
  try {
    const { email, responses } = req.body;

    // Validate email
    if (!email || typeof email !== "string") {
      return res.status(400).send({ status: 0, message: "Email required" });
    }

    // Validate responses
    if (!Array.isArray(responses)) {
      return res.status(400).send({ status: 0, message: "'responses' should be an array" });
    }

    // Directly save what the frontend sent
    await saveSubmission({ email, field: "datainsightResponses", responses });

    res.send({ status: 1, email, data: responses });

  } catch (err) {
    console.error("Datainsight Error:", err.message);
    res.status(400).send({ status: 0, message: err.message });
  }
};

module.exports = { submitDatainsightAnswers };
