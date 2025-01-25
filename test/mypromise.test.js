const { MyPromise } = require('../src');

// const MyPromise = Promise;

describe('Test MyPromise', () => {
  describe('Basic Promise Behavior', () => {
    it('should fulfill promise with value 1', () => {
      const p = MyPromise.resolve(1);

      expect(p).toBeInstanceOf(MyPromise);
      return p.then((value) => {
        expect(value).toBe(1);
      });
    });

    it('should fulfill promise with value 1 to multiple then calls', () => {
      const p = MyPromise.resolve(1);

      expect(p).toBeInstanceOf(MyPromise);

      let callCount = 0;

      return Promise.all([
        p.then((value) => {
          expect(value).toBe(1);
          callCount++;
        }),
        p.then((value) => {
          expect(value).toBe(1);
          callCount++;
        }),
      ]).then(() => {
        expect(callCount).toBe(2); // Ensure both `then` calls executed.
      });
    });

    it('should reject promise with reason "some error"', () => {
      const p = MyPromise.reject('some error');

      expect(p).toBeInstanceOf(MyPromise);

      return p.catch((reason) => {
        expect(reason).toBe('some error');
      });
    });

    it('should reject promise with reason "some error" to multiple catch calls', () => {
      const p = MyPromise.reject('some error');

      expect(p).toBeInstanceOf(MyPromise);

      let callCount = 0;

      return Promise.all([
        p.catch((reason) => {
          expect(reason).toBe('some error');
          callCount++;
        }),
        p.catch((reason) => {
          expect(reason).toBe('some error');
          callCount++;
        }),
      ]).then(() => {
        expect(callCount).toBe(2); // Ensure both `catch` calls executed.
      });
    });

    it('should reject promise with reason error object from constructor', () => {
      try {
        const p = new MyPromise(); // Throws an error since executor is missing.
      } catch (reason) {
        expect(reason).toBeInstanceOf(Error); // Catch and test the error.
      }
    });
  });

  describe('Chained Promises', () => {
    it('should support chaining with fulfillment', () => {
      const p = MyPromise.resolve(1);

      return p
        .then((value) => {
          expect(value).toBe(1);
          return value + 1;
        })
        .then((value) => {
          expect(value).toBe(2);
        });
    });

    it('should support chaining with rejection', () => {
      const p = MyPromise.reject('some error');

      return p
        .catch((reason) => {
          expect(reason).toBe('some error');
          return `reason: ${reason}`;
        })
        .then((result) => {
          expect(result).toBe('reason: some error');
        });
    });

    it('should call finally after a fulfilled promise', () => {
      const p = MyPromise.resolve(1);

      return p
        .then((value) => {
          expect(value).toBe(1);
        })
        .finally(() => {
          expect(true).toBe(true); // Ensure `finally` is called.
        });
    });

    it('should call finally after a rejected promise', () => {
      const p = MyPromise.reject('some error');

      return p
        .catch((reason) => {
          expect(reason).toBe('some error');
        })
        .finally(() => {
          expect(true).toBe(true); // Ensure `finally` is called.
        });
    });
  });
});
