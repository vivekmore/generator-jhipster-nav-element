'use strict';

const _ = require('lodash');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
  write
};

function write(generator) {

  const jhipsterAppConfig = generator.jhipsterAppConfig;

  generator.baseName = jhipsterAppConfig.baseName;
  generator.packageName = jhipsterAppConfig.packageName;
  generator.angularAppName = generator.getAngularAppName();
  generator.enableTranslation = jhipsterAppConfig.enableTranslation;

  generator.message = generator.props.message;
  generator.navElementKey = generator.props.navElementKey;
  generator.createDirective = generator.props.createDirective;

  const s = generator.navElementKey.trim().replace(' ', '-').replace('_', '-');
  generator.navElementKeyCamelCased = _.camelCase(s);
  generator.navElementKeyCapitalized = _.upperFirst(_.camelCase(s));
  generator.controllerName = _.upperFirst(_.camelCase(s)) + 'Controller';
  generator.serviceName = _.upperFirst(_.camelCase(s)) + 'Service';
  generator.directiveName = 'faqToday';
  generator.navElementTranslationPart = _.camelCase(s);
  generator.directiveKebabCased = _.kebabCase(generator.directiveName.trim());

  generator.log('------------------------------------------------------------');
  generator.log('baseName=' + generator.baseName);
  generator.log('packageName=' + generator.packageName);
  generator.log('angularAppName=' + generator.angularAppName);
  generator.log('enableTranslation=' + generator.enableTranslation);
  generator.log('navElementKey=' + generator.navElementKey);
  generator.log('controllerName=' + generator.controllerName);
  generator.log('serviceName=' + generator.serviceName);
  generator.log('directiveName=' + generator.directiveName);
  generator.log('directiveKebabCased=' + generator.directiveKebabCased);
  generator.log('navElementKeyCamelCased=' + generator.navElementKeyCamelCased);
  generator.log('navElementKeyCapitalized=' + generator.navElementKeyCapitalized);
  generator.log('------------------------------------------------------------');

  const elementComponentName = generator.navElementKeyCamelCased;

  const angularJsTemplateDir = 'angularjs/' + generator.templateDir;

  const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
  // HTML TEMPLATE
  generator.template(angularJsTemplateDir + 'src/main/webapp/app/element/element.html', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.html');


  // CONTROLLER
  generator.template(angularJsTemplateDir + 'src/main/webapp/app/element/element.controller.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.controller.js');


  // STATE
  generator.template(angularJsTemplateDir + 'src/main/webapp/app/element/element.state.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.state.js');


  // SERVICE
  generator.template(angularJsTemplateDir + 'src/main/webapp/app/element/element.service.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.service.js');


  // DIRECTIVE
  if (generator.props.createDirective) {
    generator.template(angularJsTemplateDir + 'src/main/webapp/app/element/element.directive.js', webappDir + 'app/' + elementComponentName + '/' + elementComponentName + '.directive.js');
  }


  // ELEMENT JSON
  if (generator.enableTranslation) {
    generator.getAllInstalledLanguages().forEach(function (language) {
      generator.log('processing for ' + language);
      const fullPath = webappDir + 'i18n/' + language + '/' + elementComponentName + '.json';
      generator.template(angularJsTemplateDir + 'src/main/webapp/i18n/lang/element.json', fullPath);
    }, generator);
  }


  // GLOBAL JSON
  const i18nKey = generator.navElementTranslationPart;
  const i18nValue = generator.navElementKey;
  generator.addTranslationKeyToAllLanguages(i18nKey, i18nValue, 'addElementTranslationKey', generator.enableTranslation);


  // ENTRIES TO NAVBAR.HTML
  const glyphiconName = 'asterisk';

  generator.addElementToMenu(elementComponentName, glyphiconName, generator.enableTranslation, 'angular1');

  // TESTS
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.controller.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.controller.spec.js');
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.state.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.state.spec.js');
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.service.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.service.spec.js');
  if (generator.props.createDirective) {
    generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.directive.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.directive.spec.js');
  }

}
