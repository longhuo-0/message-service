module.exports = {
  ok: (result) => {
    return {
      result: result,
      message: "",
      error: "",
      timestamp: (new Date()).toISOString()
    };
  },
  error: (message, error) => {
    return {
      result: null,
      message: message,
      error: error?.message,
      timestamp: (new Date()).toISOString()
    }
  }
}
