const { dbConnection } = require("../Config/dbConfig");

const saveSubmission = async ({ email, field, responses }) => {
  const db = await dbConnection();
  const collection = db.collection("finalResult");

  // Check if final submission already locked
  const existing = await collection.findOne({ email });
  if (existing && existing.finalLocked) {
    throw new Error("Final submission already completed. You cannot submit again.");
  }

  const updateData = {
    [field]: responses,
    submittedAt: new Date()
  };

  // If both verbal and quant present, mark as final
  if (
    (field === "quantResponses" && existing?.verbalResponses) ||
    (field === "verbalResponses" && existing?.quantResponses)
  ) {
    updateData.finalLocked = true;
    updateData.finalSubmittedAt = new Date();
  }

  await collection.updateOne(
    { email },
    { $set: updateData },
    { upsert: true }
  );
};

module.exports = { saveSubmission };
