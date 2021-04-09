'use strict';

const mongoose = require('mongoose');

//message schema definition
const messageSchema = new mongoose.Schema({
  'message': {type: String, required: true},
  'palindromic': {type: Boolean, required: true, trim: true}

}, {
  timestamps: true
})

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

module.exports = mongoose.model('message', messageSchema);
