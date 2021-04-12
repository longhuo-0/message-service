/**
 *
 * RestAPI response normalization
 */
module.exports = {
  /**
   * when request completed, result should be always be an object
   * message and error will always be empty string
   * @param result
   * @returns {{result: object, message: "", error: "", timestamp: string}}
   */
  ok: (result) => {
    return {
      result: result,
      message: "",
      error: "",
      timestamp: (new Date()).toISOString()
    };
  },
  /**
   * when request failed, result should be null, message will give hint to failing reason
   * @param message
   * @param error
   * @returns {{result: null, message string, error: (*|string), timestamp: string}}
   */
  error: (message, error) => {
    return {
      result: null,
      message: message,
      error: error ? error.message : "",
      timestamp: (new Date()).toISOString()
    }
  }
}
