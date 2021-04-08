'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  'message': {type: String, required: true},
  'palindromic': {type: Boolean, required: true, trim: true}

}, {
  timestamps: true
})

module.exports = mongoose.model('message', messageSchema);
