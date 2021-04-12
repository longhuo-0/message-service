const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  //create a wrapper wraps mongoose Types.ObjectId validation function
  //to test passing message id is valid
  isValidObjectId: (value) => {
    return ObjectId.isValid(value);
  }
}
