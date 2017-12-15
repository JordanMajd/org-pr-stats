'use strict';

/* Imports */
const rp = require('request-promise');
const Promise = require('bluebird');
const flatten = require('./util').flatten;

/* Exports */
module.exports = GHClient;

function GHClient() {
  this.opts = {
    uri: 'https://api.github.com/',
    headers: {
      'User-Agent': process.env.GH_USER,
      'Authorization': 'token ' + process.env.GH_OAUTH
    },
    json: true
  };
}

// Returns a promise with the item
GHClient.prototype.get = function(uri) {
  let opts = Object.assign({}, this.opts);
  opts.uri += uri;
  return rp(opts);
};


// Returns a promise with an array of the paginated results
GHClient.prototype.getPaginated = function(uri, arg) {

  if (arg === undefined) {
    arg = '';
  }

  //  arrow function to bind this to GHClient
  return this.head(uri, arg).then((res) => {


    // get number of pages
    // if link is undefined, assume 1 page
    let pageCount = 1;
    if (res.headers.link !== undefined) {
      pageCount = this.getLastPage(res.headers.link);
    }

    let promises = [];
    let pullRequests = [];

    // Start at page 1, pageCount is inclusive.
    for (let i = 1; i <= pageCount; i++) {

      let path = uri + '?page=' + i + '&per_page=100' + arg;

      let chain = this.get(path).then(function(pulls) {
        pullRequests.push(pulls);
      });

      promises.push(chain);
    }

    return Promise.all(promises).then(function() {
      return flatten(pullRequests);
    });
  });
};

GHClient.prototype.head = function(uri, arg) {
  let opts = Object.assign({}, this.opts);
  opts.uri += uri + '?per_page=100' + arg;
  opts.resolveWithFullResponse = true;
  return rp.head(opts);
};

GHClient.prototype.getLastPage = function(link) {
  // search link header for last page
  let last = link.split(',')[1];
  let page = last.match(/(\?|&)page=(\d+)/g)[0];
  let numStr = page.split('=')[1];
  return parseInt(numStr, 10);
};
