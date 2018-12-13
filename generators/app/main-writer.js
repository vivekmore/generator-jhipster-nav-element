const constants = require('./constants');
const defaultNg2TemplateWriter = require('./about-us/about-us-ng2-template-writer');
const nestedRoutesNg2TemplateWriter = require('./nested-routes/nested-routes-ng2-template-writer');

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
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        defaultNg2TemplateWriter.write(generator);
    }
}
function writeNestedRoutesTemplate(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        nestedRoutesNg2TemplateWriter.write(generator);
    }
}
