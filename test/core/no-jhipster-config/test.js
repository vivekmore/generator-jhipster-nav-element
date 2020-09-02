/* global describe, before, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const navElementConstants = require('../../../generators/app/constants');

describe('☯ core', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../../../generators/app'))
            .withPrompts({ templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT })
            .on('error', (error) => {
                assert.textEqual(error.message, 'Can\'t read .yo-rc.json');
            })
            .on('end', done);
    });

    it('throws error when .yo-rc.json is not found', () => {});
});
