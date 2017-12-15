'use strict';

/* Imports */

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const Promise = require('bluebird');
const DB = require('./db');
const GHClient = require('./ghclient');
const flatten = require('./util').flatten;


/* Exports */
// module.exports = app;

let client = new GHClient();
let db = new DB();
let orgName = process.env.GH_ORG;

client.get('orgs/' + orgName)
  .then(getReposForOrg)
  .then(getPullsForRepos)
  .then(getPullCount)
  .catch(handleErr);

function getReposForOrg(org) {
  db.store('orgs', org);
  return client.getPaginated('orgs/' + orgName + '/repos');
}

function getPullsForRepos(repos) {

  return Promise.map(repos, function(repo) {

    db.store('repo', repo);

    let uri = 'repos/' + orgName + '/' + repo.name + '/pulls';

    return client.getPaginated(uri, '&state=all').then(function(pulls) {
      pulls = flatten(pulls);
      pulls.forEach(function(pull) {
        db.store('pull', pull);
      });
    });
  });
}

function getPullCount(pulls) {
  console.log('There are ' + db.count('pull') + ' pull requests for ' + orgName);
}

function handleErr(err) {
  console.error('Something went wrong:');
  console.error(err);
}
