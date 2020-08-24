module.exports = {
    validate,
    validateTitle
};

/**
 * Validate the input element-id
 *
 * @param {string} input - input to validate
 */
function validate(input) {
    if (/^([a-zA-Z0-9_]*)$/.test(input)) {
        return true;
    }
    return 'Navigation element may contain only alphanumeric values and underscores';
}

function validateTitle(input) {
    if (/^([a-zA-Z0-9 ]*)$/.test(input)) {
        return true;
    }
    return 'Title may contain only alphanumeric values and spaces';
}
