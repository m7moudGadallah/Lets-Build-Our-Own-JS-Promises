const PromiseState = Object.freeze({
  Pending: 'pending',
  Fulfilled: 'fulfilled',
  Rejected: 'rejected',
});

class MyPromise {
  #state;
  #value;
  #reason;
  #fulfillReactions = [];
  #rejectReactions = [];

  /**
   * @param {(resolve:(value:any)=>void), reject:(reason:any)=>void)=>void} executor
   */
  constructor(executor) {
    throw new Error('Method not implemented');
  }

  /**
   * Check if the promise is settled or not
   * @returns {boolean}
   */
  get #isSettled() {
    return this.#state !== PromiseState.Pending;
  }

  /**
   * Run the reactions (callbacks) based on the state of the promise
   * @returns {void}
   */
  #fireReactions() {
    if (this.#state == PromiseState.Fulfilled) {
      // Run the fulfill reactions
      this.#fulfillReactions.forEach((reaction) => {
        reaction(this.#value);
      });

      // Clear the fulfill reactions
      this.#fulfillReactions = [];
    } else if (this.#state == PromiseState.Rejected) {
      // Run the reject reactions
      this.#rejectReactions.forEach((reaction) => {
        reaction(this.#reason);
      });

      // Clear the reject reactions
      this.#rejectReactions = [];
    }
  }

  /**
   * Resolve the promise with the given value, and run the fulfill reactions
   * @param {any} value
   * @returns {void}
   */
  #onResolve(value) {
    // If the promise is already settled, return
    if (this.#isSettled) return;

    // If the value is a promise, wait for it to resolve
    if (value && value?.then && typeof value.then === 'function') {
      value.then(this.#onResolve.bind(this), this.#onReject.bind(this));
      return;
    }

    // If the value is not a promise, resolve the promise with the value
    queueMicrotask(() => {
      this.#state = PromiseState.Fulfilled;
      this.#value = value;
      this.#fireReactions();
    });
  }

  /**
   * Reject the promise with the given reason, and run the reject reactions
   * @param {any} reason
   * @returns {void}
   */
  #onReject(reason) {
    // If the promise is already settled, return
    if (this.#isSettled) return;

    // Reject the promise with the reason
    queueMicrotask(() => {
      this.#state = PromiseState.Rejected;
      this.#reason = reason;
      this.#fireReactions();
    });
  }

  /**
   * Register the fulfill and reject reactions
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   * @returns {MyPromise}
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfillReaction = (value) => {
        if (onFulfilled && typeof onFulfilled == 'function') {
          try {
            const result = onFulfilled(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(value);
        }
      };

      const rejectReaction = (reason) => {
        if (onRejected && typeof onRejected == 'function') {
          try {
            const result = onRejected(reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(reason);
        }
      };

      if (this.#state == PromiseState.Pending) {
        // Register the fulfill and reject reactions
        this.#fulfillReactions.push(fulfillReaction);
        this.#rejectReactions.push(rejectReaction);
      } else if (this.#state == PromiseState.Fulfilled) {
        // Register the fulfill reaction in the microtask queue
        queueMicrotask(() => fulfillReaction(this.#value));
      } else if (this.#state == PromiseState.Rejected) {
        // Register the reject reaction in the microtask queue
        queueMicrotask(() => rejectReaction(this.#reason));
      }
    });
  }

  /**
   * Register the reject reaction
   * @param {Function} onRejected
   * @returns {MyPromise}
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * Register the finally reaction
   * @param {Function} onFinally
   * @returns {MyPromise}
   */
  finally(onFinally) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a promise that is resolved with the given value
   * @param {any} value
   * @returns {MyPromise}
   */
  static resolve(value) {
    if (value && value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  /**
   * Create a promise that is rejected with the given reason
   * @param {any} reason
   * @returns {MyPromise}
   */
  static reject(reason) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a promise that is resolved when all the given promises are resolved
   * @param {MyPromise[]} promises
   * @returns {MyPromise}
   */
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError('Input must be an array of promises'));
        return;
      }

      let pendingPromisesCount = promises.length;
      let resultValues = new Array(promises.length);

      if (pendingPromisesCount === 0) {
        resolve(resultValues);
        return;
      }

      promises.forEach((promise, index) => {
        const currPromise =
          promise && typeof promise.then === 'function'
            ? promise
            : MyPromise.resolve(promise);

        currPromise.then(
          (value) => {
            resultValues[index] = value;
            pendingPromisesCount--;

            if (pendingPromisesCount === 0) {
              resolve(resultValues);
            }
          },
          (reason) => {
            reject(reason);
          },
        );
      });
    });
  }

  /**
   * Create a promise that is resolved when any of the given promises are resolved
   * @param {MyPromise[]} promises
   * @returns {MyPromise}
   */
  static any(promises) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a promise that is resolved or rejected when any of the given promises are resolved or rejected
   * @param {MyPromise[]} promises
   * @returns {MyPromise}
   */
  static race(promises) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a promise that is settled when all the given promises are settled
   * @param {MyPromise[]} promises
   */
  static allSettled(promises) {
    throw new Error('Method not implemented');
  }
}

module.exports = { PromiseState, MyPromise };
