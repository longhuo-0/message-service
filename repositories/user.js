// mongoose modal
const User = require('../models/user');

module.exports = {

  /**
   * @param page
   * @param size
   * @param sortBy
   * @param sortOrder
   * @returns {Promise<*>}
   */
  getList: async (filter = {}, { page = 0, size = 10, sort = '-createdAt' }) => {
    return await User.find(filter).limit(size * 1).skip(page * size).sort(sort).exec();

  },
  create: async (user) => {
    const doc = new User(user);
    return await doc.save();
  },
  updateById: async (doc, id) => {
    return await User.findByIdAndUpdate(
      {
        _id: id,
      },
      doc, {
        new: true,
        runValidators: true
      }).exec();
  },
  getById: async (id) => {
    return User.findOne(
      {
        _id: id
      }).exec();
  },
  deleteById: async (id) => {
    return await User.findOneAndDelete(
      {
        _id: id
      }).exec();
  },
  count: async (filter) => {
    return await User.countDocuments(filter).exec();
  }
}
