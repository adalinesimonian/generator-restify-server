/* global process:true */

'use strict';

var path = require('path'),
    cluster = require('cluster'),
    config = require('config'),
    app = require('./app'),
    logging = require('./logging');

// if process.env.NODE_ENV has not been set, default to development
var NODE_ENV = process.env.NODE_ENV || 'development';
  
exports.run = run;


function spawnWorker (logger) {
  // create servers
  var server = app.createServer(logger);

  // start listening
  var port = config.get('server.port');
  server.listen(port, function () {
    logger.info('%s listening at %s', server.name, server.url);
  });
}

function createCluster (logger) {
  
  // Set up cluster and start servers
  if (cluster.isMaster) {
    var numCpus = require('os').cpus().length;

    logger.info('Starting master, pid ' + process.pid + ', spawning '
      + numCpus + ' workers');

    // fork workers
    for (var i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on('listening', function (worker) {
      logger.info('Worker ' + worker.id + ' started');
    });

    // if a worker dies, respawn
    cluster.on('death', function (worker) {
      logger.warn('Worker ' + worker.id + ' died, restarting...');
      cluster.fork();
    });

  } 
  // Worker processes
  else {
    spawnWorker(logger);
  }
}

function run (cluster) {

  // Set up logging
  var logger = logging.createLogger(config.get('logging'));

  // In production environment, create a cluster
  if (NODE_ENV === 'production'
      || Boolean(config.get('server.cluster'))
      || cluster ) {
    createCluster(logger);
  }
  else {
    spawnWorker(logger);
  }

}

run();
