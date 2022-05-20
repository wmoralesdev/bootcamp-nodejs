var debug = require('debug')('bootcamp-nodejs-js:db');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    debug('Connected to Db');
})
.catch((err) => {
    debug('Error connecting to db: ' + err);
})
