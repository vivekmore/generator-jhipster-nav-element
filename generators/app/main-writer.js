'use strict';

var constants = require('./constants'),
  defaultTemplateWriter = require('./about-us/about-us-template-writer'),
  defaultNg2TemplateWriter = require('./about-us/about-us-ng2-template-writer');

module.exports = {
  writeTemplate
};

function writeTemplate(generator) {
  switch (generator.props.templateType) {
    case constants.TEMPLATE_TYPE.DEFAULT:
      writeDefaultTemplate(generator);
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
