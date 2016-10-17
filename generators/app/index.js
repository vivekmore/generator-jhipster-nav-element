'use strict';

var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  _ = require('lodash'),
  jhipsterUtils = require('../../node_modules/generator-jhipster/generators/util'),
  packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'nav-element'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster nav-element') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'navElementKey',
        message: 'What would you like the nav element id to be? (e.g. aboutUs, about-us)',
        default: 'about-us'
      },
      {
        type: 'list',
        name: 'createDirective',
        message: 'Would you like me to create a sample directive for your nav element?',
        choices: [
          {value: true, name: 'Yes'},
          {value: false, name: 'No'}
        ],
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    writeTemplates: function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      var javaDir = jhipsterVar.javaDir;
      var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;
      var enableTranslation = jhipsterVar.enableTranslation;

      this.message = this.props.message;
      this.navElementKey = this.props.navElementKey;
      this.createDirective = this.props.createDirective;

      this.navElementKeyCamelCased = this.navElementKey;
      if (this.navElementKey) {

        if (this.navElementKey.indexOf('-') !== -1) {
          this.navElementKeyCamelCased = this.navElementKey.replace(/-([a-z])/g, function (match) {
            return match[1].toUpperCase();
          });

        } else if (this.navElementKey.indexOf('_') !== -1) {
          this.navElementKeyCamelCased = this.navElementKey.replace(/_([a-z])/g, function (match) {
            return match[1].toUpperCase();
          });

        } else if (this.navElementKey.indexOf(' ') !== -1) {
          var s = this.navElementKey.replace(' ', '-');
          this.navElementKeyCamelCased = s.replace(/-([a-z])/g, function (match) {
            return match[1].toUpperCase();
          });
        }

      } else {
        this.log('Invalid navElementKey provided');
        return;
      }

      this.navElementKeyCapitalized = this.navElementKeyCamelCased.charAt(0).toUpperCase() + this.navElementKeyCamelCased.slice(1);

      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('navElementKey=' + this.navElementKey);
      this.log('navElementKeyCamelCased=' + this.navElementKeyCamelCased);
      this.log('navElementKeyCapitalized=' + this.navElementKeyCapitalized);

      var elementComponentName = this.navElementKeyCamelCased;


      // HTML TEMPLATE
      this.template('src/main/webapp/app/element/element.html', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.html');


      // CONTROLLER
      this.template('src/main/webapp/app/element/element.controller.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.controller.js');


      // STATE
      this.template('src/main/webapp/app/element/element.state.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.state.js');


      // SERVICE
      this.template('src/main/webapp/app/element/element.service.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.service.js');


      // DIRECTIVE
      if (this.props.createDirective) {
        this.template('src/main/webapp/app/element/element.directive.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.directive.js');
      }


      // ELEMENT JSON
      if (enableTranslation) {
        jhipsterFunc.getAllInstalledLanguages().forEach(function (language) {
          var fullPath = webappDir + 'i18n/' + language + '/' + elementComponentName + '.json';
          this.template('src/main/webapp/i18n/lang/element.json', fullPath);
        }, this);
      }


      // GLOBAL JSON
      var i18nKey = this.navElementKeyCamelCased;
      var i18nValue = this.navElementKey;
      jhipsterFunc.addTranslationKeyToAllLanguages(i18nKey, i18nValue, 'addElementTranslationKey', enableTranslation);


      // ENTRIES TO NAVBAR.HTML
      var glyphiconName = 'baby-formula';
      try {
        var fullPath = webappDir + 'app/layouts/navbar/navbar.html';
        jhipsterUtils.rewriteFile({
          file: fullPath,
          needle: 'jhipster-needle-add-element-to-menu',
          splicable: [
            `
                <li ng-class="{active: vm.$state.includes('${elementComponentName}')}">
                    <a ui-sref="${elementComponentName}" ng-click="vm.collapseNavbar()">
                        <span class="glyphicon glyphicon-${glyphiconName}"></span>&nbsp;
                        <span ${enableTranslation ? 'data-translate="global.menu.' + elementComponentName + '"' : ''}>${_.startCase(elementComponentName)}</span>
                    </a>
                </li>`
          ]
        }, this);
      } catch (e) {
        this.log(chalk.yellow('\nUnable to find ') + fullPath + chalk.yellow(' or missing required jhipster-needle. Reference to ') + elementComponentName + ' ' + chalk.yellow('not added to menu.\n') + chalk.red(e) + '\n');
      }


      // TESTS
      this.template('src/test/javascript/spec/app/element/element.controller.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.controller.spec.js');
      this.template('src/test/javascript/spec/app/element/element.state.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.state.spec.js');
      this.template('src/test/javascript/spec/app/element/element.service.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.service.spec.js');
      if (this.props.createDirective) {
        this.template('src/test/javascript/spec/app/element/element.directive.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.directive.spec.js');
      }

    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of nav-element generator');
  }
});
