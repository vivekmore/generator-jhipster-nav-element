/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var fse = require('fs-extra');
var _ = require('lodash');

const constants = require('../node_modules/generator-jhipster/generators/generator-constants'),
  RESULTS_DIR = __dirname + '/results/about-us/01-default',
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
        }
      ],

      notAdded: [
        CLIENT_MAIN_SRC_DIR + 'i18n/en/aboutUs.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/aboutUs.json'
      ],

      changed: [
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html',
          expected: RESULT_CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html'
        }
      ]

    }
  };

describe('default template : navElementKey="" : createDirective=true', function () {

  before(function (done) {

    helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        fse.copySync(path.join(__dirname, '../test/templates/01-default'), dir)
      })
      .withOptions({
        skipInstall: true
      })
      .withPrompts({
        'templateType': 'ABOUT-US',
        'navElementKey': '',
        'createDirective': true
      })
      .withGenerators([path.join(__dirname, '../node_modules/generator-jhipster/generators/modules')])
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

  it('does not create i18n component.json', function () {
    assert.noFile(expectedFiles.client.notAdded);
  });

  it('modifies all files as expected', function () {
    _.forEach(expectedFiles.client.changed, function (change) {
      var actualContent = fs.readFileSync(change.actual, 'utf8');
      var expectedContent = fs.readFileSync(change.expected, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });
  });

});
