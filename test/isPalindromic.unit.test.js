const chai = require("chai");
const assert = chai.assert;
const {isPalindromic} = require('../utils/stringHelper');

describe('isPalindromic unit test', function (){
  it('empty string should return false', function () {
    assert.equal(isPalindromic(''), true);
  });

  it('single letter should return true', function () {
    assert.equal(isPalindromic('1'), true);
  });

  it('Rotator - should return true', function () {
    assert.equal(isPalindromic('Rotator'), true);
  });

  it('Racecar - should return true', function () {
    assert.equal(isPalindromic('Racecar'), true);
  });

  it('tattarrattat - should return true', function (){
    assert.equal(isPalindromic('123\n   \n321'), true);
  });

  it('A Santa Lived As a Devil At NASA - should return true', function (){
    assert.equal(isPalindromic('A Santa Lived As a Devil At NASA'), true);
  });

  it(
    'Are we not pure? “No, sir!” Panama’s moody Noriega brags. \n “It is garbage!” Irony dooms a man—a prisoner up to new era.  should return true',
    function () {
      assert.equal(isPalindromic(
        'Are we not pure? "No, sir!" Panama’s moody Noriega brags. "It is garbage!" Irony dooms a man—a prisoner up to new era.'),
        true);
    });

  it('Canada should return false', function () {
    assert.equal(isPalindromic('Canada'), false);
  });

  it('😀😀️️', function () {
    assert.equal(isPalindromic('😀😀'), true);
  });

  it('👶️👶🏿', function () {
    assert.equal(isPalindromic('👶️👶🏿'), false);
  });
});
