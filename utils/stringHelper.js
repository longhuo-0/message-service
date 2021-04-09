/*module.exports.isPalindromic = (message) => {
  let reversedMessage = [...message].reverse().join('');
  return message === reversedMessage;
}*/

module.exports.isPalindromic = (message) => {
  //empty string is not a palindrome
  if(message.trim() === ""){
    return false;
  }

  //remove any special chars from this message
  const keepDigitAndWordRegex = /[^a-z0-9]+/g;
  message = message.toLowerCase().replace(keepDigitAndWordRegex, '');

  let strLen = message.length;
  let isPalindromic = true;
  let left = 0;
  let right = strLen - 1;

  //use Dynamic Programming to check if the left most char and the right most char are equal
  //if so, continue to left + 1 char and right - 1 char
  //comparing until reach middle of the array, then return true
  //if not, return false
  for( left = 0; left < strLen / 2; left++){
    if(message[left] !== message[right]){
      isPalindromic = false;
      break;
    }
    right--;
  }
  return isPalindromic;
}

