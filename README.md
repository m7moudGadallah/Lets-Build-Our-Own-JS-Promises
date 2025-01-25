# Let's Build Our Own JS Promises

![Rounded Banner](./assets/banner-rounded.png)

## Introduction

Promises are a way to handle asynchronous operations in JS. To truly understand how they work, I decided to implement my own version of promises.

## Design

```js
class MyPromise {
  // Constructor and private fields
  #state;                // Current state of the promise (pending, fulfilled, rejected)
  #value;                // Resolved value of the promise
  #reason;               // Reason for rejection
  #fulfillReactions;     // List of fulfill callbacks
  #rejectReactions;      // List of reject callbacks

  constructor(executor)  // Accepts a function to handle resolve and reject logic

  // Private methods
  get #isSettled();      // Checks if the promise is settled
  #fireReactions();      // Executes the appropriate callbacks based on state
  #onResolve(value);     // Handles resolve logic
  #onReject(reason);     // Handles reject logic

  // Public instance methods
  then(onFulfilled, onRejected); // Registers fulfillment and rejection handlers
  catch(onRejected);             // Shortcut for handling rejection
  finally(onFinally);            // Executes logic regardless of fulfillment/rejection

  // Public static methods
  static resolve(value);         // Creates a fulfilled promise with a given value
  static reject(reason);         // Creates a rejected promise with a given reason
  static all(promises);          // Resolves when all promises are fulfilled, or rejects on the first rejection
  static any(promises);          // Resolves with the first fulfilled promise or rejects when all are rejected
  static race(promises);         // Resolves or rejects with the first settled promise
  static allSettled(promises);   // Resolves when all promises settle (fulfilled or rejected)
}
```

## File Structure

The project is organized for simplicity:

- `src` contains the source code.
- `src/index.js` holds the MyPromise class.
- `test` contains the test cases.
- `.prettierrc` configures Prettier.
- `package.json` manages project metadata.

## Installation

To install the project, you can follow these steps:

1. Clone the repository using the following command:

   ```bash
   git clone <repo_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_name>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the tests:

   ```bash
   npm test
   ```

## Usage

To use the `MyPromise` class, you can follow these steps:

1. Import the `MyPromise` class:

   ```javascript
   const MyPromise = require('./src/index');
   ```

2. Create a new instance of the `MyPromise` class:

   ```javascript
   const promise = new MyPromise((resolve, reject) => {
     setTimeout(() => {
       resolve('Hello, World!');
     }, 1000);
   });
   ```

3. Use the `then` method to handle the resolved value:

   ```javascript
   promise.then((value) => {
     console.log(value);
   });
   ```

4. Use the `catch` method to handle the rejected value:

   ```javascript
   promise.catch((error) => {
     console.error(error);
   });
   ```

5. Use the `finally` method to handle the resolved or rejected value:

   ```javascript
   promise.finally(() => {
     console.log('Promise is settled');
   });
   ```

Enjoy using the other methods of the `MyPromise` class!

## Helpful Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [JavaScript Visualized - Promise Execution By Lydia Hallie](https://www.youtube.com/watch?v=Xs1EMmBLpn4)

## Contributions

Contributions are welcome! You can:

- Add features
- Fix bugs
- Improve documentation
- Suggest ideas

## License

<!-- TODO: Add project license -->

<!-- This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. -->
