# <%= humanappname %>

This project was generated using [yo restify-server generator](
https://github.com/vsimonian/generator-restify-server) version
<%= pkg.version %>.

## What's included

This project uses:

- [config](https://github.com/lorenwest/node-config) and [json5](
  http://json5.org) for configuration
- [bunyan](https://github.com/trentm/node-bunyan) for logging
- [mocha](http://visionmedia.github.io/mocha/) and [supertest](
  https://github.com/visionmedia/supertest) for testing
- [cluster](http://nodejs.org/docs/latest/api/cluster.html) for managing workers

## Configuring

See `config/local.json5.example` for a sample to get you started. If you need to
change any defaults, make a copy named `local.json5` and change it to your
liking.

If you want to have different configuration properties for different
environments, create configuration files named after the environments they are
for. For example, to create a configuration file that will be used when
`NODE_ENV` is `development`, create `development.json5`.

## Starting and stopping

Running `npm start` will start the server using [forever](
https://github.com/nodejitsu/forever), and running `npm stop` will stop it.
`npm run-script list` will list the forever processes that are running.

## Testing

Running `npm test` will execute the tests in the `test` directory using mocha.
