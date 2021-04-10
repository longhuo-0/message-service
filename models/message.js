'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
//message schema definition
const messageSchema = new mongoose.Schema({
  'message': {
    type: String,
    required: true,
    index: true,
    validate: {
      validator: function(s){
        console.log("here");
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },
  'palindromic': {type: Boolean, required: true}

}, {
  timestamps: true
})
mongoose.set('useCreateIndex', true);
if(process.env.mode === 'development'){
  mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}


module.exports = mongoose.model('message', messageSchema);
