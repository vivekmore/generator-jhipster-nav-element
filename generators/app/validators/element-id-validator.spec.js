const elementIdValidator = require('./element-id-validator');

describe('🛠 element-id-validator', () => {
    describe('.validate()', () => {
        it('returns true for valid input', () => {
            const testValue = 'about_us';

            const actual = elementIdValidator.validate(testValue);

            const expected = true;
            expect(actual).toBe(expected);
        });

        it('returns error message for invalid input', () => {
            const testValue = 'about-us';

            const actual = elementIdValidator.validate(testValue);

            const expected = 'Navigation element may contain only alphanumeric values and underscores';
            expect(actual).toBe(expected);
        });
    });
    describe('.validateTitle()', () => {
        it('returns true for valid input', () => {
            const testValue = 'New Page';

            const actual = elementIdValidator.validateTitle(testValue);

            const expected = true;
            expect(actual).toBe(expected);
        });

        it('returns error message for invalid input', () => {
            const testValue = 'about-us';

            const actual = elementIdValidator.validateTitle(testValue);

            const expected = 'Title may contain only alphanumeric values and spaces';
            expect(actual).toBe(expected);
        });
    });
});
