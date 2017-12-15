'use strict';

/* Imports */

// configure environment variables from .env
// ensure this runs before anything else
require('dotenv').config();

const Promis = require('bluebird');
const DB = require('./db');
const GHClient = require('./ghclient');


/* Exports */
// module.exports = app;

let client = new GHClient();
let db = new DB();
let orgName = process.env.GH_ORG;

client.get('orgs/' + orgName)
  .then(getReposForOrg)
  .then(getLatestPullFromRepos);
  .then();


function getReposForOrg(org){
  db.store('orgs', org);
  return client.getPaginated('orgs/' + orgName + '/repos', org.public_repos);
}

function getLatestPullFromRepos(repos){
  return Promise.map(repos, function(repo){

    db.store('repo', repo);

    let uri = repo.url + '/pulls' + '?state=all&direction=desc';

    return client.get(uri); //todo update so doesn't need end number

  });
}

function getPullsFromRepos(stuff){

}


// get repos for org
// get top pr # for repo
// batch
