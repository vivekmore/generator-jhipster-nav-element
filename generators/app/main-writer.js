const constants = require('./constants');
const defaultTemplateWriter = require('./about-us/about-us-template-writer');
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
    } else {
        defaultTemplateWriter.write(generator);
    }
}
