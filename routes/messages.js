const express = require('express');
const router = express.Router();
const MessageController = require("../controllers/message")

/**
 * Message API
 */
router.post("/", MessageController.create);
router.get("/", MessageController.list);
router.put("/:id([0-9a-z]+)", MessageController.updateById);
router.get("/:id([0-9a-z]+)", MessageController.getById);
router.delete("/:id([0-9a-z]+)", MessageController.deleteById);

module.exports = router;
