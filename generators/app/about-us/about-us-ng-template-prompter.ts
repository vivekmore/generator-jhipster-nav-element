import { validate } from '../validators/element-id-validator';

/**
 * Ask questions required to build the default template
 *
 * @param {object} generator - generator instance to use
 */
export function askQuestions(generator: any) {
    const prompts = [
        {
            type: 'input',
            name: 'navElementKey',
            message: 'What would you like the navigation element id to be? (e.g. aboutUs, about_us)',
            validate: validate,
            default: 'hi_there'
        }
    ];

    const done = generator.async();

    generator.prompt(prompts)
             .then((props: any) => {
                 generator.navElementKey = props.navElementKey;
                 // To access props later use this.someOption;
                 done();
             });
}
