const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('./constants');
const defaultNg2TemplatePrompter = require('./about-us/about-us-ng-template-prompter');
const defaultReactTemplatePrompter = require('./about-us/about-us-react-template-prompter');
const nestedRoutesNg2TemplatePrompter = require('./nested-routes/nested-routes-ng-template-prompter');

module.exports = {
    promptToChooseATemplate,
    promptTemplateSpecificQuestions
};

function promptToChooseATemplate() {
    const done = this.async();

    this.prompt({
        type: 'list',
        name: 'templateType',
        message: 'What would you like to generate? (More components will be added soon! Stay tuned...)',
        choices: [
            {
                name: 'A Simple Page (with a corresponding nav element)',
                value: constants.TEMPLATE_TYPE.DEFAULT
            },
            {
                name: 'A Page With Nested Routes',
                value: constants.TEMPLATE_TYPE.NESTED_ROUTES
            }
        ]
    }).then((prompt) => {
        this.templateType = prompt.templateType;
        // To access props later use this.someOption;
        done();
    });
}

function promptTemplateSpecificQuestions() {
    switch (this.templateType) {
    case constants.TEMPLATE_TYPE.DEFAULT:
        askDefaultTemplateQuestions(this);
        break;
    case constants.TEMPLATE_TYPE.NESTED_ROUTES:
        askNestedRoutesTemplateQuestions(this);
        break;
    default:
        break;
    }
}

function askDefaultTemplateQuestions(generator) {
    const clientFramework = generator.jhipsterAppConfig.clientFramework;
    if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        defaultNg2TemplatePrompter.askQuestions(generator);
    } else if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT) {
        defaultReactTemplatePrompter.askQuestions(generator);
    }
}
function askNestedRoutesTemplateQuestions(generator) {
    if (generator.jhipsterAppConfig.clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        nestedRoutesNg2TemplatePrompter.askQuestions(generator);
    }
}
