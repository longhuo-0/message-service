// mongoose modal
const Todo = require('../models/todo');

module.exports = {

  /**
   * @param page
   * @param size
   * @param sortBy
   * @param sortOrder
   * @returns {Promise<*>}
   */
  getList: async (filter = {}, { page = 0, size = 10, sort = '-createdAt' }) => {
    return await Todo.find(filter).limit(size * 1).skip(page * size).sort(sort).exec();

  },
  create: async (todo) => {
    const doc = new Todo(todo);
    return await doc.save();
  },
  updateById: async (doc, id) => {
    return await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      doc, {
        new: true,
        runValidators: true
      }).exec();
  },
  getById: async (id) => {
    return Todo.findOne(
      {
        _id: id
      }).exec();
  },
  deleteById: async (id) => {
    return await Todo.findOneAndDelete(
      {
        _id: id
      }).exec();
  },
  count: async (filter) => {
    return await Todo.countDocuments(filter).exec();
  }
}
