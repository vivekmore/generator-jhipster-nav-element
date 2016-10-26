'use strict';

var yeoman = require('yeoman-generator'),
  constants = require('./constants'),
  prompts = require('./main-prompter'),
  defaultTemplatePrompter = require('./about-us/about-us-template-prompter'),
  defaultTemplateWriter = require('./about-us/about-us-template-writer'),
  util = require('util'),
  chalk = require('chalk'),
  _ = require('lodash'),
  packagejs = require(__dirname + '/../../package.json');

// JHipster variables & functions
var jhipsterVar = {moduleName: 'nav-element'};
var jhipsterFunc = {};

var Generator = yeoman.Base.extend({});
util.inherits(Generator, defaultTemplatePrompter);

module.exports = Generator.extend({

  initializing: {
    compose: function (args) {
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
      this.log('Welcome to the ' + chalk.red('JHipster nav-element') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  prompting: {
    askToChooseATemplate: function () {
      prompts.askToChooseATemplate(this);
    },

    askTemplateSpecificQuestions: function () {
      switch (this.props.templateType) {
        case constants.TEMPLATE_TYPE.CONTACT_US:
          prompts.askContactUsTemplateQuestions(this);
          break;
        case constants.TEMPLATE_TYPE.FAQ:
          prompts.askFaqTemplateQuestions(this);
          break;
        case constants.TEMPLATE_TYPE.DEFAULT:
          prompts.askDefaultTemplateQuestions(this);
          break;
        default:
          this.log('The templateType [' + this.props.templateType + '] is unknown');
          break;
      }
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
    writeFromDefaultTemplate: function () {
      defaultTemplateWriter.write(this);
    }
  },

  end: function () {
    this.log('End of nav-element generator');
  }
});
