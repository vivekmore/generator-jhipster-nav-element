'use strict';

var chalk = require('chalk'),
  constants = require('./constants'),
  defaultTemplatePrompter = require('./about-us/about-us-template-prompter'),
  faqTemplatePrompter = require('./faq/faq-template-prompter');

module.exports = {
  promptToChooseATemplate,
  promptTemplateSpecificQuestions
};

function promptToChooseATemplate(generator) {

  var done = generator.async();

  generator.prompt({
    type: 'list',
    name: 'templateType',
    message: 'Which *type* of template would you like to use?',
    choices: [
      {
        name: 'About Us',
        value: constants.TEMPLATE_TYPE.DEFAULT
      },
      {
        name: 'Frequently Asked Questions',
        value: constants.TEMPLATE_TYPE.FAQ
      },
      {
        name: 'Contact Us',
        value: constants.TEMPLATE_TYPE.CONTACT_US
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
    case constants.TEMPLATE_TYPE.CONTACT_US:
      askContactUsTemplateQuestions(generator);
      break;
    case constants.TEMPLATE_TYPE.FAQ:
      askFaqTemplateQuestions(generator);
      break;
    case constants.TEMPLATE_TYPE.DEFAULT:
      askDefaultTemplateQuestions(generator);
      break;
    default:
      generator.log('The templateType [' + generator.props.templateType + '] is unknown');
      break;
  }
}

function askContactUsTemplateQuestions(generator) {
  // TODO: implement
}

function askFaqTemplateQuestions(generator) {
  faqTemplatePrompter.askQuestions(generator);
}

function askDefaultTemplateQuestions(generator) {
  defaultTemplatePrompter.askQuestions(generator);
}
