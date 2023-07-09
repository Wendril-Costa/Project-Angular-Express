require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorHandling = require('../middleware/errorHandling')

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000'}));

app.use(errorHandling);

module.exports = app;