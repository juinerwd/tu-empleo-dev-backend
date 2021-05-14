const express = require('express');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT || 4001);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vacancies', require('./routes/vacancy'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


module.exports = app;