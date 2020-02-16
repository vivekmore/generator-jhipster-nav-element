import * as fse from 'fs-extra';
import * as _ from 'lodash';
import { join } from 'path';

import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { TEMPLATE_TYPE } from '../../../../generators/app/constants';
import { client } from './expectations.json';

const RESULTS_DIR = `${__dirname}/results/`;

describe('default angular template - translation disabled', () => {
    before(() => {
        helpers
            .run(join(__dirname, '../../../../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(join(__dirname, '/playground'), dir);
            })
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateType: TEMPLATE_TYPE.DEFAULT,
                navElementKey: 'about_us'
            });
            // .on('end', done);
    });

    _.forEach(client.added, (file) => {
        it(`creates expected production file: ${file}`, () => {
            assert.file(file);
        });

        it(`production file has right content: ${file}`, () => {
            const actualContent = fse.readFileSync(file, 'utf8');
            const expectedContent = fse.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(client.addedTests, (file) => {
        it(`creates expected test file: ${file}`, () => {
            assert.file(file);
        });

        it(`test file has right content: ${file}`, () => {
            const actualContent = fse.readFileSync(file, 'utf8');
            const expectedContent = fse.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });

    _.forEach(client.changed, (file) => {
        it(`modifies expected production file: ${file}`, () => {
            const actualContent = fse.readFileSync(file, 'utf8');
            const expectedContent = fse.readFileSync(RESULTS_DIR + file, 'utf8');
            assert.textEqual(actualContent, expectedContent);
        });
    });
});
