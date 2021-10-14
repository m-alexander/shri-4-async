require('./homework');

const {
  AsyncArray,
  add,
  subtract,
  multiply,
  divide,
  less,
  equal,
  lessOrEqual,
} = Homework;

const a = new AsyncArray([1, 2, 3]);

a.push(4, () => {
  console.log('добавление элемента выполнено');
  a.print();

  a.set(2, 999, () => {
    console.log('присваивание элемента по индексу выполнено');
    a.print();

    a.get(0, (result) => {
      console.log('получение элемента по индексу выполнено, результат', result);
      a.print();

      a.pop((result) => {
        console.log(
          'получение последнего элемента выполнено, результат',
          result
        );
        a.print();

        a.length((result) => {
          console.log('получение длины массива выполнено, результат', result);
          a.print();
        });
      });
    });
  });
});

add(5, 2, (result) => console.log('результат сложения', result));

subtract(11, 7, (result) => console.log('результат вычитания', result));

multiply(6, 7, (result) => console.log('результат умножения', result));

divide(13, 7, (result) => console.log('результат деления', result));

less(5, 3, (result) => console.log('результат операции МЕНЬШЕ', result));

equal(1, 1, (result) => console.log('результат операции РАВНО', result));

lessOrEqual(12, 19, (result) =>
  console.log('результат операции МЕНЬШЕ ИЛИ РАВНО', result)
);

const asyncArray = new Homework.AsyncArray([1, 2, 3, 4]);
const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);

reduce(asyncArray, reducerSum, 0, (res) => {
  console.log('result is: ', res); // 10
});

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve) => {
      fn(...args, resolve);
    });
  };
}

function reduce(asyncArray, fn, initialValue, cb) {
  const callback = promisify(fn);
  const getItem = promisify(asyncArray.get);
  const getLength = promisify(asyncArray.length);

  async function run() {
    const length = await getLength();

    let acc = initialValue;
    for (let i = 0; i < length; i++) {
      const curr = await getItem(i);
      acc = await callback(acc, curr, i, asyncArray);
    }
    return acc;
  }

  run().then(cb);
}
