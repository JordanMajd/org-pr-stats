'use strict';

/* Imports */

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const DB = require('./db');
const GHClient = require('./ghclient');


/* Exports */
// module.exports = app;

let client = new GHClient();
let db = new DB();

client.get('orgs/' + process.env.GH_ORG)
  .then(function(org){
    db.store('orgs', org);
    return client.getPaginated('orgs/ramda/repos', org.public_repos);
  })
  .then(function(repos){
    repos.forEach(function(repo){
      db.store('repo', repo);
    });
  });
