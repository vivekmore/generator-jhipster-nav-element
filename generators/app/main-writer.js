'use strict';

var constants = require('./constants'),
  defaultTemplateWriter = require('./about-us/about-us-template-writer'),
  defaultNg2TemplateWriter = require('./about-us/about-us-ng2-template-writer'),
  faqTemplateWriter = require('./faq/faq-template-writer');

module.exports = {
  writeTemplate
};

function writeTemplate(generator) {
  switch (generator.props.templateType) {
    case constants.TEMPLATE_TYPE.FAQ:
      writeFaqTemplate(generator);
      break;
    case constants.TEMPLATE_TYPE.DEFAULT:
      writeDefaultTemplate(generator);
      break;
  }
}

function writeFaqTemplate(generator) {
  faqTemplateWriter.write(generator);
}

function writeDefaultTemplate(generator) {
  if (generator.inheritedStuff.jhipsterVar.clientFramework === 'angular2') {
    defaultNg2TemplateWriter.write(generator);
  } else {
    defaultTemplateWriter.write(generator);
  }

}
