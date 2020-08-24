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
            name: 'titleText',
            message: 'What title do you want for your new page? (e.g. "About Us", "Blog")',
            validate: elementIdValidator.validateTitle,
            default: 'About Us'
        }
    ];

    const done = generator.async();

    generator.prompt(prompts)
        .then((props) => {
            generator.titleText = props.titleText;
            // To access props later use this.someOption;
            done();
        });
}
