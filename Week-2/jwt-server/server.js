const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3440;
const secretKey = 'yourSecretKey'; // Replace this with a strong secret key in production.

app.use(cors());
app.use(bodyParser.json());

// Sample user data for authentication (Replace this with your actual authentication logic)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Endpoint for user login and token generation
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate a JWT token and send it in the response
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1m' });
  res.json({ token });
});

// Middleware to verify JWT token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next();
  });
};

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  // Access the authenticated user's ID from req.user.userId
  res.json({ message: 'This is a protected route.', userId: req.user.userId });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
