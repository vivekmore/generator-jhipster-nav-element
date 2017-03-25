'use strict';

var _ = require('lodash');

module.exports = {
  write
};

function write(generator) {

  var jhipsterVar = generator.inheritedStuff.jhipsterVar;
  var jhipsterFunc = generator.inheritedStuff.jhipsterFunc;

  generator.baseName = jhipsterVar.baseName;
  generator.packageName = jhipsterVar.packageName;
  generator.angularAppName = jhipsterVar.angularAppName;
  generator.enableTranslation = jhipsterVar.enableTranslation;

  generator.message = generator.props.message;
  generator.navElementKey = generator.props.navElementKey;
  generator.createDirective = generator.props.createDirective;

  var s = generator.navElementKey.trim().replace(' ', '-').replace('_', '-');
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

  var elementComponentName = generator.navElementKeyCamelCased;

  var angularJsTemplateDir = 'angularjs/' + generator.templateDir;

  var webappDir = jhipsterVar.webappDir;
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
    jhipsterFunc.getAllInstalledLanguages().forEach(function (language) {
      generator.log('processing for ' + language);
      var fullPath = webappDir + 'i18n/' + language + '/' + elementComponentName + '.json';
      generator.template(angularJsTemplateDir + 'src/main/webapp/i18n/lang/element.json', fullPath);
    }, generator);
  }


  // GLOBAL JSON
  var i18nKey = generator.navElementTranslationPart;
  var i18nValue = generator.navElementKey;
  jhipsterFunc.addTranslationKeyToAllLanguages(i18nKey, i18nValue, 'addElementTranslationKey', generator.enableTranslation);


  // ENTRIES TO NAVBAR.HTML
  var glyphiconName = 'asterisk';

  jhipsterFunc.addElementToMenu(elementComponentName, glyphiconName, generator.enableTranslation, 'angular1');

  // TESTS
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.controller.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.controller.spec.js');
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.state.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.state.spec.js');
  generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.service.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.service.spec.js');
  if (generator.props.createDirective) {
    generator.template(angularJsTemplateDir + 'src/test/javascript/spec/app/element/element.directive.spec.js', jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + elementComponentName + '/' + elementComponentName + '.directive.spec.js');
  }

}
