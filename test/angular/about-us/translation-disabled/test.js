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

    it('creates expected production files', () => {
        assert.file(expectedFiles.client.added);
    });

    it('expected production files have right content', () => {
        _.forEach(expectedFiles.client.added, (change) => {
            const actualContent = fs.readFileSync(change, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    it('creates expected test files', () => {
        assert.file(expectedFiles.client.addedTests);
    });

    it('expected test files have right content', () => {
        _.forEach(expectedFiles.client.addedTests, (change) => {
            const actualContent = fs.readFileSync(change, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    it('modifies all files as expected', () => {
        _.forEach(expectedFiles.client.changed, (change) => {
            const actualContent = fs.readFileSync(change, 'utf8');
            const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });
});
