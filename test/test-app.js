/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

var deps = [
  [helpers.createDummyGenerator(), 'jhipster:modules']
];

const constants = require('../node_modules/generator-jhipster/generators/generator-constants'),
  TEST_DIR = constants.TEST_DIR,
  CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR,
  CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;

const expectedFiles = {

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
      CLIENT_TEST_SRC_DIR + 'spec/app/aboutUs/aboutUs.state.spec.js'
    ],

    changed: [
      CLIENT_MAIN_SRC_DIR + 'index.html',
      CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html',

      CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
      CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json'
    ]
  }

};

describe('JHipster generator', function () {

  beforeEach(function (done) {

    helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        fse.copySync(path.join(__dirname, '../test/templates/01-default'), dir)
      })
      .withOptions({
        testmode: true,
        skipInstall: true
      })
      .withPrompts({
        'navElementKey': 'about-us',
        'createDirective': true
      })
      .withGenerators(deps)
      .on('end', function () {
        done();
      });

  });

  it('creates expected files for default configuration for client generator', function () {
    assert.file(expectedFiles.client.added);
    assert.file(expectedFiles.client.changed);
    console.log('test passed');
  });

});
