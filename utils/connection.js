const mongoose = require('mongoose');
const debug = require('debug')('message-service:api');

mongoose.connect(process.env.MONGO_DB_URI, {
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

