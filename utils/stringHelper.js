module.exports.isPalindromic = (message) => {
  let reversedMessage = [...message].reverse().join('');
  return message === reversedMessage;
}
