export default (message) => {                    // Enable "break on all exceptions" to pause the execution.
  try { throw new Error(message); } catch (e) {} // eslint-disable-line no-empty
};
