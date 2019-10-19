import * as assert from 'assert'
import * as LL from '../src/LinkedList'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { pipe } from '../src/pipeable'

const someSingleton: LL.LinkedList<string> = { type: 'Cons', head: 'a', tail: LL.nil }

describe('LinkedList', () => {
  it('URI', () => {
    assert.strictEqual(LL.URI, 'LinkedList')
  })

  it('cons', () => {
    assert.deepStrictEqual(LL.cons('a', LL.nil), { type: 'Cons', head: 'a', tail: LL.nil })
    assert.deepStrictEqual(LL.cons('b', someSingleton), { type: 'Cons', head: 'b', tail: someSingleton })
  })

  it('length', () => {
    assert.strictEqual(LL.length(LL.nil), 0)
    assert.strictEqual(LL.length(LL.cons('b', someSingleton)), 2)
  })

  it('isNil', () => {
    assert.strictEqual(LL.isNil(LL.nil), true)
    assert.strictEqual(LL.isNil(someSingleton), false)
  })

  it('isCons', () => {
    assert.strictEqual(LL.isCons(LL.nil), false)
    assert.strictEqual(LL.isCons(someSingleton), true)
  })

  it('map', () => {
    assert.deepStrictEqual(
      pipe(
        someSingleton,
        LL.map(identity)
      ),
      someSingleton
    )
    assert.deepStrictEqual(
      pipe(
        LL.cons('aaa', someSingleton),
        LL.map(s => s.length)
      ),
      {
        type: 'Cons',
        head: 3,
        tail: { type: 'Cons', head: 1, tail: LL.nil }
      }
    )
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
