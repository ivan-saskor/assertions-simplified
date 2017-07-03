import inProduction from 'in-production';
import tryConsoleError from 'utils/try-console-error';
import breakpoint from 'utils/breakpoint';
import { DEFAULT_WARNING_MESSAGE, DEFAULT_ERROR_MESSAGE, DEFAULT_INVARIANT_MESSAGE } from 'constants';

export const warning = (message = DEFAULT_WARNING_MESSAGE) => {
  tryConsoleError(message);
  breakpoint(message);
};
export const safeWarning = (message) => {
  if (inProduction) return;
  warning(message);
};

export const error = (message = DEFAULT_ERROR_MESSAGE) => {
  throw new Error(message);
};
export const safeError = (message) => {
  if (inProduction) return;
  error(message);
};

export const invariant = (condition, message = DEFAULT_INVARIANT_MESSAGE) => {
  if (!condition) error(message);
};
export const safeInvariant = (condition, message) => {
  if (inProduction) return;
  invariant(condition, message);
};
