const { dbConnection } = require("../Config/dbConfig");

const saveSubmission = async ({ email, field, responses }) => {
  const db = await dbConnection();
  const collection = db.collection("userExamData");

  // ✅ Check if any submission already locked for this email
  const existingFinal = await collection.findOne({
    originalEmail: email,
    finalLocked: true
  });

  if (existingFinal) {
    // ❌ Already submitted, don't allow more
    throw new Error("Submission already completed for this email.");
  }

  // 🔍 Check if there's an existing partial submission
  const previousSubmissions = await collection
    .find({ originalEmail: email })
    .sort({ submittedAt: -1 })
    .toArray();

  let targetDoc = null;

  if (previousSubmissions.length > 0) {
    const latest = previousSubmissions[0];
    if (!latest[field]) {
      targetDoc = latest;
    }
  }

  const updateData = {
    [field]: responses,
    submittedAt: new Date()
  };

  const allFields = ["quantResponses", "verbalResponses", "datainsightResponses"];
  const filledFields = [field];

  if (targetDoc) {
    allFields.forEach(f => {
      if (f !== field && targetDoc[f]) {
        filledFields.push(f);
      }
    });

    if (filledFields.length === allFields.length) {
      updateData.finalLocked = true;
      updateData.finalSubmittedAt = new Date();
    }

    await collection.updateOne(
      { _id: targetDoc._id },
      { $set: updateData }
    );
  } else {
    const newData = {
      email: email,
      originalEmail: email,
      [field]: responses,
      submittedAt: new Date()
    };

    await collection.insertOne(newData);
  }
};

module.exports = { saveSubmission };
