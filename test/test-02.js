/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var fse = require('fs-extra');
var _ = require('lodash');

const constants = require('../node_modules/generator-jhipster/generators/generator-constants'),
  TEST_TEMPLATE_DIR = __dirname + '/results/02-translation-enabled/src/main/webapp/',
  CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR,
  CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR,
  expectedFiles = {
    client: {
      added: [
        CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/aboutUs/aboutUs.html',

        CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.directive.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.service.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.state.spec.js',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/aboutUs.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/aboutUs.json'
      ],

      changed: [
        {
          actual: CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html',
          expected: TEST_TEMPLATE_DIR + 'app/layouts/navbar/navbar.html'
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
          expected: TEST_TEMPLATE_DIR + 'i18n/en/global.json',
        },
        {
          actual: CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json',
          expected: TEST_TEMPLATE_DIR + 'i18n/fr/global.json',
        }
      ]

    }
  };

describe('default template : navElementKey="" : createDirective=true', function () {

  beforeEach(function (done) {

    helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        fse.copySync(path.join(__dirname, '../test/templates/02-translation-enabled'), dir)
      })
      .withOptions({
        skipInstall: true
      })
      .withPrompts({
        'navElementKey': '',
        'createDirective': true
      })
      .withGenerators([path.join(__dirname, '../node_modules/generator-jhipster/generators/modules')])
      .on('end', function () {
        done();
      });

  });

  it('creates expected files', function () {
    assert.file(expectedFiles.client.added);
  });

  it('modifies all files as expected', function () {
    _.forEach(expectedFiles.client.changed, function (change) {
      var actualContent = fs.readFileSync(change.actual, 'utf8');
      var expectedContent = fs.readFileSync(change.expected, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });
  });

});
