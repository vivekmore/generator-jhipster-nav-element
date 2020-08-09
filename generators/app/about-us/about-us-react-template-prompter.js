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
            message: 'What title do you want for your new page? (e.g. newPage, new_page)',
            validate: elementIdValidator.validate,
            default: 'new_page'
        }
    ];

    const done = generator.async();

    generator.prompt(prompts)
        .then((props) => {
            generator.navElementKey = props.navElementKey;
            // To access props later use this.someOption;
            done();
        });
}
