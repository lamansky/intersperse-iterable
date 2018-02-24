'use strict'

const assert = require('assert')
const intersperse = require('.')

describe('intersperseIterable()', function () {
  it('should add a constant value between each iterated item', function () {
    const i = intersperse(['work', 'work'], 'break')
    assert.strictEqual(i.next().value, 'work')
    assert.strictEqual(i.next().value, 'break')
    assert.strictEqual(i.next().value, 'work')
    assert.strictEqual(i.next().done, true)
  })

  it('should pass four arguments to separator callback function', function () {
    let called = 0
    const i = intersperse('ab', (index1, value1, index2, value2) => {
      called++
      assert.strictEqual(index1, 0)
      assert.strictEqual(value1, 'a')
      assert.strictEqual(index2, 1)
      assert.strictEqual(value2, 'b')
    })
    for (const item of i) {} // eslint-disable-line no-unused-vars
    assert.strictEqual(called, 1)
  })

  it('should add separator function return value between each iterated item', function () {
    const i = intersperse([1, 3, 5], (index1, value1, index2, value2) => value1 + value2)
    assert.strictEqual(i.next().value, 1)
    assert.strictEqual(i.next().value, 4)
    assert.strictEqual(i.next().value, 3)
    assert.strictEqual(i.next().value, 8)
    assert.strictEqual(i.next().value, 5)
    assert.strictEqual(i.next().done, true)
  })

  it('shouldn’t add anything if nothing’s iterated', function () {
    assert.strictEqual(intersperse([], 'separator').next().done, true)
  })

  it('shouldn’t add anything if there’s only one item iterated', function () {
    const i = intersperse(['forever alone'], 'separator')
    assert.strictEqual(i.next().value, 'forever alone')
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = intersperse.call('ac', 'b')
    assert.strictEqual(i.next().value, 'a')
    assert.strictEqual(i.next().value, 'b')
    assert.strictEqual(i.next().value, 'c')
    assert.strictEqual(i.next().done, true)
  })
})
