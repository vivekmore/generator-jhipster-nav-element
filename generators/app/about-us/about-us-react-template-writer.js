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

    generator.titleText = _.startCase(generator.titleText);
    generator.navElementKey = _.lowerCase(_.trim(generator.titleText))
        .replace(' ', '-')
        .replace('_', '-');
    const titleTextKebabCase = generator.navElementKey.trim()
        .replace(' ', '-')
        .replace('_', '-');
    generator.cssName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.css`;
    generator.scssName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.scss`;
    generator.reactComponentName = `${_.upperFirst(_.camelCase(generator.navElementKey))}`;
    generator.statePropName = `I${_.upperFirst(_.camelCase(generator.navElementKey))}Prop`;
    generator.translationKeyMenu = _.camelCase(titleTextKebabCase);

    generator.componentStartCase = _.startCase(titleTextKebabCase);

    const prefix = jhipsterAppConfig.jhiPrefix ? `${_.kebabCase(jhipsterAppConfig.jhiPrefix)}-` : '';
    generator.selector = `${prefix}${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}`;
    generator.templateName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.component.html`;
    generator.componentName = `${_.upperFirst(_.camelCase(titleTextKebabCase))}`;

    generator.componentKebabCase = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}`;
    generator.componentCamelCase = `${_.camelCase(titleTextKebabCase)}`;
    generator.componentPascalCase = `${_.upperFirst(generator.componentCamelCase)}`;

    if (generator.useSass) {
        generator.styleSheetName = generator.scssName;
    } else {
        generator.styleSheetName = generator.cssName;
    }

    generator.componentTsName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.component`;
    generator.routerName = _.kebabCase(titleTextKebabCase)
        .toLowerCase();
    generator.routeName = `${_.kebabCase(titleTextKebabCase)
        .toUpperCase()
        .replace('-', '_')}_ROUTE`;
    generator.routeTsName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.route`;
    generator.angularName = _.upperFirst(_.camelCase(titleTextKebabCase));
    generator.moduleName = `${_.upperFirst(generator.getAngularAppName()) + _.upperFirst(_.camelCase(titleTextKebabCase))}Module`;
    generator.moduleTsNameMinusSuffix = _.kebabCase(titleTextKebabCase)
        .toLowerCase();
    generator.moduleTsName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.module`;
    generator.pageTitle = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.title`;
    generator.tabName = _.upperFirst(_.kebabCase(titleTextKebabCase)
        .replace('-', ' '));

    generator.log('------------------------------------------------------------');
    generator.log(`baseName=${generator.baseName}`);
    generator.log(`packageName=${generator.packageName}`);
    generator.log(`angularXAppName=${generator.angularXAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log(`navElementKey=${generator.navElementKey}`);
    generator.log('------------------------------------------------------------');

    const reactComponentFilename = _.kebabCase(titleTextKebabCase)
        .toLowerCase();
    const moduleDirName = _.kebabCase(titleTextKebabCase)
        .toLowerCase();

    const reactTemplateDir = `../templates/react/${generator.templateDir}`;

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
    // TSX
    generator.template(
        `${reactTemplateDir}src/main/webapp/app/modules/element/element.tsx.ejs`,
        `${webappDir}app/modules/${moduleDirName}/${reactComponentFilename}.tsx`
    );


    // STYLE
    if (generator.useSass) {
        generator.template(
            `${reactTemplateDir}src/main/webapp/app/modules/element/element.scss.ejs`,
            `${webappDir}app/modules/${moduleDirName}/${reactComponentFilename}.scss`
        );
    } else {
        generator.template(
            `${reactTemplateDir}src/main/webapp/app/modules/element/element.css.ejs`,
            `${webappDir}app/modules/${moduleDirName}/${reactComponentFilename}.css`
        );
    }

    // ROUTE
    generator.replaceContent(
        `${webappDir}app/routes.tsx`,
        /import React/,
        `import ${generator.componentName} from 'app/modules/${generator.componentKebabCase}/${generator.componentKebabCase}';\nimport React`,
        true
    );
    generator.replaceContent(
        `${webappDir}app/routes.tsx`,
        /<Switch>/,
        `<Switch>\n      <ErrorBoundaryRoute path="/${generator.componentKebabCase}" exact component={${generator.componentName}} />`,
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
                    `${webappDir}i18n/${language}/${reactComponentFilename}.json`
                );
            }, generator);
    }


    // GLOBAL JSON
    generator.addTranslationKeyToAllLanguages(generator.translationKeyMenu,
        generator.navElementKey, 'addElementTranslationKey', generator.enableTranslation);


    // // ENTRIES TO NAVBAR.HTML
    // generator.addElementToMenu(generator.routerName, 'hand-spock', generator.enableTranslation, 'angularX', generator.translationKeyMenu);
    //
    //
    // // TESTS
    // generator.template(
    //     `${reactTemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts.ejs`,
    //     `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentName}/${componentName}.component.spec.ts`
    // );
}
