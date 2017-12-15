'use strict';

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const expect = require('chai').expect;
const GHClient = require('../src/ghclient');

describe('Resource', function(){

  describe('get', getSpec);
  describe('getPaginated', getPaginatedSpec);

});


function getSpec(){

  let client = new GHClient();

  it('It fetches the resource by name', function(){

    return client.get('users/octocat').then(function(data){
      expect(data.id).to.equal(583231);
    });
  });
}

function getPaginatedSpec(){

  let client = new GHClient();

  it('It fetches n resources by page', function(){

    return client.getPaginated('orgs/servo/repos', 130).then(function(data){
      expect(data.length).to.equal(130);
    });
  });
}
