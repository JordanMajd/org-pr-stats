'use strict';

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const expect = require('chai').expect;
const DB = require('../src/db');

describe('DB', function() {
  describe('store', storeSpec);
  describe('fetch', fetchSpec);
  describe('count', countSpec);
});



function storeSpec() {

  let cache = new DB();

  it('returns undefined if type is undefined', function() {
    expect(cache.store()).to.be.undefined;
  });

  it('returns undefined if item is undefined', function() {
    expect(cache.store('stuff')).to.be.undefined;
  });

  it('returns undefined if item.id is undefined', function() {
    expect(cache.store('stuff', {})).to.be.undefined;
  });

  it('does not create type or store item if fails', function() {
    expect(cache.data.stuff).to.be.undefined;
  })

  it('creates type if type doesnt already exist', function() {
    cache.store('stuff', {
      id: 'thing'
    });
    expect(cache.data.stuff).to.not.be.undefined;
  });

  let cow = {
    id: 'cow'
  }
  it('returns key if item is stored', function() {
    expect(cache.store('stuff', cow)).to.equal('cow');
  });

  it('stores item successfully', function() {
    expect(cache.data.stuff.cow).to.equal(cow);
  });

}

function fetchSpec() {

  let cache = new DB();
  let cow = {
    id: 'cow'
  }
  cache.store('stuff', cow);

  it('fetches item successfully', function() {
    expect(cache.fetch('stuff', 'cow')).to.equal(cow);
  });

  it('returns undefined if item does not exist', function() {
    expect(cache.fetch('stuff', 'chicken')).to.be.undefined;
  });

  it('returns undefined if type does not exist', function() {
    expect(cache.fetch('things', 'cow')).to.be.undefined;
  });

  it('returns undefined if args are undefined', function() {
    expect(cache.fetch()).to.be.undefined;
    expect(cache.fetch('stuff')).to.be.undefined;
  });
}


function countSpec() {

  let cache = new DB();
  cache.store('stuff', {
    id: 'cow'
  });
  cache.store('stuff', {
    id: 'cat'
  });

  it('it returns number of items for given type', function() {
    expect(cache.count('stuff')).to.equal(2);
  });

  it('it returns undefined if given type does not exist', function() {
    expect(cache.count('things')).to.be.undefined;
  });

  it('it returns undefined if args are undefined', function() {
    expect(cache.count()).to.be.undefined;
  });
}
