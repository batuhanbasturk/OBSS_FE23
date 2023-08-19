const {
  Message,
  User,
  Country,
  LastId,
  BlacklistedTokens,
} = require("./models");

//Insert initial blacklistedTokens to MongoDB
const blacklistedTokensData = require("./data/blacklisted-tokens.json");
const transformedBlacklistedTokensData = blacklistedTokensData.map(
  (blacklistedToken) => ({
    blacklistedTokens: blacklistedToken,
  })
);

// Insert initial lastId to MongoDB
const lastIdData = require("./data/last-id.json");
// Insert initial users to MongoDB
const usersData = require("./data/users.json");
const transformedUsersData = usersData.map((user) => ({
  id: user.id,
  username: user.username,
  password: user.password,
  base64Photo: user.base64Photo,
  role: user.role,
}));

// Insert initial messages to MongoDB
const messagesData = require("./data/messages.json");
const transformedMessagesData = messagesData.map((message) => ({
  id: message.id,
  name: message.name,
  message: message.message,
  gender: message.gender,
  country: message.country,
  creationDate: message.creationDate,
  read: message.read,
}));

// Insert initial countries to MongoDB
const countryData = require("./data/countries.json");
const transformedCountryData = countryData.map((countryName) => ({
  country: countryName,
}));

async function performInitialDataChecksAndInsertions() {
  //For first time insert data to MongoDB
  // Check if data already exists in MongoDB
  const countryCount = await Country.countDocuments();
  const messageCount = await Message.countDocuments();
  const userCount = await User.countDocuments();
  const lastIdCount = await LastId.countDocuments();
  const blacklistedTokensCount = await BlacklistedTokens.countDocuments();

  if (countryCount === 0) {
    // Insert country json to mongoDB
    Country.insertMany(transformedCountryData)
      .then(() => {
        console.log("Countries inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting countries:", err);
      });
  }

  if (messageCount === 0) {
    // Insert messages json to mongoDB
    Message.insertMany(transformedMessagesData)
      .then(() => {
        console.log("Messages inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting messages:", err);
      });
  }

  if (userCount === 0) {
    // Insert users json to mongoDB
    User.insertMany(transformedUsersData)
      .then(() => {
        console.log("Users inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting users:", err);
      });
  }

  if (lastIdCount === 0) {
    // Insert lastId json to mongoDB
    LastId.insertMany(lastIdData)
      .then(() => {
        console.log("LastId inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting lastId:", err);
      });
  }

  if (blacklistedTokensCount === 0) {
    // Insert blacklistedTokens json to mongoDB
    BlacklistedTokens.insertMany(transformedBlacklistedTokensData)
      .then(() => {
        console.log("BlacklistedTokens inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting blacklistedTokens:", err);
      });
  }
}

module.exports = {
  performInitialDataChecksAndInsertions,
};
