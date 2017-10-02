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
  generator.nativeLanguage = jhipsterAppConfig.nativeLanguage;
  generator.clientFramework = jhipsterAppConfig.clientFramework;

  generator.message = generator.props.message;
  generator.navElementKey = generator.props.navElementKey;
  generator.createDirective = generator.props.createDirective;

  const s = generator.navElementKey.trim().replace(' ', '-').replace('_', '-');
  generator.navElementKeyKebabCased = _.kebabCase(s);
  generator.navElementKeyCapitalized = _.upperFirst(_.camelCase(s));
  generator.controllerName = _.upperFirst(_.camelCase(s)) + 'Controller';
  generator.serviceName = _.upperFirst(_.camelCase(s)) + 'Service';
  generator.directiveName = 'aboutToday';
  generator.directiveKebabCased = _.kebabCase(generator.directiveName.trim());
  generator.navElementTranslationPart = _.kebabCase(s);
  generator.navElementStartCase = _.startCase(s);

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
  generator.log('navElementKeyKebabCased=' + generator.navElementKeyKebabCased);
  generator.log('navElementKeyCapitalized=' + generator.navElementKeyCapitalized);
  generator.log('navElementTranslationPart=' + generator.navElementTranslationPart);
  generator.log('navElementStartCase=' + generator.navElementStartCase);
  generator.log('------------------------------------------------------------');

  const elementComponentNameKebabCased = generator.navElementKeyKebabCased;

  const angularjsTemplateDir = 'angularjs/' + generator.templateDir;

  const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
  // HTML TEMPLATE
  generator.template(angularjsTemplateDir + 'src/main/webapp/app/element/element.html', webappDir + 'app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.html');


  // CONTROLLER
  generator.template(angularjsTemplateDir + 'src/main/webapp/app/element/element.controller.js', webappDir + 'app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.controller.js');


  // STATE
  generator.template(angularjsTemplateDir + 'src/main/webapp/app/element/element.state.js', webappDir + 'app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.state.js');


  // SERVICE
  generator.template(angularjsTemplateDir + 'src/main/webapp/app/element/element.service.js', webappDir + 'app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.service.js');


  // DIRECTIVE
  if (generator.props.createDirective) {
    generator.template(angularjsTemplateDir + 'src/main/webapp/app/element/element.directive.js', webappDir + 'app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.directive.js');
  }


  // i18n ELEMENT JSON
  if (generator.enableTranslation) {
    generator.getAllInstalledLanguages().forEach(function (language) {
      generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
      generator.log('processing for ', language, 'prefix', generator.currentLanguagePrefix);
      const fullPath = webappDir + 'i18n/' + language + '/' + elementComponentNameKebabCased + '.json';
      generator.template(angularjsTemplateDir + 'src/main/webapp/i18n/lang/element.json', fullPath);
    }, generator);
  }


  // GLOBAL JSON
  const i18nKey = generator.navElementTranslationPart;
  const i18nValue = generator.navElementKey;
  generator.addTranslationKeyToAllLanguages(i18nKey, i18nValue, 'addElementTranslationKey', generator.enableTranslation);


  // ENTRIES TO NAVBAR.HTML
  const glyphiconName = 'asterisk';

  generator.addElementToMenu(elementComponentNameKebabCased, glyphiconName, generator.enableTranslation, 'angular1');

  // TESTS
  generator.template(angularjsTemplateDir + 'src/test/javascript/spec/app/element/element.controller.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.controller.spec.js');
  generator.template(angularjsTemplateDir + 'src/test/javascript/spec/app/element/element.state.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.state.spec.js');
  generator.template(angularjsTemplateDir + 'src/test/javascript/spec/app/element/element.service.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.service.spec.js');
  if (generator.props.createDirective) {
    generator.template(angularjsTemplateDir + 'src/test/javascript/spec/app/element/element.directive.spec.js', jhipsterConstants.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentNameKebabCased + '/' + elementComponentNameKebabCased + '.directive.spec.js');
  }

}
