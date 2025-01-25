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
});
