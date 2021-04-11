const chai = require("chai");
const assert = chai.assert;
const {canConvertToPositiveInteger} = require('../utils/stringHelper');

describe.skip('canConvertPositiveInteger unit test', function (){


  it("123 return true", function (){
    assert.equal(canConvertToPositiveInteger("123"), true);
  });

  it("-123 return false", function (){
    assert.equal(canConvertToPositiveInteger('-123'), false);
  });

  it("0x12 return false", function (){
    assert.equal(canConvertToPositiveInteger(-123), false);
  });

  it('0.1234 return false', function (){
    assert.equal(canConvertToPositiveInteger(0.1234), false);
  });

  it('1e10000 return false', function (){
    assert.equal(canConvertToPositiveInteger('1e10000'), false);
  });

  it('{} should return false', function (){
    assert.equal(canConvertToPositiveInteger({}), false);
  });

  it('[] should return false', function (){
    assert.equal(canConvertToPositiveInteger([]), false);
  });

  it('1.1 should return false', function (){
    assert.equal(canConvertToPositiveInteger('1.1'), false);
  });
});
