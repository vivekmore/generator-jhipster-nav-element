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

module.exports = yeoman.extend({

  initializing: {
    compose: function () {
      this.composeWith('jhipster:modules', {jhipsterVar, jhipsterFunc});
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

  inheritedStuff: {jhipsterVar, jhipsterFunc},

  writing: {
    writeTemplateSpecificFiles: function () {

      // function to use directly template
      this.template = function (source, destination) {
        this.fs.copyTpl(
          this.templatePath(source),
          this.destinationPath(destination),
          this
        );
      };

      mainWriter.writeTemplate(this);
    }
  },

  end: function () {
    this.log('End of nav element generation');
  }
});
