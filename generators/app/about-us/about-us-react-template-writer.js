/* eslint no-multiple-empty-lines: "off" */
const chalk = require('chalk');
const _ = require('lodash');

const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

module.exports = {
    write
};

function write(generator) {
    const jhipsterConfig = generator.jhipsterConfig;

    generator.baseName = jhipsterConfig.baseName;
    generator.packageName = jhipsterConfig.packageName;
    generator.enableTranslation = jhipsterConfig.enableTranslation;
    generator.nativeLanguage = jhipsterConfig.nativeLanguage;

    generator.titleText = _.startCase(generator.titleText);
    const titleTextKebabCase = _.lowerCase(_.trim(generator.titleText))
        .replace(' ', '-')
        .replace('_', '-');
    generator.cssName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.css`;
    generator.scssName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.scss`;
    generator.reactComponentName = `${_.upperFirst(_.camelCase(titleTextKebabCase))}`;
    generator.statePropName = `I${_.upperFirst(_.camelCase(titleTextKebabCase))}Prop`;
    generator.translationKeyMenu = _.camelCase(titleTextKebabCase);

    generator.templateName = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}.component.html`;
    generator.componentName = `${_.upperFirst(_.camelCase(titleTextKebabCase))}`;

    generator.componentKebabCase = `${_.kebabCase(titleTextKebabCase)
        .toLowerCase()}`;
    generator.componentCamelCase = `${_.camelCase(titleTextKebabCase)}`;
    generator.componentPascalCase = `${_.upperFirst(generator.componentCamelCase)}`;
    generator.componentStartCase = _.startCase(titleTextKebabCase);

    if (jhipsterConfig.useSass) {
        generator.styleSheetName = generator.scssName;
    } else {
        generator.styleSheetName = generator.cssName;
    }

    generator.routerName = _.kebabCase(titleTextKebabCase)
        .toLowerCase();

    generator.log('------------------------------------------------------------');
    generator.log(`titleText=${generator.titleText}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
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
    if (jhipsterConfig.useSass) {
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
        generator.componentStartCase, 'addElementTranslationKey', generator.enableTranslation);


    // ENTRIES TO HEADER.TSX
    updateHeaderTsx(generator, generator.routerName, generator.enableTranslation, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // ENTRIES TO ICON-LOADER.TSX
    const iconName = 'hand-spock';
    updateIconLoaderTsx(generator, generator.routerName, iconName, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // ENTRIES TO HEADER-COMPONENTS.TSX
    updateHeaderComponentsTsx(generator, generator.componentPascalCase, generator.translationKeyMenu, generator.titleText, generator.routerName, jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT);


    // TESTS
    updateHeaderSpecTsx(generator, generator.componentPascalCase, iconName,
        iconName);
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
    const exportContent = generator.stripMargin(
        `|export const ${componentPascalCase} = props => (
         |  <NavItem>
         |    <NavLink tag={Link} to="/${elementPath}" className="d-flex align-items-center">
         |      <FontAwesomeIcon icon="hand-spock" />
         |      <span>
         |        ${label}
         |      </span>
         |    </NavLink>
         |  </NavItem>
         |);`
    );
    addBlock(generator, headerComponentsTsx, 'export ', exportContent, errorMessage);
}

function updateIconLoaderTsx(generator, elementName, iconName) {
    const errorMessage = `${chalk.yellow('Reference to ') + elementName} ${chalk.yellow('not added to icon-loader.tsx.\n')}`;
    const iconLoader = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/config/icon-loader.ts`;
    const icon = _.upperFirst(_.camelCase(iconName));
    addBlock(generator, iconLoader, 'import ', `import { fa${icon} } from '@fortawesome/free-solid-svg-icons/fa${icon}';`, errorMessage);
    addBlock(generator, iconLoader, 'fa', `fa${icon},`, errorMessage);
}

function updateHeaderSpecTsx(generator, componentPascalCase, iconName) {
    const errorMessage = `${chalk.yellow('Test for ') + componentPascalCase} ${chalk.yellow('not added to header.spec.tsx.\n')}`;
    const headerSpecTsx = `${jhipsterConstants.CLIENT_MAIN_SRC_DIR}app/shared/layout/header/header.spec.tsx`;
    const testContent = generator.stripMargin(
        `|it('Renders ${componentPascalCase} component.', () => {
         |  const html = wrapper(prodProps);
         |  expect(html).toMatchSnapshot();
         |  expect(html).toContain('${_.kebabCase(componentPascalCase)}');
         |  expect(html).toContain('${iconName}');
         |});`
    ).split(/\r?\n/);
    addBlock(generator, headerSpecTsx, 'import ', `import { ${componentPascalCase} } from 'app/shared/layout/header/header-components';`, errorMessage);
    addBlock(generator, headerSpecTsx, 'it(', testContent, errorMessage);
}

function addBlock(generator, file, needle, splice, errorMessage) {
    const { clientReact } = generator.needleApi;
    const iconLoaderWithNewIcon = _.isArray(splice)
        ? clientReact.generateFileModel(file, needle, ...splice)
        : clientReact.generateFileModel(file, needle, splice);
    clientReact.addBlockContentToFile(iconLoaderWithNewIcon, errorMessage);
}
