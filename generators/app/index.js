'use strict';

const yeoman = require('yeoman-generator');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const JhipsterGenerator = yeoman.extend({});
const util = require('util');
const chalk = require('chalk');
const semver = require('semver');
const _ = require('lodash');

const packageJson = require(__dirname + '/../../package.json');
const mainPrompter = require('./main-prompter');
const mainWriter = require('./main-writer');

util.inherits(JhipsterGenerator, BaseGenerator);

module.exports = JhipsterGenerator.extend({

  initializing: {
    readConfig() {
      this.jhipsterAppConfig = this.getJhipsterAppConfig();
    },
    displayLogo() {
      // it's here to show that you can use functions from generator-jhipster
      // this function is in: generator-jhipster/generators/generator-base.js
      this.printJHipsterLogo();

      // Have Yeoman greet the user.
      this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster Nav Element')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);
    },
    checkJhipster() {
      const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
      const minimumJhipsterVersion = packageJson.dependencies['generator-jhipster'];
      if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
        this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
      }
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
