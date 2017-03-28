'use strict';

module.exports = {
  validate
};

/**
 * Validate the input element-id
 *
 * @param {string} input - input to validate
 */
function validate(input) {
  if (/^([a-zA-Z0-9_]*)$/.test(input)) {
    return true;
  } else {
    return 'Nav element may contain only alphanumeric values and underscores';
  }
}
