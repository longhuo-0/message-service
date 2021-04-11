'use strict';
const debug = require('debug')('message-service:api');
const mongoose = require('mongoose');
const validator = require('validator');
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
  timestamps: true
});

mongoose.set('useCreateIndex', true);

mongoose.set("debug", (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

module.exports = mongoose.model('message', messageSchema);
