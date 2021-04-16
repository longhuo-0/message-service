// mongoose modal
const Message = require('../models/message');

module.exports = {

  /**
   * @param page
   * @param size
   * @param sortBy
   * @param sortOrder
   * @returns {Promise<*>}
   */
  getList: async (filter = {}, { page = 0, size = 10, sort = '-createdAt' }) => {
    return Message.find(filter).limit(size * 1).skip(page * size).sort(sort);

  },
  create: async (message) => {
    const doc = new Message(message);
    return await doc.save();
  },
  updateById: async (doc, id) => {
    return await Message.findByIdAndUpdate(
      {
        _id: id,
      },
      doc, {
        new: true,
        runValidators: true
      });
  },
  getById: async (id) => {
    return await Message.findOne(
      {
        _id: id
      });
    return result;
  },
  deleteById: async (id) => {
    return await Message.findOneAndDelete(
      {
        _id: id
      });
  },
  count: async (filter) => {
    return await Message.countDocuments(filter);
  }
}
