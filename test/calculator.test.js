const test = require('node:test');
const assert = require('node:assert');
const { add, divide } = require('../src/calculator');

test('add: 1 + 2 = 3', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('add: マイナスも扱える (-2 + 5 = 3)', () => {
  assert.strictEqual(add(-2, 5), 3);
});

test('divide: 10 / 2 = 5', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide: 0 で割るとエラーを投げる', () => {
  assert.throws(() => divide(10, 0), /0/);
});
