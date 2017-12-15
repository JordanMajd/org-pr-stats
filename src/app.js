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

// client.get('orgs/' + orgName)
//   .then(getReposForOrg)
//   .then(getLatestPullFromRepos)
//   // .then(getPullsFromRepos)
//   .then(getPullCount)
//   .catch(handleErr);

client.head('repos/ramda/ramda/pulls').then(function(res){
  console.log(res.headers.link);
  console.log(parseLink(res.headers.link);
});

function parseLink(link){
  return /(?=)\d(?=>; rel="last")/g.match(link);
}


function getReposForOrg(org){
  db.store('orgs', org);
  return client.getPaginated('orgs/' + orgName + '/repos', org.public_repos);
}

function getLatestPullFromRepos(repos){

  return Promise.map(repos, function(repo){

    db.store('repo', repo);

    let uri = 'repos/' + orgName + '/' + repo.name + '/pulls' + '?state=all&direction=desc';

    return client.get(uri).then(function(data, header){
      console.log(data);
    });

  });
}

// function getPullsFromRepos(data){
//
//   data.forEach()
//
// }

function getPullCount(){
  console.log('There are ' + db.count('pull') + ' pull requests for ' + orgName);
}

function handleErr(err){
  console.error(err);
}


// get repos for org
// get top pr # for repo
// batch
