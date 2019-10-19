import * as assert from 'assert'
import * as LL from '../src/LinkedList'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { pipe } from '../src/pipeable'

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

  it('reduce', () => {
    assert.strictEqual(
      pipe(
        LL.cons('b', someSingleton),
        LL.reduce('', (b, a) => b + a)
      ),
      'ba'
    )
  })

  it('foldMap', () => {
    const foldMap = LL.foldMap(monoidString)
    assert.strictEqual(
      pipe(
        LL.cons('b', someSingleton),
        foldMap(identity)
      ),
      'ba'
    )
  })

  it('toArray', () => {
    assert.deepStrictEqual(LL.toArray(LL.cons('b', someSingleton)), ['b', 'a'])
  })

  it('reduceRight', () => {
    assert.strictEqual(
      pipe(
        LL.cons('b', someSingleton),
        LL.reduceRight('', (a, b) => a + b)
      ),
      'ba'
    )
  })
})
