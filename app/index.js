/* global process:true */

'use strict';
var yeoman = require('yeoman-generator'),
    path   = require('path'),
    chalk  = require('chalk'),
    yosay  = require('yosay'),
    _s     = require('underscore.string'),
    pkg    = require('../package.json');

function copyIdenticalPathsBase(path, context) {
  copyTemplateToDestBase.call(this, path, path, context);
}

function copyTemplateToDestBase(templatePath, destPath, context) {
  if (context) {
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destPath),
        context
      );
  } else {
    this.fs.copy(
      this.templatePath(templatePath),
      this.destinationPath(destPath)
    );
  }
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var appname = path.basename(process.cwd());
    appname = _s.slugify(_s.humanize(appname));
  
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('RESTify server') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What would you like me to name your server?',
      default: appname
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var copyIdenticalPaths = copyIdenticalPathsBase.bind(this);
      
      copyIdenticalPaths('app.js');
      copyIdenticalPaths('logging.js');
      copyIdenticalPaths('server.js');
      
      copyIdenticalPaths('config/default.json5');
      copyIdenticalPaths('config/local.json5.example');
      
      copyIdenticalPaths('routes/index.js');
      copyIdenticalPaths('routes/test.js');
      
      copyIdenticalPaths('test/server.js');
      
      copyIdenticalPaths('test/routes/index.js');
      copyIdenticalPaths('test/routes/test.js');
    },
    
    gitfiles: function() {
      var copyTemplateToDest = copyTemplateToDestBase.bind(this);
      
      copyTemplateToDest('_gitignore', '.gitignore');
      
      copyTemplateToDest('logs/_gitkeep', 'logs/.gitkeep');
    },

    projectfiles: function () {
      var copyIdenticalPaths = copyIdenticalPathsBase.bind(this);
      var copyTemplateToDest = copyTemplateToDestBase.bind(this);
      
      copyTemplateToDest('_package.json', 'package.json', {
        appname: _s.slugify(this.props.appName)
      });
      copyIdenticalPaths('README.md', {
        humanappname: _s.slugify(_s.humanize(this.props.appName)),
        pkg: pkg
      });
      copyTemplateToDest('_travis.yml', '.travis.yml');
    }
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
