const constants = require('./constants');
const defaultNg2TemplateWriter = require('./about-us/about-us-ng-template-writer');
const nestedRoutesNg2TemplateWriter = require('./nested-routes/nested-routes-ng-template-writer');
const cookieConsentNg2TemplateWriter = require('./cookie-consent/cookie-consent-ng-template-writer');

module.exports = {
    writeTemplate
};

function writeTemplate(generator) {
    switch (generator.templateType) {
    case constants.TEMPLATE_TYPE.DEFAULT:
        writeDefaultTemplate(generator);
        break;
    case constants.TEMPLATE_TYPE.NESTED_ROUTES:
        writeNestedRoutesTemplate(generator);
        break;
    case constants.TEMPLATE_TYPE.COOKIE_CONSENT:
        writeCookieConsentTemplate(generator);
        break;
    default:
        break;
    }
}

function writeDefaultTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        defaultNg2TemplateWriter.write(generator);
    }
}
function writeNestedRoutesTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        nestedRoutesNg2TemplateWriter.write(generator);
    }
}
function writeCookieConsentTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        cookieConsentNg2TemplateWriter.write(generator);
    }
}
