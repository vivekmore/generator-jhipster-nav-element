const path = require('path');
const testUtil = require('../../../test-util');
const navElementConstants = require('../../../../generators/app/constants');
const expectedFiles = require('./expectations.json');

const RESULTS_DIR = `${__dirname}/results/`;
const answers = {
    templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT,
    titleText: 'About Us'
};
describe('♻ default react template - translation enabled', () => {
    testUtil.commonSetup({ answers, playgroundDir: path.join(__dirname, '/playground') });
    testUtil.commonTests({
        expectedFiles,
        resultsDir: RESULTS_DIR
    });
});
