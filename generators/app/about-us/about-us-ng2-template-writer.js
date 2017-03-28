'use strict';

var _ = require('lodash');
const jhipsterUtils = require('generator-jhipster/generators/util');

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
  generator.componentI18nKey = _.kebabCase(s).toLowerCase();
  generator.selector = 'jhi-' + _.kebabCase(s).toLowerCase();
  generator.templateName = _.kebabCase(s).toLowerCase() + '.component.html';
  generator.scssName = _.kebabCase(s).toLowerCase() + '.scss';
  generator.componentName = _.upperFirst(_.camelCase(s)) + 'Component';
  generator.componentTsName = _.kebabCase(s).toLowerCase() + '.component';
  generator.locationName = _.kebabCase(s).toLowerCase();
  generator.routeName = _.kebabCase(s).toUpperCase().replace('-', '_') + '_ROUTE';
  generator.routeTsName = _.kebabCase(s).toLowerCase() + '.route';
  generator.moduleName = 'Jhipster' + _.upperFirst(_.camelCase(s)) + 'Module';
  generator.moduleTsName = _.kebabCase(s).toLowerCase() + '.module';
  generator.pageTitle = _.kebabCase(s).toLowerCase() + '.title';
  generator.tabName = _.upperFirst(_.kebabCase(s).replace('-', ' '));

  generator.log('------------------------------------------------------------');
  generator.log('baseName=' + generator.baseName);
  generator.log('packageName=' + generator.packageName);
  generator.log('angularAppName=' + generator.angularAppName);
  generator.log('enableTranslation=' + generator.enableTranslation);
  generator.log('navElementKey=' + generator.navElementKey);
  generator.log('------------------------------------------------------------');

  var componentName = _.kebabCase(s).toLowerCase();
  var componentDirName = _.kebabCase(s).toLowerCase();

  var ng2TemplateDir = 'angular/' + generator.templateDir;

  var webappDir = jhipsterVar.webappDir;
  // HTML TEMPLATE
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/element.component.html',
    webappDir + 'app/' + componentDirName + '/' + componentName + '.component.html');


  // COMPONENT
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/element.component.ts',
    webappDir + 'app/' + componentDirName + '/' + componentName + '.component.ts');


  // MODULE
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/element.module.ts',
    webappDir + 'app/' + componentDirName + '/' + componentName + '.module.ts');


  // ROUTE
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/element.route.ts',
    webappDir + 'app/' + componentDirName + '/' + componentName + '.route.ts');


  // INDEX
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/index.ts',
    webappDir + 'app/' + componentDirName + '/' + 'index.ts');


  // SCSS
  generator.template(
    ng2TemplateDir + 'src/main/webapp/app/element/element.scss',
    webappDir + 'app/' + componentDirName + '/' + componentName + '.scss');


  // APP MODULE
  jhipsterFunc.replaceContent(webappDir + 'app/app.module.ts',
    '@NgModule',
    `import {${generator.moduleName}} from './${componentDirName}/${generator.moduleTsName}';\n@NgModule`);

  jhipsterFunc.replaceContent(webappDir + 'app/app.module.ts',
    'imports: [',
    `imports: [\n${generator.moduleName},\n`);


  // ELEMENT JSON
  if (generator.enableTranslation) {
    jhipsterFunc.getAllInstalledLanguages().forEach(function (language) {
      generator.log('processing for ' + language);
      generator.template(
        ng2TemplateDir + 'src/main/webapp/i18n/lang/element.json',
        webappDir + 'i18n/' + language + '/' + componentName + '.json');
    }, generator);
  }


  // GLOBAL JSON
  jhipsterFunc.addTranslationKeyToAllLanguages(generator.componentI18nKey, generator.navElementKey, 'addElementTranslationKey', generator.enableTranslation);


  // ENTRIES TO NAVBAR.HTML
  // jhipsterFunc.addElementToMenu(componentName, glyphiconName, generator.enableTranslation, 'angular2');
  var navbarPath = `${jhipsterVar.CONSTANTS.CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`;
  jhipsterUtils.rewriteFile({
    file: navbarPath,
    needle: 'jhipster-needle-add-element-to-menu',
    splicable: [`
            <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link" routerLink="${generator.locationName}" (click)="collapseNavbar()">
                    <i class="fa fa-hand-spock-o" aria-hidden="true"></i>
                    <span jhiTranslate="global.menu.${generator.componentI18nKey}">${generator.tabName}</span>
                </a>
            </li>`
    ]
  }, generator);

  // TESTS
  generator.template(
    ng2TemplateDir + 'src/test/javascript/spec/app/element/element.component.spec.ts',
    jhipsterVar.CONSTANTS.CLIENT_TEST_SRC_DIR + 'spec/app/' + componentName + '/' + componentName + '.component.spec.ts');

}
