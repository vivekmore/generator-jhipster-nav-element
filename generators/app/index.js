const BaseGenerator = require('generator-jhipster/generators/generator-base');
const chalk = require('chalk');
const semver = require('semver');
const _ = require('lodash');

const packageJson = require('../../package.json');
const mainPrompter = require('./main-prompter');
const mainWriter = require('./main-writer');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            readConfig() {
                this.jhipsterAppConfig = this.getJhipsterAppConfig();
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster Navigation Element')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);
            },
            checkJhipster() {
                const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packageJson.dependencies['generator-jhipster'];
                if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    get prompting() {
        return {
            chooseATemplate: mainPrompter.promptToChooseATemplate,
            templateSpecificQuestions: mainPrompter.promptTemplateSpecificQuestions
        };
    }

    configuring() {
        this.templateDir = `${_.toLower(this.templateType)}/`;
    }

    get writing() {
        return {
            writeTemplateSpecificFiles() {
                // function to use directly template
                this.template = function (source, destination) {
                    this.fs.copyTpl(
                        this.templatePath(source),
                        this.destinationPath(destination),
                        this
                    );
                };

                mainWriter.writeTemplate(this);
            }
        };
    }

    end() {
        this.log('End of navigation element generation');
    }
};
