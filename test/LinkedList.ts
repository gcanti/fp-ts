import * as assert from 'assert'
import * as LL from '../src/LinkedList'

describe('LinkedList', () => {
  it('URI', () => {
    assert.strictEqual(LL.URI, 'LinkedList')
  })

  it('cons', () => {
    const singleton = LL.cons('a', LL.nil)
    assert.deepStrictEqual(singleton, { type: 'Cons', head: 'a', tail: LL.nil, length: 1 })
    assert.deepStrictEqual(LL.cons('b', singleton), { type: 'Cons', head: 'b', tail: singleton, length: 2 })
  })
})
