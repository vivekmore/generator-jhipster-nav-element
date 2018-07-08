const constants = require('./constants');
const defaultNg2TemplateWriter = require('./about-us/about-us-ng2-template-writer');

module.exports = {
    writeTemplate
};

function writeTemplate(generator) {
    switch (generator.templateType) {
    case constants.TEMPLATE_TYPE.DEFAULT:
        writeDefaultTemplate(generator);
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
