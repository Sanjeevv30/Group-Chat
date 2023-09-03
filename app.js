const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML files in the 'public' directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle the login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;

  // Store the username in local storage
  res.cookie('username', username);

  // Redirect to the home page
  res.redirect('/');
});

// Handle sending messages
app.post('/send-message', (req, res) => {
  const username = req.cookies.username;
  const message = req.body.message;

  // Append the message to a file
  fs.appendFile('messages.txt', `${username}: ${message}\n`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving message');
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
