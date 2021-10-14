module.exports = function (Homework) {
  function promisify(fn) {
    return function (...args) {
      return new Promise((resolve) => {
        fn(...args, resolve);
      });
    };
  }

  return (asyncArray, fn, initialValue, cb) => {
    if (!(asyncArray instanceof Homework.AsyncArray)) {
      throw new TypeError('array is not an instance of AsyncArray');
    }

    if (typeof fn !== 'function') {
      throw new TypeError('fn is not a function');
    }

    const getLength = promisify(asyncArray.length);
    const getItem = promisify(asyncArray.get);
    const callback = promisify(fn);
    const add = promisify(Homework.add);
    const less = promisify(Homework.less);
    const equal = promisify(Homework.equal);

    async function run() {
      const length = await getLength();

      if (await equal(length, 0)) {
        return initialValue;
      }

      let acc = initialValue === undefined ? await getItem(0) : initialValue;
      let i = initialValue === undefined ? 1 : 0;

      for (; await less(i, length); i = await add(i, 1)) {
        const curr = await getItem(i);
        acc = await callback(acc, curr, i, asyncArray);
      }

      return acc;
    }

    run().then(cb);
  };
};
