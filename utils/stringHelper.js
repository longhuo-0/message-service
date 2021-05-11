/**
 * characterization of a palindrome string
 * an empty string is a palindrome
 * a single character is a palindrome
 * a string l m r is a palindrome, if m is a palindrome and l is a character equal to r
 * nothing else is a palindrome.
 *
 * note:
 * test will ignore special[^a-z0-9] chars and replace with ''
 * test will ignore cases

 * @param message
 * @returns {boolean}
 */
// 1231231233211
module.exports.isPalindromic = (message) => {
  if (typeof message !== 'string') {
    return false;
  }

  //a single character or empty is a palindrome
  if (message.length <= 1) {
    return true;
  }

  //remove any special chars from this message
  const keepDigitAndWordRegex = /[—\-!$%^&*()_+|~="\’'`{}\[:;<>?,.@#\]\s]/g;
  message = message.replace(keepDigitAndWordRegex, '');
  let message_chars = [...message];
  console.log(message);
  console.log(message_chars);
  let strLen = message_chars.length;
  let isPalindromic = true;
  let left;
  let right = strLen - 1;

  //use Dynamic Programming to check if the left most char and the right most char are equal
  //if so, continue to left + 1 char and right - 1 char
  //comparing until reach middle of the array, then return true
  //if not, return false
  for (left = 0; left < strLen / 2; left++) {
    if (message_chars[left].toLowerCase() !== message_chars[right].toLowerCase()) {
      isPalindromic = false;
      break;
    }
    right--;
  }
  return isPalindromic;
}

//this function only test string from query params
module.exports.canConvertToPositiveInteger = (value) => {
  //try to convert string to number
  if(!Number.isNaN(+value)){
    value = Number(value);
    //check if this number is integer and greater than zero
    if(Number.isInteger(value) && value > 0){
      return true;
    }
  }
  return false;
}
