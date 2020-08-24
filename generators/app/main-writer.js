const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('./constants');
const defaultNg2TemplateWriter = require('./about-us/about-us-ng-template-writer');
const defaultReactTemplateWriter = require('./about-us/about-us-react-template-writer');
const nestedRoutesNg2TemplateWriter = require('./nested-routes/nested-routes-ng-template-writer');

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
    default:
        break;
    }
}

function writeDefaultTemplate(generator) {
    const clientFramework = generator.jhipsterAppConfig.clientFramework;
    if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        defaultNg2TemplateWriter.write(generator);
    } else if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT) {
        defaultReactTemplateWriter.write(generator);
    }
}
function writeNestedRoutesTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        nestedRoutesNg2TemplateWriter.write(generator);
    }
}
