import { DEFAULT_WARNING_MESSAGE, DEFAULT_ERROR_MESSAGE, DEFAULT_INVARIANT_MESSAGE } from 'constants';
import { warning, error, invariant, safeWarning, safeError, safeInvariant } from 'index';
import inProduction from 'in-production';

const message = 'one';

const truthyCondition = true;
const falsyCondition = false;
const noCondition = undefined;

describe(`IN ${process.env.NODE_ENV}`, () => {
  describe('FUNCTION warning', () => {
    let oldConsole;
    let consoleLog = [];

    beforeEach(() => {
      oldConsole = global.console.error;
      global.console.error = (...args) => consoleLog.push(args);
    });
    afterEach(() => {
      global.console.error = oldConsole;
      consoleLog = [];
    });

    it('LOGS default message', () => {
      expect(
        warning(),
      ).to.be.undefined();
      expect(
        consoleLog,
      ).to.deep.equal([
        [DEFAULT_WARNING_MESSAGE],
      ]);
    });
  });
  describe('FUNCTION error', () => {
    it('WHEN NO message FAILS WITH default message', () => {
      expect(
        () => error(),
      ).to.throw(
      ).with.property('message', DEFAULT_ERROR_MESSAGE);
    });
    it('WHEN message FAILS WITH provided message', () => {
      expect(
        () => error(message),
      ).to.throw(
      ).with.property('message', message);
    });
  });
  describe('FUNCTION invariant', () => {
    it('WHEN NO condition AND NO message FAILS WITH default message', () => {
      expect(
        () => invariant(),
      ).to.throw(
      ).with.property('message', DEFAULT_INVARIANT_MESSAGE);
    });
    it('WHEN NO condition AND message FAILS WITH provided message', () => {
      expect(
        () => invariant(noCondition, message),
      ).to.throw(
      ).with.property('message', message);
    });
    it('WHEN FALSY condition AND NO message FAILS WITH default message', () => {
      expect(
        () => invariant(falsyCondition),
      ).to.throw(
      ).with.property('message', DEFAULT_INVARIANT_MESSAGE);
    });
    it('WHEN FALSY condition AND message FAILS WITH provided message', () => {
      expect(
        () => invariant(falsyCondition, message),
      ).to.throw(
      ).with.property('message', message);
    });
    it('WHEN TRUTHY condition AND NO message FAILS WITH default message', () => {
      expect(
        invariant(truthyCondition),
      ).to.be.undefined();
    });
    it('WHEN TRUTHY condition AND message FAILS WITH provided message', () => {
      expect(
        invariant(truthyCondition, message),
      ).to.be.undefined();
    });
  });
  describe('FUNCTION safeWarning', () => {
    let oldConsole;
    let consoleLog = [];

    beforeEach(() => {
      oldConsole = global.console.error;
      global.console.error = (...args) => consoleLog.push(args);
    });
    afterEach(() => {
      global.console.error = oldConsole;
      consoleLog = [];
    });

    if (inProduction) {
      it('DOES NOTHING', () => {
        expect(
          safeWarning(),
        ).to.be.undefined();
        expect(
          consoleLog,
        ).to.deep.equal([
        ]);
      });
    } else {
      it('LOGS default message', () => {
        expect(
          safeWarning(),
        ).to.be.undefined();
        expect(
          consoleLog,
        ).to.deep.equal([
          [DEFAULT_WARNING_MESSAGE],
        ]);
      });
    }
  });
  describe('FUNCTION safeError', () => {
    if (inProduction) {
      it('DOES NOTHING', () => {
        expect(
          safeError(),
        ).to.be.undefined();
      });
    } else {
      it('FAILS WITH default message', () => {
        expect(
          () => safeError(),
        ).to.throw(
        ).with.property('message', DEFAULT_ERROR_MESSAGE);
      });
    }
  });
  describe('FUNCTION safeInvariant', () => {
    if (inProduction) {
      it('DOES NOTHING', () => {
        expect(
          safeInvariant(),
        ).to.be.undefined();
      });
    } else {
      it('FAILS WITH default message', () => {
        expect(
          () => safeInvariant(),
        ).to.throw(
        ).with.property('message', DEFAULT_INVARIANT_MESSAGE);
      });
    }
  });
});
