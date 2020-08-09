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
    generator.enableTranslation = jhipsterAppConfig.enableTranslation;
    generator.nativeLanguage = jhipsterAppConfig.nativeLanguage;
    generator.useSass = jhipsterAppConfig.useSass;

    const s = generator.navElementKey.trim().replace(' ', '-').replace('_', '-');
    generator.translationKeyMenu = _.kebabCase(s).toLowerCase();
    generator.componentStartCase = _.startCase(s);

    const prefix = jhipsterAppConfig.jhiPrefix ? `${_.kebabCase(jhipsterAppConfig.jhiPrefix)}-` : '';
    generator.selector = `${prefix}${_.kebabCase(s).toLowerCase()}`;
    generator.templateName = `${_.kebabCase(s).toLowerCase()}.component.html`;
    generator.cssName = `${_.kebabCase(s).toLowerCase()}.component.css`;
    generator.scssName = `${_.kebabCase(s).toLowerCase()}.component.scss`;
    generator.componentName = `${_.upperFirst(_.camelCase(s))}Component`;

    generator.componentKebabCase = `${_.kebabCase(s).toLowerCase()}`;
    generator.componentCamelCase = `${_.camelCase(s)}`;
    generator.componentPascalCase = `${_.upperFirst(generator.componentCamelCase)}`;

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

    const componentName = _.kebabCase(s).toLowerCase();
    const componentDirName = _.kebabCase(s).toLowerCase();

    const reactTemplateDir = `../templates/react/${generator.templateDir}`;

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
    // TSX
    generator.template(
        `${reactTemplateDir}src/main/webapp/app/modules/element/element.tsx.ejs`,
        `${webappDir}app/modules/${componentDirName}/${componentName}.tsx`
    );


    // STYLE
    if (generator.useSass) {
        generator.template(
            `${reactTemplateDir}src/main/webapp/app/modules/element/element.scss.ejs`,
            `${webappDir}app/modules/${componentDirName}/${componentName}.scss`
        );
    } else {
        generator.template(
            `${reactTemplateDir}src/main/webapp/app/modules/element/element.css.ejs`,
            `${webappDir}app/modules/${componentDirName}/${componentName}.css`
        );
    }


    // ROUTE
    generator.replaceContent(
        `${webappDir}app/routes.tsx`,
        /import React/,
        `import ${generator.componentPascalCase} from 'app/modules/${generator.componentKebabCase}/${generator.componentKebabCase}';\nimport React`,
        true
    );
    generator.replaceContent(
        `${webappDir}app/routes.tsx`,
        /<Switch>/,
        `<Switch>\n      <ErrorBoundaryRoute path="/${generator.componentKebabCase}" exact component={${generator.componentPascalCase}} />`,
        true
    );


    // i18n ELEMENT JSON
    if (generator.enableTranslation) {
        generator.getAllInstalledLanguages()
            .forEach((language) => {
                generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
                generator.log('processing for', language, 'prefix', generator.currentLanguagePrefix);
                generator.template(
                    `${reactTemplateDir}src/main/webapp/i18n/lang/element.json.ejs`,
                    `${webappDir}i18n/${language}/${componentName}.json`
                );
            }, generator);
    }


    // GLOBAL JSON
    generator.addTranslationKeyToAllLanguages(generator.translationKeyMenu,
        generator.navElementKey, 'addElementTranslationKey', generator.enableTranslation);


    // ENTRIES TO NAVBAR.HTML
    generator.addElementToMenu(generator.routerName, 'hand-spock', generator.enableTranslation, 'angularX', generator.translationKeyMenu);


    // TESTS
    generator.template(
        `${reactTemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts.ejs`,
        `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentName}/${componentName}.component.spec.ts`
    );
}
