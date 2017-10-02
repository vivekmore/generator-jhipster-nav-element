/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const fse = require('fs-extra');
const _ = require('lodash');
const constants = require('../../../node_modules/generator-jhipster/generators/generator-constants');
const navElementConstants = require('../../../generators/app/constants');
const expectedFiles = require('./expectations.json');

const
  RESULTS_DIR = __dirname + '/results',
  RESULT_CLIENT_MAIN_SRC_DIR = RESULTS_DIR + '/src/main/webapp/',
  RESULT_CLIENT_TEST_SRC_DIR = RESULTS_DIR + '/src/test/javascript/',
  CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR,
  CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

describe('default angularjs template | no directive created', function () {

  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../../generators/app'))
      .inTmpDir(function (dir) {
        fse.copySync(path.join(__dirname, '/playground'), dir)
      })
      .withOptions({
        skipInstall: true
      })
      .withPrompts({
        'templateType': navElementConstants.TEMPLATE_TYPE.DEFAULT,
        'navElementKey': 'about_us',
        'createDirective': false
      })
      .on('end', function () {
        done();
      });

  });

  it('creates expected production files', function () {

    _.forEach(expectedFiles.client.added, function (change) {

      assert.file(CLIENT_MAIN_SRC_DIR + change);

      const actualContent = fs.readFileSync(CLIENT_MAIN_SRC_DIR + change, 'utf8');
      const expectedContent = fs.readFileSync(RESULT_CLIENT_MAIN_SRC_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });

  });

  it('creates expected test files', function () {

    _.forEach(expectedFiles.client.addedTests, function (change) {

      assert.file(CLIENT_TEST_SRC_DIR + change);

      const actualContent = fs.readFileSync(CLIENT_TEST_SRC_DIR + change, 'utf8');
      const expectedContent = fs.readFileSync(RESULT_CLIENT_TEST_SRC_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });

  });

  it('skips i18n file creation', function () {
    _.forEach(expectedFiles.client.skipped, function (change) {
      assert.noFile(CLIENT_MAIN_SRC_DIR + change);
    });
  });

  it('modifies all files as expected', function () {
    _.forEach(expectedFiles.client.changed, function (change) {
      const actualContent = fs.readFileSync(CLIENT_MAIN_SRC_DIR + change, 'utf8');
      const expectedContent = fs.readFileSync(RESULT_CLIENT_MAIN_SRC_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });
  });

});
