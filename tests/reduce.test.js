require('../src/homework');
const reduce = require('../solution')(Homework);

test('returns 10 for [1, 2, 3, 4] with add function', (done) => {
  const asyncArray = new Homework.AsyncArray([1, 2, 3, 4]);
  const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);

  reduce(asyncArray, reducerSum, 0, (res) => {
    expect(res).toBe(10);
    done();
  });
});

test('returns 0 for empty array with add function', (done) => {
  const asyncArray = new Homework.AsyncArray([]);
  const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);

  reduce(asyncArray, reducerSum, 0, (res) => {
    expect(res).toBe(0);
    done();
  });
});

test('returns initialValue for empty array with add function', (done) => {
  const asyncArray = new Homework.AsyncArray([]);
  const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);

  reduce(asyncArray, reducerSum, 7, (res) => {
    expect(res).toBe(7);
    done();
  });
});

test('returns 6 for [1,2,3] with multiply function', (done) => {
  const asyncArray = new Homework.AsyncArray([1, 2, 3]);
  const reducerMult = (acc, curr, i, src, cb) =>
    Homework.multiply(acc, curr, cb);

  reduce(asyncArray, reducerMult, 1, (res) => {
    expect(res).toBe(6);
    done();
  });
});

test('throws errors', () => {
  const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
  const fn = () => reduce([], reducerSum, 1, () => {});
  expect(fn).toThrow(TypeError);
});
