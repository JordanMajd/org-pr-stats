'use strict';

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const expect = require('chai').expect;
const GHClient = require('../src/ghclient');

describe('Resource', function() {
  describe('get', getSpec);
  describe('getPaginated', getPaginatedSpec);
  describe('getLastPage', getLastPageSpec);
  describe('head', headSpec);
});


function getSpec() {

  let client = new GHClient();

  it('It fetches the resource by name', function() {

    return client.get('users/octocat').then(function(data) {
      expect(data.id).to.equal(583231);
    });
  });
}

function getPaginatedSpec() {

  let client = new GHClient();

  it('It fetches n resources by page', function() {
    this.timeout(15000);

    return client.getPaginated('orgs/servo/repos').then(function(data) {
      expect(data.length).to.be.gt(100);
    });
  });
}

function getLastPageSpec() {


  let client = new GHClient();
  let link = '<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",<https://api.github.com/user/repos?page=50&per_page=100>; rel="last"';

  it('It returns the last page for the given link', function() {
    expect(client.getLastPage(link)).to.equal(50);
  });
}

function headSpec() {
  let client = new GHClient();

  it('It makes a head request and gets a response containing headers', function() {

    return client.head('orgs/servo/repos').then(function(res) {
      expect(res.headers).to.not.be.undefined;
    });
  });
}
