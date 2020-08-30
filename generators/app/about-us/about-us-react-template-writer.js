/* eslint no-multiple-empty-lines: "off" */
const chalk = require('chalk');
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


    // ENTRIES TO HEADER.TSX
    updateHeaderTsx(generator, generator.routerName, generator.enableTranslation, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // ENTRIES TO ICON-LOADER.TSX
    updateIconLoaderTsx(generator, generator.routerName, 'hand-spock', jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // ENTRIES TO HEADER-COMPONENTS.TSX
    updateHeaderComponentsTsx(generator, generator.componentPascalCase, generator.translationKeyMenu, generator.titleText, generator.routerName, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // // TESTS
    // generator.template(
    //     `${reactTemplateDir}src/test/javascript/spec/app/element/element.component.spec.ts.ejs`,
    //     `${jhipsterConstants.CLIENT_TEST_SRC_DIR}spec/app/${componentName}/${componentName}.component.spec.ts`
    // );
}

function updateHeaderTsx(generator, elementName) {
    const errorMessage = `${chalk.yellow('Reference to ') + elementName} ${chalk.yellow('not added to menu.\n')}`;
    const headerTsx = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/shared/layout/header/header.tsx`;
    const reactElementName = _.upperFirst(_.camelCase(elementName));
    addBlock(generator, headerTsx, 'import ', `import { ${reactElementName} } from './header-components';`, errorMessage);
    addBlock(generator, headerTsx, '<Home', `<${reactElementName} />`, errorMessage);
}

function updateHeaderComponentsTsx(generator, componentPascalCase, elementI18nKey, elementLabel, elementPath) {
    const errorMessage = `${chalk.yellow('Reference to ') + componentPascalCase} ${chalk.yellow('not added to header-components.tsx.\n')}`;
    const headerComponentsTsx = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/shared/layout/header/header-components.tsx`;
    const label = generator.enableTranslation ? `<Translate contentKey="global.menu.${elementI18nKey}">${elementLabel}</Translate>` : elementLabel;
    const exportContent = `
  export const ${componentPascalCase} = props => (
  <NavItem>
    <NavLink tag={Link} to="/${elementPath}" className="d-flex align-items-center">
      <FontAwesomeIcon icon="hand-spock" />
      <span>
        ${label}
      </span>
    </NavLink>
  </NavItem>
);`;
    addBlock(generator, headerComponentsTsx, 'export ', exportContent, errorMessage);
}

function updateIconLoaderTsx(generator, elementName, iconName) {
    const errorMessage = `${chalk.yellow('Reference to ') + elementName} ${chalk.yellow('not added to icon-loader.tsx.\n')}`;
    const iconLoader = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/config/icon-loader.ts`;
    const icon = _.upperFirst(_.camelCase(iconName));
    addBlock(generator, iconLoader, 'import ', `import { fa${icon} } from '@fortawesome/free-solid-svg-icons/fa${icon}';`, errorMessage);
    addBlock(generator, iconLoader, 'fa', `fa${icon},`, errorMessage);
}

function addBlock(generator, file, needle, splice, errorMessage) {
    const iconLoaderWithNewIcon = generator.needleApi.clientReact.generateFileModel(file, needle, splice);
    generator.needleApi.clientReact.addBlockContentToFile(iconLoaderWithNewIcon, errorMessage);
}
