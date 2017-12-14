'use strict';

const expect = require('chai').expect;
const app = require('../src/app');

describe('app', function(){

  it('Ensures the application is set up correctly with chai', function(){
    expect(app()).to.equal('it works!');
  });

});
