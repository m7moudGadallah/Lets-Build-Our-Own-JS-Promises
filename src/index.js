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
    throw new Error('Method not implemented');
  }

  /**
   * Reject the promise with the given reason, and run the reject reactions
   * @param {any} reason
   * @returns {void}
   */
  #onReject(reason) {
    throw new Error('Method not implemented');
  }

  /**
   * Register the fulfill and reject reactions
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   * @returns {MyPromise}
   */
  then(onFulfilled, onRejected) {
    throw new Error('Method not implemented');
  }

  /**
   * Register the reject reaction
   * @param {Function} onRejected
   * @returns {MyPromise}
   */
  catch(onRejected) {
    throw new Error('Method not implemented');
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
    throw new Error('Method not implemented');
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
    throw new Error('Method not implemented');
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
