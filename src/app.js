const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('bootcamp-nodejs-js:server');

const baseRouter = require('./routes/base.router');

const app = express();

// mongoose setup
require('./config/db');

// passport strategies setup
require('./auth');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', baseRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // render the error page
    debug(err);
    return res.status(err.statusCode() || 500).json({ message: err.message });
});

module.exports = app;
