'use strict';

/* Imports */

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const Promise = require('bluebird');
const DB = require('./db');
const GHClient = require('./ghclient');


/* Exports */
// module.exports = app;

let client = new GHClient();
let db = new DB();
let orgName = process.env.GH_ORG;

client.get('orgs/' + orgName)
  .then(getReposForOrg)
  .then(getPullsForRepos)
  .then(getPullsFromRepos)
  .then(getPullCount)
  .catch(handleErr);

function getReposForOrg(org){
  db.store('orgs', org);
  return client.getPaginated('orgs/' + orgName + '/repos');
}

function getPullsForRepos(repos){

  return Promise.map(repos, function(repo){

    db.store('repo', repo);

    let uri = 'repos/' + orgName + '/' + repo.name + '/pulls' + '?state=all';

    return client.getPaginated(uri).then(function(data){
      return [].concat.apply([], data);
    });
  });
}

function storePulls(pulls){

  return new Promise(function(reject, resolve){

    pulls.forEach(function(pull){
      db.store('pull', pull);
    });

    resolve();
  });
}

function getPullCount(){
  console.log('There are ' + db.count('pull') + ' pull requests for ' + orgName);
}

function handleErr(err){
  console.error(err);
}


// get repos for org
// get top pr # for repo
// batch
