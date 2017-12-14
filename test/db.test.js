'use strict';

const expect = require('chai').expect;
const DB = require('../src/db');

describe('DB', function(){
  describe('store', storeSpec);
  describe('fetch', fetchSpec);
});



function storeSpec(){

  let cache = new DB();

  it('returns false if type is undefined', function(){
    expect(cache.store()).to.be.false;
  });

  it('returns false if item is undefined', function(){
    expect(cache.store('stuff')).to.be.false;
  });

  it('returns false if item.id is undefined', function(){
    expect(cache.store('stuff', {})).to.be.false;
  });

  it('does not create type or store item if fails', function(){
    expect(cache.data.stuff).to.be.undefined;
  })

  it('creates type if type doesnt already exist', function(){
    cache.store('stuff', { id: 'thing'});
    expect(cache.data.stuff).to.not.be.undefined;
  });

  let cow = { id: 'cow'}
  it('returns true if item is stored', function(){
    expect(cache.store('stuff', cow)).to.be.true;
  });

  it('stores item successfully', function(){
    expect(cache.data.stuff.cow).to.equal(cow);
  });

}

function fetchSpec(){

  let cache = new DB();
  let cow = { id: 'cow'}
  cache.store('stuff', cow);

  it('fetches item successfully', function(){
    expect(cache.fetch('stuff','cow')).to.equal(cow);
  });

  it('returns undefined if item does not exist', function(){
    expect(cache.fetch('stuff', 'chicken')).to.be.undefined;
  });

  it('returns undefined if type does not exist', function(){
    expect(cache.fetch('things', 'cow')).to.be.undefined;
  });

  it('returns undefined if args are undefined', function(){
    expect(cache.fetch()).to.be.undefined;
    expect(cache.fetch('stuff')).to.be.undefined;
  });
}
