const _ = require('lodash');
const jhipsterUtils = require('generator-jhipster/generators/utils');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    write
};

function write(generator) {
    const jhipsterAppConfig = generator.jhipsterAppConfig;

    generator.baseName = jhipsterAppConfig.baseName;
    generator.packageName = jhipsterAppConfig.packageName;
    generator.angularXAppName = generator.getAngularXAppName();
    generator.enableTranslation = jhipsterAppConfig.enableTranslation;
    generator.nativeLanguage = jhipsterAppConfig.nativeLanguage;
    generator.useSass = jhipsterAppConfig.useSass;

    const s = generator.navElementKey.trim().replace(' ', '-').replace('_', '-');
    generator.componentI18nKey = _.kebabCase(s).toLowerCase();
    generator.componentStartCase = _.startCase(s);

    const prefix = jhipsterAppConfig.jhiPrefix ? `${_.kebabCase(jhipsterAppConfig.jhiPrefix)}-` : '';
    generator.selector = `${prefix}${_.kebabCase(s).toLowerCase()}`;
    generator.templateName = `${_.kebabCase(s).toLowerCase()}.component.html`;
    generator.cssName = `${_.kebabCase(s).toLowerCase()}.component.css`;
    generator.scssName = `${_.kebabCase(s).toLowerCase()}.component.scss`;
    generator.componentName = `${_.upperFirst(_.camelCase(s))}Component`;
    generator.componentTsName = `${_.kebabCase(s).toLowerCase()}.component`;
    generator.locationName = _.kebabCase(s).toLowerCase();
    generator.routeName = `${_.kebabCase(s).toUpperCase().replace('-', '_')}_ROUTE`;
    generator.routeTsName = `${_.kebabCase(s).toLowerCase()}.route`;
    generator.angularName = _.upperFirst(_.camelCase(s));
    generator.moduleName = `${_.upperFirst(generator.getAngularAppName()) + _.upperFirst(_.camelCase(s))}Module`;
    generator.moduleTsNameMinusSuffix = _.kebabCase(s).toLowerCase();
    generator.moduleTsName = `${_.kebabCase(s).toLowerCase()}.module`;
    generator.pageTitle = `${_.kebabCase(s).toLowerCase()}.title`;
    generator.tabName = _.upperFirst(_.kebabCase(s).replace('-', ' '));

    generator.log('------------------------------------------------------------');
    generator.log(`baseName=${generator.baseName}`);
    generator.log(`packageName=${generator.packageName}`);
    generator.log(`angularAppName=${generator.angularAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log(`navElementKey=${generator.navElementKey}`);
    generator.log('------------------------------------------------------------');

    const componentName = _.kebabCase(s).toLowerCase();
    const componentDirName = _.kebabCase(s).toLowerCase();

    const ng2TemplateDir = `angular/${generator.templateDir}`;

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
    // HTML TEMPLATE
    generator.template(
        `${ng2TemplateDir}src/main/webapp/app/element/element.component.html`,
        `${webappDir}app/${componentDirName}/${componentName}.component.html`
    );


    // COMPONENT
    generator.template(
        `${ng2TemplateDir}src/main/webapp/app/element/element.component.ts`,
        `${webappDir}app/${componentDirName}/${componentName}.component.ts`
    );


    // MODULE
    generator.template(
        `${ng2TemplateDir}src/main/webapp/app/element/element.module.ts`,
        `${webappDir}app/${componentDirName}/${componentName}.module.ts`
    );


    // ROUTE
    generator.template(
        `${ng2TemplateDir}src/main/webapp/app/element/element.route.ts`,
        `${webappDir}app/${componentDirName}/${componentName}.route.ts`
    );


    // INDEX
    generator.template(
        `${ng2TemplateDir}src/main/webapp/app/element/index.ts`,
        `${webappDir}app/${componentDirName}/index.ts`
    );


    // STYLE
    if (generator.useSass) {
        generator.template(
            `${ng2TemplateDir}src/main/webapp/app/element/element.component.scss`,
            `${webappDir}app/${componentDirName}/${componentName}.component.scss`
        );
    } else {
        generator.template(
            `${ng2TemplateDir}src/main/webapp/app/element/element.component.css`,
            `${webappDir}app/${componentDirName}/${componentName}.component.css`
        );
    }


    // APP MODULE
    generator.addAngularModule(
        _.upperFirst(generator.getAngularAppName()),
        generator.angularName,
        componentDirName,
        generator.moduleTsNameMinusSuffix,
        generator.enableTranslation,
        'angularX'
    );


    // i18n ELEMENT JSON
    if (generator.enableTranslation) {
        generator.getAllInstalledLanguages().forEach((language) => {
            generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
            generator.log('processing for ', language, 'prefix', generator.currentLanguagePrefix);
            generator.template(
                `${ng2TemplateDir}src/main/webapp/i18n/lang/element.json`,
                `${webappDir}i18n/${language}/${componentName}.json`
            );
        }, generator);
    }


    // GLOBAL JSON
    generator.addTranslationKeyToAllLanguages(generator.componentI18nKey, generator.navElementKey, 'addElementTranslationKey', generator.enableTranslation);


    // ENTRIES TO NAVBAR.HTML
    // jhipsterFunc.addElementToMenu(componentName, glyphiconName, generator.enableTranslation, 'angular2');
    const navbarPath = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`;
    let navbarCode;
    if (generator.enableTranslation) {
        navbarCode = `
            <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link" routerLink="${generator.locationName}" (click)="collapseNavbar()">
                    <i class="fa fa-hand-spock-o" aria-hidden="true"></i>
                    <span jhiTranslate="global.menu.${generator.componentI18nKey}">${generator.tabName}</span>
                </a>
            </li>`;
    } else {
        navbarCode = `
            <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link" routerLink="${generator.locationName}" (click)="collapseNavbar()">
                    <i class="fa fa-hand-spock-o" aria-hidden="true"></i>
                    <span>${generator.tabName}</span>
                </a>
            </li>`;
    }

    jhipsterUtils.rewriteFile({
        file: navbarPath,
        needle: 'jhipster-needle-add-element-to-menu',
        splicable: [navbarCode]
    }, generator);

    // TESTS
    generator.template(
        `${ng2TemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts`,
        `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentName}/${componentName}.component.spec.ts`
    );
}
