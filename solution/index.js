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

    async function run() {
      const length = await getLength();

      let acc = initialValue;
      let i = 0;
      while (await less(i, length)) {
        const curr = await getItem(i);
        acc = await callback(acc, curr, i, asyncArray);
        i = await add(i, 1);
      }

      return cb ? cb(acc) : acc;
    }

    return run();
  };
};
