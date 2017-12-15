'use strict';


const expect = require('chai').expect;
const util = require('../src/util');

describe('Util', function(){
  describe('flatten', flattenSpec);
});


function flattenSpec(){

  let inArr = [1, [2, [3, 4, [5]]]];
  let outArr = [1, 2, 3, 4, 5];

  it('Flattens an array of arrays recursively', function(){
    expect(util.flatten(inArr)).to.deep.equal(outArr);

  });
}
