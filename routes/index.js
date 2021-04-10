const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Cloud Audition Project
 *     responses:
 *       200:
 *         description: Returns a json
 */
router.get('/', function(req, res, next) {
  res.send({
    "success": true,
    "result": "api connection ok",
    "message": ""
  });
});

module.exports = router;
