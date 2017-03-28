/*global describe, beforeEach, it*/
'use strict';

const elementIdValidator = require('./element-id-validator');
const assert = require('yeoman-assert');

describe('element-id-validator', function () {

  describe('.validate()', function () {

    it('returns true for valid input', function () {

      const testValue = "about_us";

      const actual = elementIdValidator.validate(testValue);

      const expected = true;
      assert.strictEqual(actual, expected, "validate() should return [" + expected + "] for [" + testValue + "]");

    });

    it('returns error message for invalid input', function () {

      const testValue = "about-us";

      const actual = elementIdValidator.validate(testValue);

      const expected = "Nav element may contain only alphanumeric values and underscores";
      assert.strictEqual(actual, expected, "validate() should return [" + expected + "] for [" + testValue + "]");

    });

  });
});
