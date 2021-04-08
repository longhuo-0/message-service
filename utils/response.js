module.exports = function (req, res) {
  return {
    success: (result, code) => {
      res.statusCode = code;
      res.json({
        success: true,
        result: result,
        message: "",
      });
    },
    error: (message, code) => {
      res.statusCode = code;
      res.json({
        success: false,
        result: null,
        message: message,
      })
    }
  }
}
