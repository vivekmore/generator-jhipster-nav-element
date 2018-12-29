/* global describe, before, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const fse = require('fs-extra');
const _ = require('lodash');
const navElementConstants = require('../../../../generators/app/constants');
const expectedFiles = require('./expectations.json');

const RESULTS_DIR = `${__dirname}/results/`;

describe('default angular template - translation disabled', () => {
    before((done) => {
        helpers
            .run(path.join(__dirname, '../../../../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(path.join(__dirname, '/playground'), dir);
            })
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT,
                navElementKey: 'about_us'
            })
            .on('end', () => {
                done();
            });
    });

    _.forEach(expectedFiles.client.added, (file) => {
        it(`creates expected production file: ${file}`, () => {
            assert.file(file);
        });

        it(`production file has right content: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(expectedFiles.client.addedTests, (file) => {
        it(`creates expected test file: ${file}`, () => {
            assert.file(file);
        });

        it(`test file has right content: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(expectedFiles.client.changed, (file) => {
        it(`modifies expected production file: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });
});
