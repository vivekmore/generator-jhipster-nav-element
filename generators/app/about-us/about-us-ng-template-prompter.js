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
            message: 'What would you like the navigation element id to be? (e.g. aboutUs, about_us)',
            validate: elementIdValidator.validate,
            default: 'hi_there'
        }
    ];

    const done = generator.async();

    generator.prompt(prompts)
        .then((props) => {
            generator.navElementKey = props.navElementKey;
            generator.createDirective = props.createDirective;
            // To access props later use this.someOption;
            done();
        });
}
