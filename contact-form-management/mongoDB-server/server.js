const express = require("express");
const jwt = require("jsonwebtoken");
const WebSocket = require("ws");
const cors = require("cors");
const mongoose = require("mongoose");

const JWT_SECRET_KEY = "contact-form-manager-server-secret-key";

const app = express();
app.use(cors());
const port = 5165;

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

const messageSchema = new mongoose.Schema({
  id: Number,
  name: String,
  message: String,
  gender: String,
  country: String,
  creationDate: String,
  read: String,
});

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  base64Photo: String,
  role: String,
});

const countrySchema = new mongoose.Schema({
  country: String,
});
const lastIdSchema = new mongoose.Schema({
  user: Number,
  message: Number,
});

const blacklistedTokensSchema = new mongoose.Schema({
  blacklistedTokens: String,
});

//Insert initial blacklistedTokens to MongoDB
const blacklistedTokensData = require("./data/blacklisted-tokens.json");
const BlacklistedTokens = mongoose.model(
  "BlacklistedTokens",
  blacklistedTokensSchema
);
const transformedBlacklistedTokensData = blacklistedTokensData.map(
  (blacklistedToken) => ({
    blacklistedTokens: blacklistedToken,
  })
);

// Insert initial lastId to MongoDB
const lastIdData = require("./data/last-id.json");
const LastId = mongoose.model("LastId", lastIdSchema);
// Insert initial users to MongoDB
const usersData = require("./data/users.json");
const User = mongoose.model("User", userSchema);
const transformedUsersData = usersData.map((user) => ({
  id: user.id,
  username: user.username,
  password: user.password,
  base64Photo: user.base64Photo,
  role: user.role,
}));

// Insert initial messages to MongoDB
const messagesData = require("./data/messages.json");
const Message = mongoose.model("Message", messageSchema);
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
const Country = mongoose.model("Country", countrySchema);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/contact-management-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

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
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Start the WebSocket server
const wss = new WebSocket.Server({ server });

// sample GET request handler (you can ignore this endpoint)
app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "Anonymous";
  res.status(200).send(`Hello, ${name}!`);
});

// sample POST request handler (you can ignore this endpoint)
app.post("/api/message", express.json(), (req, res) => {
  const message = req.body.message || "No message provided";
  res.status(200).send(`Your message: ${message}`);
});

async function checkTokenAndRole(req, res, roleList) {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "User is not authenticated" });
    return false;
  }
  try {
    const jwtTokenPayload = jwt.verify(token, JWT_SECRET_KEY);

    //const blacklistedTokens = await BlacklistedTokens.find().distinct("blacklistedTokens");
    const blacklistedTokens = await readDataFromMongo(
      "blacklistedtokens",
      "blacklistedTokens"
    );

    if (blacklistedTokens.includes(token)) {
      res.status(401).send({ error: "User is not authenticated" });
      return false;
    }

    //const currentUsers = await User.find();
    const currentUsers = await readDataFromMongo("users");

    const existingUser = currentUsers.find(
      (user) => user.id == jwtTokenPayload.userId
    );
    if (!existingUser) {
      res.status(401).send({ error: "User is not authenticated" });
      return false;
    }
    if (
      roleList &&
      roleList.length > 0 &&
      !roleList.includes(existingUser.role)
    ) {
      res.status(403).send({ error: "User is not authorized" });
      return false;
    }
  } catch (err) {
    res.status(401).send({ error: "User is not authenticated" });
    return false;
  }
  return true;
}

// POST login user
app.post("/api/user/login", express.json(), async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }
  //const currentUsers = await User.find();
  const currentUsers = await readDataFromMongo("users");

  const existingUser = currentUsers.find((user) => user.username === username);
  if (!existingUser) {
    res.status(400).send({ error: "Username does not exist" });
    return;
  }
  if (existingUser.password !== password) {
    res.status(400).send({ error: "Password is incorrect" });
    return;
  }
  const jwtTokenPayload = {
    userId: existingUser.id,
    username: existingUser.username,
  };
  const jwtToken = jwt.sign(jwtTokenPayload, JWT_SECRET_KEY, {
    expiresIn: "10m",
  });
  res.status(200).send({ data: { user: existingUser, token: jwtToken } });
});

// POST check if user is logged in
app.post("/api/user/check-login", express.json(), async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "Token is required" });
    return;
  }
  try {
    const jwtTokenPayload = jwt.verify(token, JWT_SECRET_KEY);

    //const blacklistedTokens = await BlacklistedTokens.find().distinct("blacklistedTokens");
    const blacklistedTokens = await readDataFromMongo(
      "blacklistedtokens",
      "blacklistedTokens"
    );

    if (blacklistedTokens.includes(token)) {
      res.status(401).send({ error: "Token is invalid" });
      return;
    }
    //const currentUsers = await User.find();
    const currentUsers = await readDataFromMongo("users");
    const existingUser = currentUsers.find(
      (user) => user.id == jwtTokenPayload.userId
    );
    if (!existingUser) {
      res.status(400).send({ error: "User does not exist" });
      return;
    }
    res.status(200).send({ data: { user: existingUser } });
  } catch (err) {
    res.status(401).send({ error: "Token is invalid" });
    return;
  }
});
// When i logout it doesnt update the blacklistedTokens collection check later
app.post("/api/user/logout", express.json(), async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "Token is required" });
    return;
  }
  //const tokenData = await BlacklistedTokens.find().distinct("blacklistedTokens");
  const blacklistedTokens = await readDataFromMongo(
    "blacklistedtokens",
    "blacklistedTokens"
  );

  if (!blacklistedTokens.includes(token)) {
    blacklistedTokens.push(token);
  }
  writeDataToMongo("blacklistedtokens", blacklistedTokens);
  res.status(200).send({ data: { message: "Logged out successfully" } });
});

// GET "countries"
app.get("/api/countries", async (req, res) => {
  //const countries = await Country.find().distinct("country");
  const countries = await readDataFromMongo("countries", "country");
  res.status(200).send({ data: { countries } });
});

// POST add new message
app.post("/api/message/add", express.json(), async (req, res) => {
  const { name, message, gender, country } = req.body;
  if (!name) {
    res.status(400).send({ error: "Name is required" });
    return;
  }
  if (!message) {
    res.status(400).send({ error: "Message is required" });
    return;
  }
  if (!gender) {
    res.status(400).send({ error: "Gender is required" });
    return;
  }
  if (!country) {
    res.status(400).send({ error: "Country is required" });
    return;
  }

  const messageId = await getNextMessageId();
  const newMessage = new Message({
    id: messageId,
    name: name,
    message: message,
    gender: gender,
    country: country,
    creationDate: new Date().toISOString(),
    read: "false",
  });

  writeDataToMongo("messages", messageId, newMessage);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const dataUpdate = {
        type: "dataUpdate",
        message: newMessage,
      };
      client.send(JSON.stringify(dataUpdate));
    }
  });

  res.status(200).send({ data: { message: newMessage } });
});
//pagination for messages
app.get("/api/messages-with-pagination", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  // Pagination parameters from the client
  const { page, pageSize, sortBy, sortOrder } = req.query;

  // const messages = await Message.find();
  const messages = await readDataFromMongo("messages");

  // Sorting
  if (
    sortBy &&
    ["name", "gender", "creationDate", "country", "id"].includes(sortBy)
  ) {
    if (sortBy === "id") {
      messages.sort((a, b) => {
        const aValue = parseInt(a[sortBy]);
        const bValue = parseInt(b[sortBy]);
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    } else {
      messages.sort((a, b) => {
        const aValue = String(a[sortBy]);
        const bValue = String(b[sortBy]);
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
  }

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + Number(pageSize);
  const paginatedMessages = messages.slice(startIndex, endIndex);

  res.status(200).send({ data: { messages: paginatedMessages } });
});

// pagination with scroll
app.get("/api/messages-with-scroll", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }
  const { page, pageSize } = req.query;
  const messages = await readDataFromMongo("messages");

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + Number(pageSize);
  const paginatedMessages = messages.slice(startIndex, endIndex);

  res.status(200).send({ data: { messages: paginatedMessages } });
});

// GET messages
app.get("/api/messages", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }
  const messages = await readDataFromMongo("messages");

  res.status(200).send({ data: { messages } });
});

// GET message by id
app.get("/api/message/:id", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }
  const { id } = req.params;

  //const messages = await Message.find();
  const messages = await readDataFromMongo("messages");

  const message = messages.find((message) => message.id == id);

  if (!message) {
    res.status(404).send({ error: "Message not found" });
    return;
  }
  res.status(200).send({ data: { message } });
});

// POST read message by id
app.post("/api/message/read/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }
  const { id } = req.params;

  //const messages = await Message.find();
  const messages = await readDataFromMongo("messages");

  const message = messages.find((message) => message.id == id);
  if (!message) {
    res.status(404).send({ error: "Message not found" });
    return;
  }
  message.read = "true";
  //update message in messages collection
  updateDataToMongo("messages", [message]);
  res.status(200).send({ data: { message } });
});

// POST delete message by id
app.post("/api/message/delete/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }
  const { id } = req.params;

  //const messages = await Message.find();
  const messages = await readDataFromMongo("messages");

  const messageIndex = messages.findIndex((message) => message.id == id);
  if (messageIndex < 0) {
    res.status(404).send({ error: "Message not found" });
    return;
  }
  messages.splice(messageIndex, 1);
  deleteDataFromMongo("messages", parseInt(id));
  res.status(200).send({ data: { message: { id } } });
});

// POST add new user with reader role
app.post("/api/user/add-reader", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }
  const { username, password, base64Photo } = req.body;
  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }
  if (!base64Photo) {
    res.status(400).send({ error: "Photo is required" });
    return;
  }
  const currentUsers = await readDataFromMongo("users");

  const existingUser = currentUsers.find((user) => user.username === username);
  if (existingUser) {
    res.status(400).send({ error: "Username already exists" });
    return;
  }

  const userId = await getNextUserId();
  const newUser = new User({
    id: userId,
    username: username,
    password: password,
    base64Photo: base64Photo,
    role: "reader",
  });

  writeDataToMongo("users", userId, newUser);

  res.status(200).send({ data: { user: newUser } });
});

// GET users
app.get("/api/users", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }
  const users = await readDataFromMongo("users");

  res.status(200).send({ data: { users } });
});

// GET user by id
app.get("/api/user/:id", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }
  const { id } = req.params;

  //const users = await User.find();
  const users = await readDataFromMongo("users");

  const user = users.find((user) => user.id == id);
  if (!user) {
    res.status(404).send({ error: "User not found" });
    return;
  }
  res.status(200).send({ data: { user } });
});

// POST update user by id
app.post("/api/user/update/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }
  const { id } = req.params;
  const { username, password, base64Photo } = req.body;
  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }
  if (!base64Photo) {
    res.status(400).send({ error: "Photo is required" });
    return;
  }

  //const users = await User.find();
  const users = await readDataFromMongo("users");

  const user = users.find((user) => user.id == id);
  if (!user) {
    res.status(404).send({ error: "User not found" });
    return;
  }
  //update user in users collection
  user.username = username;
  user.password = password;
  user.base64Photo = base64Photo;
  updateDataToMongo("users", [user]);

  res.status(200).send({ data: { user } });
});
