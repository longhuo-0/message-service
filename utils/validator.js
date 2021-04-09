const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  isValidObjectId: (value) =>{
    return ObjectId.isValid(value);
  }
}
