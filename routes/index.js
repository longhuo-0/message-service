const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

router.get('/', function(req, res, next) {
  res.send({
    "success": true,
    "result": "server is up",
    "message": ""
  });
});

module.exports = router;
