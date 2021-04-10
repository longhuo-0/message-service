const mongoose = require('mongoose');
const debug = require('debug')('message-service:server');

mongoose.connect('mongodb://localhost:27017/message-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(response => {
  debug("db connection ok");
});


mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('mongoose could not reconnect to mongodb server');
  });
});

