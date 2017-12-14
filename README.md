# Org PR Stats

[![Build Status](https://travis-ci.org/JordanMajd/org-pr-stats.svg?branch=master)](https://travis-ci.org/JordanMajd/org-pr-stats)

Org PR Stats is an node app to query the [GitHub API][gh] for pull request stats on a given organization. It was created as a solution to a take home interview question.

## Getting started

There are two ways to run the application, directly on your machine or in a docker container. Either process requires the same initial process:

1. Clone the repository `git clone https://github.com/JordanMajd/org-pr-stats.git`
1. Navigate into the repo `cd org-pr-stats`.
1. Set up a `.env` file with the name of the github organization to query.
  - Copy the example `.env` file: `cp .env.example .env`
  - Change `.env`'s contents from `GH_ORG="servo"` to `GH_ORG="<YOUR ORG HERE>"`.
  - Change `.env`'s user from `GH_USER="octocat"` to `GH_USER="<YOUR USER NAME HERE>"`.

### Direct

To run the application directly on your machine, ensure it is set up for [Node.js][node] development.

1. Install the dependencies: `npm install`
1. Run the application: `npm start`

### Docker

If you prefer to use docker, getting started is fairly straight forward.

1. Build the docker image: `npm run build-docker`
1. Run the container: `npm run start-docker`

Depending on your user permissions, you may need to run the docker commands with `sudo`.

### Tests

When making changes to the project be sure to write unit tests for the changes and  ensure the application passes the tests.

To run the unit tests use the command `npm test`.

## License

- MIT, see [LICENSE](/LICENSE) for more details.

[node]: https://nodejs.org/en/
[gh]: https://developer.github.com/v3/
