/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

const constants = require('../node_modules/generator-jhipster/generators/generator-constants'),
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

    notAdded: [
      CLIENT_MAIN_SRC_DIR + 'i18n/en/aboutUs.json',
      CLIENT_MAIN_SRC_DIR + 'i18n/fr/aboutUs.json'
    ],

    changed: {
      navbarHtml: CLIENT_MAIN_SRC_DIR +'app/layouts/navbar/navbar.html',
      enGlobalJson: CLIENT_MAIN_SRC_DIR +'i18n/en/global.json',
      frGlobalJson: CLIENT_MAIN_SRC_DIR +'i18n/fr/global.json'
    }
  }

};

describe('default template : navElementKey="" : createDirective=true', function () {

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

  it('does not create i18n component.json', function () {
    assert.noFile(expectedFiles.client.notAdded);
  });

  it('modifies navbar', function () {
    assert.fileContent(expectedFiles.client.changed.navbarHtml, /.*(<li ng-class="\{active: vm\.\$state\.includes\('aboutUs'\)\}">)(\n)*(.|\n)*glyphicon/);
  });

});
