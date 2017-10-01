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

const RESULTS_DIR = __dirname + '/results/';

describe('default angular template - translation enabled', function () {

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
        'navElementKey': 'about_us'
      })
      .on('end', function () {
        done();
      });

  });

  it('creates expected production files', function () {
    assert.file(expectedFiles.client.added);
  });

  it('expected production files have right content', function () {

    _.forEach(expectedFiles.client.added, function (change) {

      const actualContent = fs.readFileSync(change, 'utf8');
      const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });

  });

  it('creates expected test files', function () {
    assert.file(expectedFiles.client.addedTests);
  });

  it('expected test files have right content', function () {

    _.forEach(expectedFiles.client.addedTests, function (change) {

      const actualContent = fs.readFileSync(change, 'utf8');
      const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });

  });

  it('modifies all files as expected', function () {
    _.forEach(expectedFiles.client.changed, function (change) {
      const actualContent = fs.readFileSync(change, 'utf8');
      const expectedContent = fs.readFileSync(RESULTS_DIR + change, 'utf8');
      assert.textEqual(actualContent, expectedContent);
    });
  });

});
