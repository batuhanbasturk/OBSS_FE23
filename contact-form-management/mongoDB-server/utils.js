const mongoose = require("mongoose");
const { LastId } = require("./models");

// Reading from MongoDB
async function readDataFromMongo(collectionName, fieldName) {
  try {
    const collection = mongoose.connection.collection(collectionName);
    if (!fieldName) {
      const data = await collection.find().toArray();
      return data ? data : [];
    } else {
      const data = await collection.distinct(fieldName);
      return data ? data : [];
    }
  } catch (err) {
    console.error("Error reading from MongoDB:", err);
    throw new Error("Error reading from MongoDB", err);
  }
}
//update to MongoDB
async function updateDataToMongo(collectionName, data) {
  try {
    const collection = mongoose.connection.collection(collectionName);

    // Iterate through the data array and update each document
    for (const document of data) {
      const { _id, ...updateData } = document;
      await collection.updateOne(
        { _id },
        { $set: updateData },
        { upsert: true }
      );
    }
    console.log("Data updated successfully to MongoDB.");
  } catch (err) {
    console.error("Error updating to MongoDB:", err);
  }
}

// Deleting from MongoDB
async function deleteDataFromMongo(collectionName, id) {
  try {
    const collection = mongoose.connection.collection(collectionName);
    await collection.deleteOne({ id: id });
    console.log("Data deleted successfully from MongoDB.");
  } catch (err) {
    console.error("Error deleting from MongoDB:", err);
  }
}

// Writing to MongoDB
async function writeDataToMongo(collectionName, id, data) {
  try {
    const collection = mongoose.connection.collection(collectionName);
    await collection.updateOne({ id: id }, { $set: data }, { upsert: true });
    console.log("Data written successfully to MongoDB.");
  } catch (err) {
    console.error("Error writing to MongoDB:", err);
  }
}

async function getNextUserId() {
  const lastIdObject = await LastId.findOne();
  const nextUserId = lastIdObject.user + 1;
  await LastId.updateOne(
    { _id: lastIdObject._id },
    { $set: { user: nextUserId } }
  );
  return nextUserId;
}

async function getNextMessageId() {
  const lastIdObject = await LastId.findOne();
  const nextMessageId = lastIdObject.message + 1;
  await LastId.updateOne(
    { _id: lastIdObject._id },
    { $set: { message: nextMessageId } }
  );

  return nextMessageId;
}

module.exports = {
  readDataFromMongo,
  updateDataToMongo,
  deleteDataFromMongo,
  writeDataToMongo,
  getNextUserId,
  getNextMessageId,
};
