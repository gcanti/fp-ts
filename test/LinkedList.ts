import * as assert from 'assert'
import * as O from '../src/Option'
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

  it('singleton', () => {
    assert.deepStrictEqual(LL.singleton('a'), { type: 'Cons', head: 'a', tail: LL.nil })
  })

  it('range', () => {
    assert.deepStrictEqual(LL.range(1, 3), {
      type: 'Cons',
      head: 1,
      tail: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 3, tail: LL.nil } }
    })
    assert.deepStrictEqual(LL.range(3, 1), {
      type: 'Cons',
      head: 3,
      tail: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 1, tail: LL.nil } }
    })
    assert.deepStrictEqual(LL.range(2, 2), { type: 'Cons', head: 2, tail: LL.nil })
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

  it('traverse', () => {
    const tfanone: LL.LinkedList<number> = LL.cons(2, LL.cons(1, LL.nil))
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const fasnone = LL.linkedList.traverse(O.option)(tfanone, f)
    assert.ok(O.isNone(fasnone))
    const tfa: LL.LinkedList<number> = LL.cons(3, LL.cons(1, LL.nil))
    const fas = LL.linkedList.traverse(O.option)(tfa, f)
    assert.deepStrictEqual(fas, O.some(tfa))
  })

  it('sequence', () => {
    assert.deepStrictEqual(
      LL.linkedList.sequence(O.option)(LL.cons(O.some(1), LL.cons(O.some(3), LL.nil))),
      O.some(LL.cons(1, LL.cons(3, LL.nil)))
    )
    assert.deepStrictEqual(LL.linkedList.sequence(O.option)(LL.cons(O.some(1), LL.cons(O.none, LL.nil))), O.none)
  })
})
