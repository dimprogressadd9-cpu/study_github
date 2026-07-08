const test = require('node:test');
const assert = require('node:assert');
const { add } = require('../src/calculator');

test('add: 1 + 2 = 3', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('add: マイナスも扱える (-2 + 5 = 3)', () => {
  assert.strictEqual(add(-2, 5), 3);
});
