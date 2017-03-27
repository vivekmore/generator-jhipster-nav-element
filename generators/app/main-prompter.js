'use strict';

var chalk = require('chalk'),
  constants = require('./constants'),
  defaultTemplatePrompter = require('./about-us/about-us-template-prompter'),
  defaultNg2TemplatePrompter = require('./about-us/about-us-ng2-template-prompter'),
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
    case constants.TEMPLATE_TYPE.FAQ:
      askFaqTemplateQuestions(generator);
      break;
    case constants.TEMPLATE_TYPE.DEFAULT:
      askDefaultTemplateQuestions(generator);
      break;
  }
}

function askFaqTemplateQuestions(generator) {
  faqTemplatePrompter.askQuestions(generator);
}

function askDefaultTemplateQuestions(generator) {
  if (generator.inheritedStuff.jhipsterVar.clientFramework === 'angular2') {
    defaultNg2TemplatePrompter.askQuestions(generator);
  } else {
    defaultTemplatePrompter.askQuestions(generator);
  }
}
