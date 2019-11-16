/* global describe, beforeEach, it */
const assert = require('yeoman-assert');
const elementIdValidator = require('./element-id-validator');

describe('🛠 element-id-validator', () => {
    describe('.validate()', () => {
        it('returns true for valid input', () => {
            const testValue = 'about_us';

            const actual = elementIdValidator.validate(testValue);

            const expected = true;
            assert.strictEqual(actual, expected, `validate() should return [${expected}] for [${testValue}]`);
        });

        it('returns error message for invalid input', () => {
            const testValue = 'about-us';

            const actual = elementIdValidator.validate(testValue);

            const expected = 'Navigation element may contain only alphanumeric values and underscores';
            assert.strictEqual(actual, expected, `validate() should return [${expected}] for [${testValue}]`);
        });
    });
    describe('.validateTitle()', () => {
        it('returns true for valid input', () => {
            const testValue = 'New Page';

            const actual = elementIdValidator.validateTitle(testValue);

            const expected = true;
            assert.strictEqual(actual, expected, `validateTitle() should return [${expected}] for [${testValue}]`);
        });

        it('returns error message for invalid input', () => {
            const testValue = 'about-us';

            const actual = elementIdValidator.validateTitle(testValue);

            const expected = 'Title may contain only alphanumeric values and spaces';
            assert.strictEqual(actual, expected, `validateTitle() should return [${expected}] for [${testValue}]`);
        });
    });
});
