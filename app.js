const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const studentRoutes = require('./routes/students');
const logger = require('./middleware/logger');
const dbConfig = require('./config/database');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/', indexRoutes);
app.use('/students', studentRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send('Sorry, page not found');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
