'use strict';

var constants = require('./constants'),
  defaultTemplateWriter = require('./about-us/about-us-template-writer'),
  faqTemplateWriter = require('./faq/faq-template-writer');

module.exports = {
  writeTemplate
};


function writeTemplate(generator) {
  switch (generator.props.templateType) {
    case constants.TEMPLATE_TYPE.CONTACT_US:
      writeContactUsTemplate(generator);
      break;
    case constants.TEMPLATE_TYPE.FAQ:
      writeFaqTemplate(generator);
      break;
    case constants.TEMPLATE_TYPE.DEFAULT:
      writeDefaultTemplate(generator);
      break;
    default:
      generator.log('The templateType [' + generator.props.templateType + '] is unknown');
      break;
  }
}

function writeContactUsTemplate(generator) {
  // todo : implement
}

function writeFaqTemplate(generator) {
  faqTemplateWriter.write(generator);
}

function writeDefaultTemplate(generator) {
  defaultTemplateWriter.write(generator);
}
