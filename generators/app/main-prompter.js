const constants = require('./constants');
const defaultNg2TemplatePrompter = require('./about-us/about-us-ng2-template-prompter');
const nestedRoutesNg2TemplatePrompter = require('./nested-routes/nested-routes-ng2-template-prompter');

module.exports = {
    promptToChooseATemplate,
    promptTemplateSpecificQuestions
};

function promptToChooseATemplate() {
    const done = this.async();

    this.prompt({
        type: 'list',
        name: 'templateType',
        message: 'Which *type* of page would you like to generate? (More templates will be added soon! Stay tuned...)',
        choices: [
            {
                name: 'About Us',
                value: constants.TEMPLATE_TYPE.DEFAULT
            },
            {
                name: 'Page with nested routes',
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
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        defaultNg2TemplatePrompter.askQuestions(generator);
    }
}
function askNestedRoutesTemplateQuestions(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        nestedRoutesNg2TemplatePrompter.askQuestions(generator);
    }
}
