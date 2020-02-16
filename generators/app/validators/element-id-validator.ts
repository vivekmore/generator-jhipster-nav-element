/**
 * Validate the input element-id
 *
 * @param {string} input - input to validate
 */
export function validate(input: string) {
    if (/^([a-zA-Z0-9_]*)$/.test(input)) {
        return true;
    }
    return 'Navigation element may contain only alphanumeric values and underscores';
}

export function validateTitle(input) {
    if (/^([a-zA-Z0-9 ]*)$/.test(input)) {
        return true;
    }
    return 'Title may contain only alphanumeric values and spaces';
}
