import * as assert from 'assert'
import * as LL from '../src/LinkedList'

const someSingleton: LL.LinkedList<string> = { type: 'Cons', head: 'a', tail: LL.nil, length: 1 }

describe('LinkedList', () => {
  it('URI', () => {
    assert.strictEqual(LL.URI, 'LinkedList')
  })

  it('cons', () => {
    assert.deepStrictEqual(someSingleton, { type: 'Cons', head: 'a', tail: LL.nil, length: 1 })
    assert.deepStrictEqual(LL.cons('b', someSingleton), { type: 'Cons', head: 'b', tail: someSingleton, length: 2 })
  })

  it('isNil', () => {
    assert.strictEqual(LL.isNil(LL.nil), true)
    assert.strictEqual(LL.isNil(someSingleton), false)
  })

  it('isCons', () => {
    assert.strictEqual(LL.isCons(LL.nil), false)
    assert.strictEqual(LL.isCons(someSingleton), true)
  })
})
