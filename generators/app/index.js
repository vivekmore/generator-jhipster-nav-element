'use strict';

var yeoman = require('yeoman-generator'),
  mainPrompter = require('./main-prompter'),
  mainWriter = require('./main-writer'),
  chalk = require('chalk'),
  _ = require('lodash'),
  packageJson = require(__dirname + '/../../package.json');

// JHipster variables & functions
var jhipsterVar = {moduleName: 'nav-element'};
var jhipsterFunc = {};

var Generator = yeoman.Base.extend({});

module.exports = Generator.extend({

  initializing: {
    compose: function () {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        });
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster nav-element') + ' generator! ' + chalk.yellow('v' + packageJson.version + '\n'));
    }
  },

  prompting: {
    chooseATemplate: function () {
      mainPrompter.promptToChooseATemplate(this);
    },

    templateSpecificQuestions: function () {
      mainPrompter.promptTemplateSpecificQuestions(this);
    }
  },

  configuring: function () {
    this.templateDir = _.toLower(this.props.templateType) + '/';
  },

  props: {},

  inheritedStuff: {
    jhipsterVar: jhipsterVar,
    jhipsterFunc: jhipsterFunc
  },

  writing: {
    writeTemplateSpecificFiles: function () {
      mainWriter.writeTemplate(this);
    }
  },

  end: function () {
    this.log('End of nav element generation');
  }
});
