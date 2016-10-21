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
        });
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
      this.enableTranslation = jhipsterVar.enableTranslation;

      this.message = this.props.message;
      this.navElementKey = this.props.navElementKey;
      this.createDirective = this.props.createDirective;

      var s = this.navElementKey.trim().replace(' ', '-').replace('_', '-');
      this.navElementKeyCamelCased = _.camelCase(s);
      this.navElementKeyCapitalized = _.upperFirst(_.camelCase(s));
      this.controllerName = _.upperFirst(_.camelCase(s)) + 'Controller';
      this.serviceName = _.upperFirst(_.camelCase(s)) + 'Service';
      this.directiveName = 'aboutToday';
      this.directiveKebabCased = _.kebabCase(this.directiveName.trim());

      this.log('------------------------------------------------------------\n');
      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('enableTranslation=' + this.enableTranslation);
      this.log('navElementKey=' + this.navElementKey);
      this.log('controllerName=' + this.controllerName);
      this.log('serviceName=' + this.serviceName);
      this.log('directiveName=' + this.directiveName);
      this.log('directiveKebabCased=' + this.directiveKebabCased);
      this.log('navElementKeyCamelCased=' + this.navElementKeyCamelCased);
      this.log('navElementKeyCapitalized=' + this.navElementKeyCapitalized);
      this.log('------------------------------------------------------------\n');

      var elementComponentName = this.navElementKeyCamelCased;


      var webappDir = jhipsterVar.webappDir;
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
      if (this.enableTranslation) {
        jhipsterFunc.getAllInstalledLanguages().forEach(function (language) {
          this.log('processing for ' + language);
          var fullPath = webappDir + 'i18n/' + language + '/' + elementComponentName + '.json';
          this.template('src/main/webapp/i18n/lang/element.json', fullPath);
        }, this);
      }


      // GLOBAL JSON
      var i18nKey = this.navElementKeyCamelCased;
      var i18nValue = this.navElementKey;
      jhipsterFunc.addTranslationKeyToAllLanguages(i18nKey, i18nValue, 'addElementTranslationKey', this.enableTranslation);


      // ENTRIES TO NAVBAR.HTML
      var glyphiconName = 'baby-formula';
      try {
        var fullPath = webappDir + 'app/layouts/navbar/navbar.html';
        jhipsterUtils.rewriteFile({
          file: fullPath,
          needle: 'jhipster-needle-add-element-to-menu',
          splicable: [
            `
                <li ui-sref-active="active">
                    <a ui-sref="${elementComponentName}" ng-click="vm.collapseNavbar()">
                        <span class="glyphicon glyphicon-${glyphiconName}"></span>&nbsp;
                        <span${this.enableTranslation ? ' data-translate="global.menu.' + elementComponentName + '"' : ''}>${_.startCase(elementComponentName)}</span>
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

  end: function () {
    this.log('End of nav-element generator');
  }
});
