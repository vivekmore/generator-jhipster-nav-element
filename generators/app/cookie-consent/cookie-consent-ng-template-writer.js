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
    generator.jhiPrefixCapitalized = generator.upperFirstCamelCase(jhipsterAppConfig.jhiPrefix);
    generator.jhiPrefixDashed = _.kebabCase(jhipsterAppConfig.jhiPrefix);

    generator.log('------------------------------------------------------------');
    generator.log(`baseName=${generator.baseName}`);
    generator.log(`packageName=${generator.packageName}`);
    generator.log(`angularXAppName=${generator.angularXAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log(`jhiPrefixDashed=${generator.jhiPrefixDashed}`);
    generator.log(`jhiPrefixCapitalized=${generator.jhiPrefixCapitalized}`);
    generator.log('------------------------------------------------------------');

    const templateDir = `../templates/angular/${generator.templateDir}`;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // add required dependencies to package.json
    generator.addNpmDependency('cookieconsent', '3.1.1');
    generator.addNpmDependency('ngx-cookieconsent', '2.2.3');

    // update app.module.ts
    const appModule = `${webappDir}app/app.module.ts`;
    const importCookieConsentMin = 'import \'cookieconsent/build/cookieconsent.min\';';
    generator.rewriteFile(appModule, 'jhipster-needle-angular-add-module-import', importCookieConsentMin);

    // update shared-libs.module.ts
    const sharedLibsModule = `${webappDir}app/shared/shared-libs.module.ts`;
    const cookieConsentModule = `${generator.jhiPrefixCapitalized}CookieConsentModule`;
    const importCookieConsentModule = `import { ${cookieConsentModule} } from 'app/shared/cookie-consent/cookie-consent.module';`
        + '\n\n@NgModule';
    generator.replaceContent(sharedLibsModule, '@NgModule', importCookieConsentModule);
    const exportCookieConsentModule = `exports: [\n    ${cookieConsentModule},`;
    generator.replaceContent(sharedLibsModule, 'exports: [', exportCookieConsentModule);

    // update vendor.scss
    generator.addVendorSCSSStyle('@import \'~cookieconsent/build/cookieconsent.min.css\';', 'For more customization see: https://www.npmjs.com/package/ngx-cookieconsent');

    // update main.component.html
    const mainComponentHtml = `${webappDir}app/layouts/main/main.component.html`;
    const prefix = generator.jhiPrefixDashed;
    const originalContent = generator.fs.read(mainComponentHtml);
    generator.fs.write(mainComponentHtml, `${originalContent}\n<${prefix}-cookie-consent></${prefix}-cookie-consent>\n`);

    // add cookie-consent module
    [
        'cookie-consent.component.ts',
        'cookie-consent.constants.ts',
        'cookie-consent.module.ts',
        'cookie-consent.service.ts'
    ].forEach((file) => {
        generator.log(`${webappDir}app/shared/cookie-consent/${file}`);
        generator.template(
            `${templateDir}src/main/webapp/app/shared/cookie-consent/${file}.ejs`,
            `${webappDir}app/shared/cookie-consent/${file}`
        );
    });

    // add i18n COOKIE-CONSENT JSON
    if (generator.enableTranslation) {
        generator.getAllInstalledLanguages()
            .forEach((language) => {
                generator.currentLanguagePrefix = language === generator.nativeLanguage ? '' : `[${language}] `;
                generator.log(`adding cookie consent content for ${language} language ${generator.currentLanguagePrefix}`);
                generator.template(
                    `${templateDir}src/main/webapp/i18n/lang/cookie-consent.json.ejs`,
                    `${webappDir}i18n/${language}/cookie-consent.json`
                );
            }, generator);
    }
}
