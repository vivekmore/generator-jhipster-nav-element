/* global describe, before, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const fse = require('fs-extra');
const _ = require('lodash');
const constants = require('../../../node_modules/generator-jhipster/generators/generator-constants');
const navElementConstants = require('../../../generators/app/constants');
const expectedFiles = require('./expectations.json');

const RESULTS_DIR = `${__dirname}/results`;
const RESULT_CLIENT_MAIN_SRC_DIR = `${RESULTS_DIR}/src/main/webapp/`;
const RESULT_CLIENT_TEST_SRC_DIR = `${RESULTS_DIR}/src/test/javascript/`;
const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

describe('default angularjs template | translation-enabled', () => {
    before((done) => {
        helpers
            .run(path.join(__dirname, '../../../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(path.join(__dirname, '/playground'), dir);
            })
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT,
                navElementKey: '',
                createDirective: true
            })
            .on('end', () => {
                done();
            });
    });

    it('creates expected production files', () => {
        _.forEach(expectedFiles.client.added, (change) => {
            assert.file(CLIENT_MAIN_SRC_DIR + change);

            const actualContent = fs.readFileSync(CLIENT_MAIN_SRC_DIR + change, 'utf8');
            const expectedContent = fs.readFileSync(RESULT_CLIENT_MAIN_SRC_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    it('creates expected test files', () => {
        _.forEach(expectedFiles.client.addedTests, (change) => {
            assert.file(CLIENT_TEST_SRC_DIR + change);

            const actualContent = fs.readFileSync(CLIENT_TEST_SRC_DIR + change, 'utf8');
            const expectedContent = fs.readFileSync(RESULT_CLIENT_TEST_SRC_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    it('modifies all files as expected', () => {
        _.forEach(expectedFiles.client.changed, (change) => {
            const actualContent = fs.readFileSync(CLIENT_MAIN_SRC_DIR + change, 'utf8');
            const expectedContent = fs.readFileSync(RESULT_CLIENT_MAIN_SRC_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });
});
