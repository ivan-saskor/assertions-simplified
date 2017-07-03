# assertions-simplified
A collection of simple runtime assertions inspired by
[invariant](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/__forks__/invariant.js) and
[warning](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/__forks__/warning.js) from
[Facebook JS](https://github.com/facebook/fbjs).

## Installation

```
npm install assertions-simplified --save
```

## API

#### `warning(message?: string)`

Writes an error with stack trace in the console log. If 'break on all exceptions' is enabled execution will be paused
on specified breakpoint.

#### `safeWarning(message?: string)`

Does nothing in production. Otherwise same as warning.

#### `error(message?: string)`

Throws an error unconditionally.

#### `safeError(message?: string)`

Does nothing in production. Otherwise same as error.

#### `invariant(condition: boolean, message?: string)`

Throws an error if invariant condition is not met.

#### `safeInvariant(condition: boolean, message?: string)`

Does nothing in production. Otherwise same as invariant.

## Usage

```js

import { warning, safeWarning } from 'assertions-simplified';
import { error, safeError } from 'assertions-simplified';
import { invariant, safeInvariant } from 'assertions-simplified';
 
//----------------------------------------------------------------------------------------
// Basic use-cases
//----------------------------------------------------------------------------------------
 
// Write an error in console log, and continue.
warning();
 
// Throw an error.
error();
 
// Throw an error when invariant condition is not meet.
invariant(name.length < 200);
 
//----------------------------------------------------------------------------------------
// With custom message
//----------------------------------------------------------------------------------------
 
warning('Oops! Something went slightly wrong!');
error('Oops! Something went terribly wrong!');
invariant(name.length < 200, 'Name is too long!');
 
//--------------------------------------------
// Safe variations
//--------------------------------------------
 
safeWarning();   // Do nothing in production.
safeError();     // Do nothing in production.
safeInvariant(); // Do nothing in production.
 
//--------------------------------------------
// Example: How to use safe error 
//--------------------------------------------
 
function getFriendlyName(schoolGrade) {  
  switch (schoolGrade) {
    case 9:
      return 'Freshman';
    case 10:
      return 'Sophomore';
    case 10:
      return 'Junior';
    case 10:
      return 'Senior';
    default:
      safeError('Unsupported school grade!'); // stops execution in development only
      return 'unknown';
  }
}
 
```

## License

MIT
