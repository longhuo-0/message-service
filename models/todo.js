const debug = require('debug')('message-service:api');
const mongoose = require('mongoose');
const validator = require('validator');

//message schema definition
const TodoSchema = new mongoose.Schema({
  'title': {
    type: String,
    required: true,
    validate: {
      validator: function(s){
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },
  'completed': { type: Boolean, required: true, index: true }

}, {
  timestamps: true //createdAt, updatedAt will be auto generated
});

//prevent mongoose to deprecated method ensureIndex to create index
mongoose.set('useCreateIndex', true);

//log mongoose generated mongodb query
mongoose.set("debug", (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

class TodoClass {
  constructor(title, completed) {
    this.message = title;
    this.isPalindromic = completed;
  }

}

TodoSchema.loadClass(TodoClass);
module.exports = mongoose.model('todo', TodoSchema);
