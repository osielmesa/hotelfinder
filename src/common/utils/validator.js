import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

/**
 * Checks if email is valid:
 * It must be a valid email format
 */
const isEmailValid = (email) => (!!email && isEmail(email) ? undefined : 'Required');

/**
 * Checks if password is valid:
 * It cannot be empty
 */
const isPasswordValid = (password) => ( password && !isEmpty(password) ? undefined : 'Required');

/**
 * Checks if password is valid:
 * It cannot be empty
 */
const isTextValid = (text) => ( text && !isEmpty(text) ? undefined : 'Required');

const isEmptyValue = (value) => {
  return isEmpty(value)
}

export {isEmailValid, isPasswordValid, isEmptyValue, isTextValid}
