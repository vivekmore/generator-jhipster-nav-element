/* global before, it */
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const fse = require('fs-extra');
const _ = require('lodash');

module.exports = {
    commonSetup,
    commonTests
};

function commonSetup(setupConfig) {
    const { answers, playgroundDir } = setupConfig;

    before((done) => {
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(playgroundDir, dir);
            })
            .withOptions({
                skipInstall: true
            })
            .withPrompts(answers)
            .on('end', done);
    });
}

function commonTests(testConfig) {
    const { expectedFiles, resultsDir } = testConfig;

    _.forEach(expectedFiles.client.added, (file) => {
        it(`creates expected production file: ${file}`, () => {
            assert.file(file);
        });

        it(`production file has right content: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(expectedFiles.client.addedTests, (file) => {
        it(`creates expected test file: ${file}`, () => {
            assert.file(file);
        });

        it(`test file has right content: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(expectedFiles.client.changed, (file) => {
        it(`modifies expected production file: ${file}`, () => {
            const actualContent = fs.readFileSync(file, 'utf8');
            const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });
}
