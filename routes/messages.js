const express = require('express');
const router = express.Router();
const User = require("../modals/message");
const response = require("../utils/response");

/* Create Message */
router.post("/", async (req, res) => {
  const message = new User({
    message: req.body.message,
    palindromic: true
  })
  try {
    const result = await message.save();
    response(req, res).success(result, 201);
  }
  catch (err) {
    response(req, res).error("save message failed", 429);
  }
});

router.get("/", async (req, res) => {
  const {page = 0, limit = 10, filters = {}, sortBy = "created", sortOrder = "desc"} = req.query;
  console.log({page, limit, filters, sortBy, sortOrder});
  try {
    const result = await User.find(filters).limit(limit*1).skip(page * limit).sort({
      [sortBy]: sortOrder
    });
    response(req, res).success(result, 201);
  }
  catch (err) {
    response(req, res).error(err, 429);
  }
});

router.put("/:id([0-9a-z]+)", async (req, res) => {
  const { id } = req.params;
  try {
    const { message } = req.body;

    const result = await User.findOneAndUpdate(
      {
        _id: id,
        palindromic: true
      },
      {
        message: message
      },);
    response(req, res).success(result, 200);
  }
  catch (err) {
    response(req, res).error(`update message ${id} failed`, 429);
  }
});

router.delete("/:id([0-9a-z]+)", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findOneAndDelete(
      {
        _id: id
      });
    response(req, res).success(result, 200);
  }
  catch (err) {
    response(req, res).error(`update message ${id} failed`, 429);
  }
});

router.get("/:id([0-9a-z]+)", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findOne(
      {
        _id: id
      });
    response(req, res).success(result, 200);
  }
  catch (err) {
    response(req, res).error(`update message ${id} failed`, 429);
  }
});

module.exports = router;
