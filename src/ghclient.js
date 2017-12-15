'use strict';

/* Imports */
const rp = require('request-promise');
const Promise = require('bluebird');

/* Exports */
module.exports = GHClient;

function GHClient(){
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
GHClient.prototype.get = function(uri){
  let opts = Object.assign({}, this.opts);
  opts.uri += uri;
  return rp(opts);
};


// Returns a promise with an array of the paginated results
GHClient.prototype.getPaginated = function(uri, itemCount, perPage){

  if(perPage === undefined){
    perPage = 100;
  }

  // events and a few other endpoints only support
  let pageCount = Math.ceil(itemCount / perPage);

  let uris = [];

  // Start at page 1, pageCount is inclusive.
  for(let i = 1; i <= pageCount; i++){
    uris.push(uri + '?page=' + i + '&per_page=' + perPage);
  }

  // arrow function to bind this to GHClient
  return Promise.map(uris, (uri) => {
    return this.get(uri);
  }).then(function(data){
    return [].concat.apply([], data);
  });

};

GHClient.prototype.head = function(uri){
  let opts = Object.assign({}, this.opts);
  opts.uri += uri;
  opts.resolveWithFullResponse = true
  return rp.head(opts);
}
