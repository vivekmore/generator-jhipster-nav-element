/* eslint no-multiple-empty-lines: "off" */
const _ = require('lodash');
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

    const s = generator.navElementKey.trim()
        .replace(' ', '-')
        .replace('_', '-');
    generator.translationKeyMenu = _.kebabCase(s).toLowerCase();
    generator.componentStartCase = _.startCase(s);

    const prefix = jhipsterAppConfig.jhiPrefix ? `${_.kebabCase(jhipsterAppConfig.jhiPrefix)}-` : '';
    generator.selector = `${prefix}${_.kebabCase(s).toLowerCase()}`;
    generator.templateName = `${_.kebabCase(s).toLowerCase()}.component.html`;
    generator.cssName = `${_.kebabCase(s).toLowerCase()}.component.css`;
    generator.scssName = `${_.kebabCase(s).toLowerCase()}.component.scss`;
    generator.componentName = `${_.upperFirst(_.camelCase(s))}Component`;
    generator.componentTsName = `${_.kebabCase(s).toLowerCase()}.component`;
    generator.routerName = _.kebabCase(s).toLowerCase();
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
    generator.log(`angularXAppName=${generator.angularXAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log(`navElementKey=${generator.navElementKey}`);
    generator.log('------------------------------------------------------------');

    const componentFileNamePrefix = _.kebabCase(s).toLowerCase();
    const componentDirName = _.kebabCase(s).toLowerCase();
    const subComponents = [
        {
            componentName: 'PageOneComponent',
            selector: `${prefix}page-one`,
            templateName: 'page-one.component.html',
            translationKeyMenu: 'page-one',
            navElementKey: 'page-one',
            componentFileNamePrefix: 'page-one',
            componentTsName: 'page-one.component',
            componentDirName: 'page-one',
            routeName: 'PAGE_ONE_ROUTE',
            routerName: 'page-one',
            pageTitle: 'page-one.title',
            componentStartCase: 'Page One',
            cssName: 'page-one.component.css',
            scssName: 'page-one.component.scss'
        },
        {
            componentName: 'PageTwoComponent',
            selector: `${prefix}page-two`,
            templateName: 'page-two.component.html',
            translationKeyMenu: 'page-two',
            navElementKey: 'page-two',
            componentFileNamePrefix: 'page-two',
            componentTsName: 'page-two.component',
            componentDirName: 'page-two',
            routeName: 'PAGE_TWO_ROUTE',
            routerName: 'page-two',
            pageTitle: 'page-two.title',
            componentStartCase: 'Page Two',
            cssName: 'page-two.component.css',
            scssName: 'page-two.component.scss'
        }
    ];
    generator.subComponents = subComponents;

    const defaultNg2TemplateDir = '../templates/angular/about-us/';
    const nestedRoutesNg2TemplateDir = `../templates/angular/${generator.templateDir}`;

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // HTML TEMPLATES
    generator.template(
        `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element-with-nested.component.html.ejs`,
        `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.component.html`
    );
    _.forEach(subComponents, (subComponent) => {
        generator.currentSubComponent = subComponent;
        generator.template(
            `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.component.html.ejs`,
            `${webappDir}app/${componentDirName}/${subComponent.componentDirName}/${subComponent.componentFileNamePrefix}.component.html`
        );
    });


    // COMPONENT
    generator.template(
        `${defaultNg2TemplateDir}src/main/webapp/app/element/element.component.ts.ejs`,
        `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.component.ts`
    );
    _.forEach(subComponents, (subComponent) => {
        generator.currentSubComponent = subComponent;
        generator.template(
            `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.component.ts.ejs`,
            `${webappDir}app/${componentDirName}/${subComponent.componentDirName}/${subComponent.componentFileNamePrefix}.component.ts`
        );
    });


    // MODULE
    generator.template(
        `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.module.ts.ejs`,
        `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.module.ts`
    );


    // ROUTE
    generator.template(
        `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element-with-nested.route.ts.ejs`,
        `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.route.ts`
    );
    _.forEach(subComponents, (subComponent) => {
        generator.currentSubComponent = subComponent;
        generator.template(
            `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.route.ts.ejs`,
            `${webappDir}app/${componentDirName}/${subComponent.componentDirName}/${subComponent.componentFileNamePrefix}.route.ts`
        );
    });


    // INDEX
    generator.template(
        `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/index.ts.ejs`,
        `${webappDir}app/${componentDirName}/index.ts`
    );


    // STYLE
    if (generator.useSass) {
        generator.template(
            `${defaultNg2TemplateDir}src/main/webapp/app/element/element.component.scss.ejs`,
            `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.component.scss`
        );
        _.forEach(subComponents, (subComponent) => {
            generator.currentSubComponent = subComponent;
            generator.template(
                `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.component.scss.ejs`,
                `${webappDir}app/${componentDirName}/${subComponent.componentDirName}/${subComponent.componentFileNamePrefix}.component.scss`
            );
        });
    } else {
        generator.template(
            `${defaultNg2TemplateDir}src/main/webapp/app/element/element.component.css.ejs`,
            `${webappDir}app/${componentDirName}/${componentFileNamePrefix}.component.css`
        );
        _.forEach(subComponents, (subComponent) => {
            generator.currentSubComponent = subComponent;
            generator.template(
                `${nestedRoutesNg2TemplateDir}src/main/webapp/app/element/element.component.css.ejs`,
                `${webappDir}app/${componentDirName}/${subComponent.componentDirName}/${subComponent.componentFileNamePrefix}.component.css`
            );
        });
    }


    // APP MODULE
    generator.addAngularModule(
        _.upperFirst(generator.getAngularAppName()),
        generator.angularName,
        componentDirName,
        generator.moduleTsNameMinusSuffix,
        generator.enableTranslation,
        jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR
    );


    // i18n ELEMENT JSON
    if (generator.enableTranslation) {
        generator.getAllInstalledLanguages()
            .forEach((language) => {
                generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
                generator.log('processing for ', language, 'prefix', generator.currentLanguagePrefix);
                generator.template(
                    `${defaultNg2TemplateDir}src/main/webapp/i18n/lang/element.json.ejs`,
                    `${webappDir}i18n/${language}/${componentFileNamePrefix}.json`
                );
                _.forEach(subComponents, (subComponent) => {
                    generator.currentSubComponent = subComponent;
                    generator.template(
                        `${nestedRoutesNg2TemplateDir}src/main/webapp/i18n/lang/element.json.ejs`,
                        `${webappDir}i18n/${language}/${subComponent.componentFileNamePrefix}.json`
                    );
                });
            }, generator);
    }


    // GLOBAL JSON
    generator.addTranslationKeyToAllLanguages(generator.translationKeyMenu, generator.navElementKey, 'addElementTranslationKey', generator.enableTranslation);
    _.forEach(subComponents, (subComponent) => {
        generator.addTranslationKeyToAllLanguages(subComponent.translationKeyMenu, subComponent.navElementKey, 'addElementTranslationKey', generator.enableTranslation);
    });


    // ENTRIES TO NAVBAR.HTML
    const iconName = 'hand-spock';
    generator.addElementToMenu(generator.routerName, iconName, generator.enableTranslation, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR, generator.translationKeyMenu);


    // TESTS
    generator.template(
        `${defaultNg2TemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts.ejs`,
        `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentFileNamePrefix}/${componentFileNamePrefix}.component.spec.ts`
    );
    _.forEach(subComponents, (subComponent) => {
        generator.currentSubComponent = subComponent;
        generator.template(
            `${nestedRoutesNg2TemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts.ejs`,
            `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentFileNamePrefix}/${subComponent.componentFileNamePrefix}/${subComponent.componentFileNamePrefix}.component.spec.ts`
        );
    });
}
