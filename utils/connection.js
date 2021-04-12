const mongoose = require('mongoose');
const debug = require('debug')('message-service:api');

console.log("start db connection " + process.env.MONGO_DB_URI);
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(response => {
  console.log("db connection ok " + process.env.MONGO_DB_URI);
});


mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('mongoose could not reconnect to mongodb server');
  });
});

