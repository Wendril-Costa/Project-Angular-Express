require('express-async-errors');
const express = require('express');
const cors = require('cors');
const errorHandling = require('../middlewares/errorHandling')
const routes = require('../routes/router')

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000'}));

app.use(routes)

app.use(errorHandling);

module.exports = app;