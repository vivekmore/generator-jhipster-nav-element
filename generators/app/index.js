const BaseGenerator = require('generator-jhipster/generators/generator-base');
const chalk = require('chalk');
const semver = require('semver');
const _ = require('lodash');

const packageJson = require('../../package.json');
const mainPrompter = require('./main-prompter');
const mainWriter = require('./main-writer');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster Navigation Element')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);
            },
            checkJhipster() {
                const jhipsterVersion = this.jhipsterConfig.jhipsterVersion;
                const minimumJhipsterVersion = packageJson.dependencies['generator-jhipster'];
                if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
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

      if (!!this.navElementKey) {
        var s = this.navElementKey.trim().replace(' ', '-').replace('_', '-');
        this.navElementKeyCamelCased = _.camelCase(s);
        this.navElementKeyCapitalized = _.upperFirst(_.camelCase(s));
      } else {
        this.log('Invalid navElementKey provided');
        return;
      }

      this.log('------------------------------------------------------------\n');
      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('enableTranslation=' + this.enableTranslation);
      this.log('navElementKey=' + this.navElementKey);
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
                <li ng-class="{active: vm.$state.includes('${elementComponentName}')}">
                    <a ui-sref="${elementComponentName}" ng-click="vm.collapseNavbar()">
                        <span class="glyphicon glyphicon-${glyphiconName}"></span>&nbsp;
                        <span ${this.enableTranslation ? 'data-translate="global.menu.' + elementComponentName + '"' : ''}>${_.startCase(elementComponentName)}</span>
                    </a>
                </li>`
          ]
        }, this);
      } catch (e) {
        this.log(chalk.yellow('\nUnable to find ') + fullPath + chalk.yellow(' or missing required jhipster-needle. Reference to ') + elementComponentName + ' ' + chalk.yellow('not added to menu.\n') + chalk.red(e) + '\n');
      }

    get prompting() {
        return {
            chooseATemplate: mainPrompter.promptToChooseATemplate,
            templateSpecificQuestions: mainPrompter.promptTemplateSpecificQuestions
        };
    }

    configuring() {
        this.templateDir = `${_.toLower(this.templateType)}/`;
    }

    get writing() {
        return {
            writeTemplateSpecificFiles() {
                mainWriter.writeTemplate(this);
            }
        };
    }

    end() {
        this.log(`\nThank you for using ${chalk.bold.yellow('JHipster Navigation Element')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);
    }
};
