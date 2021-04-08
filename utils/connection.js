'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/message-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(response => {
  console.log("db connection ok");
});

mongoose.set('debug', true);
mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('mongoose could not reconnect to mongodb server');
  });
});

