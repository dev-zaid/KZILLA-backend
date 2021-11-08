function* promiseGenerator(i) {
  for (let x = 1; x <= i; x++) {
    yield new Promise((resolve, reject) => {
      if (x > 10) return setTimeout(() => reject(x), x * 1000);
      return setTimeout(() => resolve(x), x * 1000);
    });
  }
}

/**
 * Returns an array of promises
 * @param {number} i The number of promises in the array
 * @returns An array of promises
 */
const generator = (i) => {
  const gen = promiseGenerator(i);
  let arr = [];
  while (i-- != 0) arr.push(gen.next().value);
  return arr;
};

module.exports = { generator };

/**
 * TASK DETAILS
 *
 * 1. Require the generator function using DESTRUCTURING in a separate file.
 * 2. Execute the generator function by passing a number parameter.
 * 3. For a parameter <= 10, all the promises will resolve. PRINT RESOLVED VALUE of each promise in the array.
 * 4. For a parameter >10, all the promises will reject. CATCH THE ERRORS AND PRINT THE REJECTED MESSAGE for each rejected promise in the array.
 *
 * The expected output for i=15 is shared as a screenshot.
 *
 * Use BOTH then/catch and async/await in 2 seperate files.
 */
