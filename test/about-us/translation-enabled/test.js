/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var fse = require('fs-extra');
var _ = require('lodash');
var navElementConstants = require('../../../generators/app/constants');

const constants = require('../../../node_modules/generator-jhipster/generators/generator-constants'),
  RESULTS_DIR = __dirname + '/results',
  RESULT_CLIENT_MAIN_SRC_DIR = RESULTS_DIR + '/src/main/webapp/',
  RESULT_CLIENT_TEST_SRC_DIR = RESULTS_DIR + '/src/test/javascript/',
  CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR,
  CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR,
  expectedFiles = {
    client: {
      added: [
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.controller.js',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.controller.js'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.directive.js',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.directive.js'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.service.js',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.service.js'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.state.js',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.state.js'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.html',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.html'
        },
        {
          actual: CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.controller.spec.js',
          expected: RESULT_CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.controller.spec.js'
        },
        {
          actual: CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.directive.spec.js',
          expected: RESULT_CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.directive.spec.js'
        },
        {
          actual: CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.service.spec.js',
          expected: RESULT_CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.service.spec.js'
        },
        {
          actual: CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.state.spec.js',
          expected: RESULT_CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.state.spec.js'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/en/aboutUs.json',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'i18n/en/aboutUs.json'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/fr/aboutUs.json',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'i18n/fr/aboutUs.json'
        }
      ],

      changed: [
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json',
        }
      ]

    }
  };

describe('translation-enabled', function () {

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
        'navElementKey': '',
        'createDirective': true
      })
      .withGenerators([path.join(__dirname, '../../../node_modules/generator-jhipster/generators/modules')])
      .on('end', function () {
        done();
      });

  });

  it('creates expected files', function () {

    _.forEach(expectedFiles.client.added, function (change) {

      assert.file(change.actual);

      var actualContent = fs.readFileSync(change.actual, 'utf8');
      var expectedContent = fs.readFileSync(change.expected, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });

  });

  it('modifies all files as expected', function () {
    _.forEach(expectedFiles.client.changed, function (change) {
      var actualContent = fs.readFileSync(change.actual, 'utf8');
      var expectedContent = fs.readFileSync(change.expected, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });
  });

});
