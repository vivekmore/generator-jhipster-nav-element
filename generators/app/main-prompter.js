'use strict';

var chalk = require('chalk'),
    constants = require('./constants');

module.exports = {
  askToChooseATemplate,
  askContactUsTemplateQuestions,
  askFaqTemplateQuestions,
  askDefaultTemplateQuestions
};

function askToChooseATemplate(generator) {

  var done = generator.async();

  generator.prompt({
    type: 'list',
    name: 'templateType',
    message: 'Which *type* of template would you like to use?',
    choices: [
      {
        value: constants.TEMPLATE_TYPE.DEFAULT,
        name: 'About Us'
      },
      {
        value: constants.TEMPLATE_TYPE.FAQ,
        name: 'Frequently Asked Questions'
      },
      {
        value: constants.TEMPLATE_TYPE.CONTACT_US,
        name: 'Contact Us'
      }
    ],
    default: constants.TEMPLATE_TYPE.DEFAULT

  }).then(function (prompt) {
    generator.props.templateType = prompt.templateType;
    // To access props later use this.props.someOption;
    done();
  }.bind(this));
}

function askContactUsTemplateQuestions(generator) {
  generator.defaultTemplateQuestions(generator);
}

function askFaqTemplateQuestions(generator) {
  generator.defaultTemplateQuestions(generator);
}

function askDefaultTemplateQuestions(generator) {
  generator.defaultTemplateQuestions(generator);
}
