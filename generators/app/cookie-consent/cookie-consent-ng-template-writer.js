// const _ = require('lodash');
// const jhipsterUtils = require('generator-jhipster/generators/utils');
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

    // const s = generator.navElementKey.trim()
    //     .replace(' ', '-')
    //     .replace('_', '-');
    // generator.componentI18nKey = _.kebabCase(s)
    //     .toLowerCase();
    // generator.componentStartCase = _.startCase(s);
    //
    // const prefix = jhipsterAppConfig.jhiPrefix ? `${_.kebabCase(jhipsterAppConfig.jhiPrefix)}-` : '';
    // generator.selector = `${prefix}${_.kebabCase(s)
    //     .toLowerCase()}`;
    // generator.templateName = `${_.kebabCase(s)
    //     .toLowerCase()}.component.html`;
    // generator.cssName = `${_.kebabCase(s)
    //     .toLowerCase()}.component.css`;
    // generator.scssName = `${_.kebabCase(s)
    //     .toLowerCase()}.component.scss`;
    // generator.componentName = `${_.upperFirst(_.camelCase(s))}Component`;
    // generator.componentTsName = `${_.kebabCase(s)
    //     .toLowerCase()}.component`;
    // generator.locationName = _.kebabCase(s)
    //     .toLowerCase();
    // generator.routeName = `${_.kebabCase(s)
    //     .toUpperCase()
    //     .replace('-', '_')}_ROUTE`;
    // generator.routeTsName = `${_.kebabCase(s)
    //     .toLowerCase()}.route`;
    // generator.angularName = _.upperFirst(_.camelCase(s));
    // generator.moduleName = `${_.upperFirst(generator.getAngularAppName()) + _.upperFirst(_.camelCase(s))}Module`;
    // generator.moduleTsNameMinusSuffix = _.kebabCase(s)
    //     .toLowerCase();
    // generator.moduleTsName = `${_.kebabCase(s)
    //     .toLowerCase()}.module`;
    // generator.pageTitle = `${_.kebabCase(s)
    //     .toLowerCase()}.title`;
    // generator.tabName = _.upperFirst(_.kebabCase(s)
    //     .replace('-', ' '));

    generator.log('------------------------------------------------------------');
    generator.log(`baseName=${generator.baseName}`);
    generator.log(`packageName=${generator.packageName}`);
    generator.log(`angularAppName=${generator.angularAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log(`navElementKey=${generator.navElementKey}`);
    generator.log('------------------------------------------------------------');

    // const componentName = _.kebabCase(s)
    //     .toLowerCase();
    // const componentDirName = _.kebabCase(s)
    //     .toLowerCase();
    //
    // const ng2TemplateDir = `angular/${generator.templateDir}`;

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // Add required dependencies to package.json
    generator.addNpmDependency('cookieconsent', '3.1.1');
    generator.addNpmDependency('ngx-cookieconsent', '2.2.3');

    // -- FILE TO CHANGE

    // Add changes to app.module.ts

    const modulePath = `${webappDir}app/app.module.ts`;
    const importContent1 = 'import { DEBUG_INFO_ENABLED } from \'app/app.constants\';';
    const importContent2 = 'import { NgcCookieConsentModule } from \'ngx-cookieconsent\';';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module-import', importContent1, importContent2);
    // this.addBlockContentToFile(importRewriteFileModel);

    // TODO: add const DEFAULT_COOKIE_CONFIG to app.module.ts

    const moduleContent = 'NgcCookieConsentModule.forRoot(DEFAULT_COOKIE_CONFIG),';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module', moduleContent);
    // this.addBlockContentToFile(moduleRewriteFileModel);
}
