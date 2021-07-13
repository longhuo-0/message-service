const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user")

//access point for message controller
router.post("/", UserController.create);
router.get("/", UserController.getList);
router.put("/:id([0-9a-z]+)", UserController.updateById);
router.get("/:id([0-9a-z]+)", UserController.getById);
router.delete("/:id([0-9a-z]+)", UserController.deleteById);

module.exports = router;
