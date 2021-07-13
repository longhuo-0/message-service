const debug = require('debug')('message-service:api');
const mongoose = require('mongoose');
const validator = require('validator');

//message schema definition
const UserSchema = new mongoose.Schema({
  'username': {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(s){
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },
  'firstName': {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(s){
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },
  'lastName': {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(s){
        return !validator.isEmpty(s)
      },
      message: 'please provide a none blank string'
    }
  },

}, {
  timestamps: true //createdAt, updatedAt will be auto generated
});

//prevent mongoose to deprecated method ensureIndex to create index
mongoose.set('useCreateIndex', true);

//log mongoose generated mongodb query
mongoose.set("debug", (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

class UserClass {
  constructor(username, firstName, lastName) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}

UserSchema.loadClass(UserClass);
module.exports = mongoose.model('user', UserSchema);
