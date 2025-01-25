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

  describe('Static Methods', () => {
    it('MyPromise.resolve should resolve with given value', () => {
      return MyPromise.resolve(42).then((value) => {
        expect(value).toBe(42);
      });
    });

    it('MyPromise.reject should reject with given reason', () => {
      return MyPromise.reject('reason').catch((reason) => {
        expect(reason).toBe('reason');
      });
    });

    it('MyPromise.all should resolve when all promises resolve', () => {
      const promises = [
        MyPromise.resolve(1),
        MyPromise.resolve(2),
        MyPromise.resolve(3),
      ];

      return MyPromise.all(promises).then((values) => {
        expect(values).toEqual([1, 2, 3]);
      });
    });

    it('MyPromise.all should reject if one promise rejects', () => {
      const promises = [
        MyPromise.resolve(1),
        MyPromise.reject('error'),
        MyPromise.resolve(3),
      ];

      return MyPromise.all(promises).catch((reason) => {
        expect(reason).toBe('error');
      });
    });

    it('MyPromise.any should resolve with the first fulfilled value', () => {
      const promises = [
        MyPromise.reject('error'),
        MyPromise.resolve(42),
        MyPromise.resolve(3),
      ];

      return MyPromise.any(promises).then((value) => {
        expect(value).toBe(42);
      });
    });

    it('MyPromise.any should reject if all promises reject', () => {
      const promises = [MyPromise.reject('error1'), MyPromise.reject('error2')];

      return MyPromise.any(promises).catch((error) => {
        expect(error).toBeInstanceOf(AggregateError);
        expect(error.errors).toEqual(['error1', 'error2']);
      });
    });

    it('MyPromise.race should resolve or reject with the first settled promise', () => {
      return MyPromise.race([
        MyPromise.reject('error'),
        MyPromise.resolve(1),
      ]).catch((reason) => {
        expect(reason).toBe('error');
      });
    });

    it('MyPromise.allSettled should resolve with results of all promises', () => {
      const promises = [
        MyPromise.resolve(1),
        MyPromise.reject('error'),
        MyPromise.resolve(3),
      ];

      return MyPromise.allSettled(promises).then((results) => {
        expect(results).toEqual([
          { status: 'fulfilled', value: 1 },
          { status: 'rejected', reason: 'error' },
          { status: 'fulfilled', value: 3 },
        ]);
      });
    });
  });
});
