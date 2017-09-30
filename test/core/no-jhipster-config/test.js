/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('core', function () {

  before(function (done) {

    helpers.run(path.join(__dirname, '../../../generators/app'))
           .on('error', function (error) {
             assert.textEqual(error.message, `Can't read .yo-rc.json`);
           })
           .on('end', function () {
             done();
           });
  });

  it('throws error when .yo-rc.json is not found', () => {});

});
