const debug = require('debug')('message-service:api');
const mongoose = require('mongoose');
const validator = require('validator');
const MessageModel = require('../models/message')
//message schema definition
const messageSchema = new mongoose.Schema({
  'message': {
    type: String,
    required: true,
    validate: {
      validator: function(s){
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },
  'palindromic': { type: Boolean, required: true, index: true }

}, {
  timestamps: true //createdAt, updatedAt will be auto generated
});

//prevent mongoose to deprecated method ensureIndex to create index
mongoose.set('useCreateIndex', true);

//log mongoose generated mongodb query
mongoose.set("debug", (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

class MessageClass {
  constructor(message, isPalindromic) {
    this.message = message;
    this.isPalindromic = isPalindromic;
  }

}

messageSchema.loadClass(MessageClass);
module.exports = mongoose.model('message', messageSchema);
