const express = require('express');

const bodyParser = require('body-parser');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Index route
app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
