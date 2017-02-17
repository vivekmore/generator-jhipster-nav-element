'use strict';

module.exports = {
  askQuestions
};

/**
 * Ask questions required to build the faq template
 *
 * @param {object} generator - generator instance to use
 */
function askQuestions(generator) {

  const prompts = [
    {
      type: 'input',
      name: 'navElementKey',
      message: 'What would you like the nav element id to be? (e.g. aboutUs, about-us)',
      validate: function (input) {
        if (/^([a-zA-Z0-9_]*)$/.test(input)) {
          return true;
        } else {
          return 'Your nav element id cannot contain special characters or a blank space';
        }
      },
      default: 'faq'
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
