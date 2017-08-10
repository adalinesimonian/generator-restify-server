# generator-restify-server [![Build Status](https://secure.travis-ci.org/vsimonian/generator-restify-server.png?branch=master)](https://travis-ci.org/vsimonian/generator-restify-server)

This generator will scaffold out a RESTify server that uses:

- [config](https://github.com/lorenwest/node-config) and [json5](
  http://json5.org) for configuration
- [bunyan](https://github.com/trentm/node-bunyan) for logging
- [mocha](http://mochajs.org/) and [supertest](
  https://github.com/visionmedia/supertest) for testing
- [cluster](http://nodejs.org/docs/latest/api/cluster.html) for managing workers

This generator is based on (but not identical to) [restify-base](
https://github.com/jgoodall/restify-base).

## Getting Started

To install generator-restify-server from npm, run:

```bash
npm install -g generator-restify-server
```

Finally, initiate the generator:

```bash
yo restify-server
```

## License

MIT
