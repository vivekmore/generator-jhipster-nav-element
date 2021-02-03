const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const navElementConstants = require('../../../generators/app/constants');

describe('☯ core', () => {
    beforeAll(async () => {
        await helpers.create(path.join(__dirname, '../../../generators/app'))
            .withPrompts({ templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT })
            .on('error', (error) => {
                assert.textEqual(error.message, 'Can\'t read .yo-rc.json');
            })
            .run();
    });

    it('throws error when .yo-rc.json is not found', () => {
    });
});
