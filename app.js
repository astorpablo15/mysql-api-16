const express = require('express');
const _ = require('lodash');
const logger = require('morgan');
require('dotenv').config();

const errorHandler = require('./src/middlewares/errorHandler');
const indexRouter = require('./src/routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use('/api', indexRouter);

app.use(errorHandler);

module.exports = app;