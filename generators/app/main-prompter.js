const constants = require('./constants');
const defaultNg2TemplatePrompter = require('./about-us/about-us-ng-template-prompter');
const nestedRoutesNg2TemplatePrompter = require('./nested-routes/nested-routes-ng-template-prompter');
const cookieConsentNg2TemplatePrompter = require('./cookie-consent/cookie-consent-ng-template-prompter');

module.exports = {
    promptToChooseATemplate,
    promptTemplateSpecificQuestions
};

function promptToChooseATemplate() {
    const done = this.async();

    this.prompt({
        type: 'list',
        name: 'templateType',
        message:
      'What would you like to generate? (More components will be added soon! Stay tuned...)',
        choices: [
            {
                name: 'A Simple Page (with a corresponding nav element)',
                value: constants.TEMPLATE_TYPE.DEFAULT
            },
            {
                name: 'A Page With Nested Routes',
                value: constants.TEMPLATE_TYPE.NESTED_ROUTES
            },
            {
                name: 'A Cookie Consent Popup',
                value: constants.TEMPLATE_TYPE.COOKIE_CONSENT
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
    case constants.TEMPLATE_TYPE.COOKIE_CONSENT:
        askCookieConsentTemplateQuestions(this);
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
function askCookieConsentTemplateQuestions(generator) {
    if (generator.jhipsterAppConfig.clientFramework === 'angularX') {
        cookieConsentNg2TemplatePrompter.askQuestions(generator);
    }
}
