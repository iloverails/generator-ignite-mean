'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeanIgniteGenerator = module.exports = function MeanIgniteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(MeanIgniteGenerator, yeoman.generators.Base);

MeanIgniteGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include Mongoose, Express, AngularJS and Node.');

  var prompts = [{
    name: 'appName',
    message: 'Enter app name'
  },{
    name: 'appDescription',
    message: 'Enter app description'
  },
  {
    name: "jqueryVersion",
    message: 'What the Jquery Version ?',
    default: "latest"
  },
  {
      name: "angularVersion",
      message: 'What the Angular Version ?',
      default: "latest"
  },
  {
      name: "angularResourceVersion",
      message: 'What the Angular Resource Version ?',
      default: "latest"
  },
  {
      name: "angularCookiesVersion",
      message: 'What the Angular Cookies Version ?',
      default: "latest"
  },
  {
      name: "angularMocksVersion",
      message: 'What the Angular Mocks Version ?',
      default: "latest"
  },
  {
      name: "angularRouteVersion",
      message: 'What the Angular Route Version ?',
      default: "latest"
  },
  {
      name: "angularBootstrapVersion",
      message: 'What the Angular Bootstrap Version ?',
      default: "0.10.0"
  },
  {
      name: "bootstrapVersion",
      message: 'What the Bootstrap Version ?',
      default: "3.0.3"
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;
    function hasFeature(feat) { return features !== undefined && features.indexOf(feat) !== -1; }
//    this.compassBootstrap = hasFeature('compassBootstrap');
    this.appName = answers.appName;
    this.appDescription = answers.appDescription;
    this.jqueryVersion =  answers.jqueryVersion;
    this.angularVersion =  answers.angularVersion;
    this.angularResourceVersion =  answers.angularResourceVersion;
    this.angularCookiesVersion =  answers.angularCookiesVersion;
    this.angularMocksVersion =  answers.angularMocksVersion;
    this.angularRouteVersion =  answers.angularRouteVersion;
    this.angularBootstrapVersion = answers.angularBootstrapVersion;
    this.bootstrapVersion = answers.bootstrapVersion;
    cb();
  }.bind(this));
};

MeanIgniteGenerator.prototype.grunt = function grunt() {
  this.copy('_gruntfile.js', 'gruntfile.js');
};

MeanIgniteGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

MeanIgniteGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

MeanIgniteGenerator.prototype.travis = function travis() {
  this.copy('travis.yml', '.travis.yml');
};

MeanIgniteGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

MeanIgniteGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

MeanIgniteGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

MeanIgniteGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/routes');
  this.mkdir('app/routes/middlewares');
  this.mkdir('app/views');
  this.mkdir('app/views/includes');
  this.mkdir('app/views/users');
  this.mkdir('app/views/layouts');

  this.copy('app/controllers/index.js');
  this.copy('app/controllers/users.js');

  this.copy('app/models/user.js');

  this.copy('app/routes/middlewares/authorization.js');
  this.copy('app/routes/index.js');
  this.copy('app/routes/users.js');

  this.copy('app/views/includes/foot.html');
  this.copy('app/views/includes/head.html');

  this.copy('app/views/layouts/default.html');

  this.copy('app/views/users/auth.html');
  this.copy('app/views/users/signin.html');
  this.copy('app/views/users/signup.html');

  this.copy('app/views/404.html');
  this.copy('app/views/500.html');
  this.copy('app/views/index.html');

};

MeanIgniteGenerator.prototype.configSetup = function configSetup() {
  this.mkdir('config');
  this.mkdir('config/env');

  this.copy('config/env/all.js');
  this.copy('config/env/localhost.js');
  this.copy('config/env/development.js');
  this.copy('config/env/production.js');
  this.copy('config/env/test.js');

  this.copy('config/assets.json');
  this.copy('config/config.js');
  this.copy('config/express.js');
  this.copy('config/passport.js');
};

MeanIgniteGenerator.prototype.publicSetup = function publicSetup() {

  this.mkdir('public');
  this.mkdir('public/js');
  this.mkdir('public/js/controllers');
  this.mkdir('public/js/services');
  this.mkdir('public/views');
  this.mkdir('public/css');
  this.mkdir('public/img');
  this.mkdir('public/img/icons');
  this.copy('public/img/icons/github.png');
  this.copy('public/img/icons/facebook.png');
  this.copy('public/img/icons/linkedin.png');
  this.copy('public/img/icons/twitter.png');
  this.copy('public/img/icons/google.png');
  this.copy('public/css/common.css');
  this.copy('public/js/controllers/index.js');
  this.copy('public/js/controllers/header.js');
  this.copy('public/js/services/global.js');
  this.copy('public/js/app.js');
  this.copy('public/js/config.js');
  this.copy('public/js/directives.js');
  this.copy('public/js/filters.js');
  this.copy('public/js/init.js');
  this.copy('public/views/index.html');
  this.copy('public/views/header.html');

  this.copy('public/humans.txt');
  this.copy('public/robots.txt');
};

MeanIgniteGenerator.prototype.testSetup = function serverSetup() {
    this.mkdir('test');
    this.mkdir('test/karma');
    this.mkdir('test/mocha');
    this.mkdir('test/mocha/user');
    this.copy('test/mocha/user/model.js');
    this.mkdir('test/karma/unit');
    this.mkdir('test/karma/unit/controllers');
    this.copy('test/karma/karma.conf.js');
    this.copy('test/karma/unit/controllers/headers.spec.js');
    this.copy('test/karma/unit/controllers/index.spec.js');
};

MeanIgniteGenerator.prototype.serverSetup = function serverSetup() {
    this.copy('_server.js', 'server.js');
};
