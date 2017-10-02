'use strict';

var chalk = require('chalk'),
  constants = require('./constants'),
  defaultTemplatePrompter = require('./about-us/about-us-template-prompter'),
  defaultNg2TemplatePrompter = require('./about-us/about-us-ng2-template-prompter');

module.exports = {
  promptToChooseATemplate,
  promptTemplateSpecificQuestions
};

function promptToChooseATemplate(generator) {

  var done = generator.async();

  generator.prompt({
    type: 'list',
    name: 'templateType',
    message: 'Which *type* of page would you like to generate? (More templates will be added soon! Stay tuned...)',
    choices: [
      {
        name: 'About Us',
        value: constants.TEMPLATE_TYPE.DEFAULT
      }
    ]

  }).then(function (prompt) {
    generator.props.templateType = prompt.templateType;
    // To access props later use this.props.someOption;
    done();
  });
}

function promptTemplateSpecificQuestions(generator) {
  switch (generator.props.templateType) {
    case constants.TEMPLATE_TYPE.DEFAULT:
      askDefaultTemplateQuestions(generator);
      break;
  }
}

function askDefaultTemplateQuestions(generator) {
  if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
    defaultNg2TemplatePrompter.askQuestions(generator);
  } else {
    defaultTemplatePrompter.askQuestions(generator);
  }
}
