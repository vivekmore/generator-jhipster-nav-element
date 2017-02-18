'use strict';
const elementIdValidator = require('../validators/element-id-validator');

module.exports = {
  askQuestions
};

/**
 * Ask questions required to build the default template
 *
 * @param {object} generator - generator instance to use
 */
function askQuestions(generator) {

  const prompts = [
    {
      type: 'input',
      name: 'navElementKey',
      message: 'What would you like the nav element id to be? (e.g. aboutUs, about_us)',
      validate: elementIdValidator.validate,
      default: 'about_us'
    },
    {
      type: 'list',
      name: 'createDirective',
      message: 'Would you like me to create a sample directive for your nav element?',
      choices: [
        {value: true, name: 'Yes'},
        {value: false, name: 'No'}
      ],
      default: true
    }
  ];

  const done = generator.async();

  generator.prompt(prompts)
    .then(function (props) {
      generator.props.navElementKey = props.navElementKey;
      generator.props.createDirective = props.createDirective;
      // To access props later use this.props.someOption;
      done();
    });

}
