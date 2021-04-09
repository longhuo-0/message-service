module.exports = {
  ok: (result) => {
    return {
      success: true,
      result: result,
      message: "",
      error: "",
      timestamp: (new Date()).toISOString()
    };
  },
  error: (message, error) => {
    return {
      success: false,
      result: null,
      message: message,
      error: error.message,
      timestamp: (new Date()).toISOString()
    }
  }
}
