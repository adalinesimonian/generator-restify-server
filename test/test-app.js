/* global describe:true, before:true, it:true, __dirname:true */

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('restify-server:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      
      'README.md',
      '.travis.yml',
      '.gitignore',
      
      'app.js',
      'logging.js',
      'server.js',
      
      'config/default.json5',
      'config/local.json5.example',
      
      'logs/.gitkeep',
      
      'routes/index.js',
      'routes/test.js',
      
      'test/server.js',
      
      'test/routes/index.js',
      'test/routes/test.js'
    ]);
  });
});
