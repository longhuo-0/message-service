const express = require('express');
const router = express.Router();
const TodoController = require("../controllers/todo")

//access point for message controller
router.post("/", TodoController.create);
router.get("/", TodoController.getList);
router.put("/:id([0-9a-z]+)", TodoController.updateById);
router.get("/:id([0-9a-z]+)", TodoController.getById);
router.delete("/:id([0-9a-z]+)", TodoController.deleteById);

module.exports = router;
