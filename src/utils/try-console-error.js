import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';

export default (message) => {
  if (!isUndefined(console) && isFunction(console.error)) { // eslint-disable-line no-console
    console.error(message);                                 // eslint-disable-line no-console
  }
};
