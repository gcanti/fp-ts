import * as assert from 'assert'
import * as O from '../src/Option'
import * as LL from '../src/LinkedList'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { pipe } from '../src/pipeable'
import * as E from '../src/Either'
import { ordNumber } from '../src/Ord'
import { eqNumber } from '../src/Eq'

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

  it('snoc', () => {
    assert.deepStrictEqual(LL.snoc(someSingleton, 'b'), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: LL.nil }
    })
  })

  it('insertBy', () => {
    assert.deepStrictEqual(LL.insertBy(ordNumber.compare)(1)(LL.nil), {
      type: 'Cons',
      head: 1,
      tail: LL.nil
    })
    assert.deepStrictEqual(LL.insertBy(ordNumber.compare)(2)(LL.cons(1, LL.cons(3, LL.nil))), {
      type: 'Cons',
      head: 1,
      tail: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 3, tail: LL.nil } }
    })
  })

  it('insert', () => {
    assert.deepStrictEqual(LL.insert(ordNumber)(1)(LL.nil), {
      type: 'Cons',
      head: 1,
      tail: LL.nil
    })
    assert.deepStrictEqual(LL.insert(ordNumber)(2)(LL.cons(1, LL.cons(3, LL.nil))), {
      type: 'Cons',
      head: 1,
      tail: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 3, tail: LL.nil } }
    })
  })

  it('head', () => {
    assert.deepStrictEqual(LL.head(LL.nil), O.none)
    assert.deepStrictEqual(LL.head(LL.cons('x', someSingleton)), O.some('x'))
  })

  it('last', () => {
    assert.deepStrictEqual(LL.last(LL.nil), O.none)
    assert.deepStrictEqual(LL.last(LL.cons('x', someSingleton)), O.some('a'))
  })

  it('tail', () => {
    assert.deepStrictEqual(LL.tail(LL.nil), O.none)
    assert.deepStrictEqual(LL.tail(someSingleton), O.none)
    assert.deepStrictEqual(LL.tail(LL.cons('x', someSingleton)), O.some(someSingleton))
  })

  it('init', () => {
    assert.deepStrictEqual(LL.init(LL.nil), O.none)
    assert.deepStrictEqual(LL.init(someSingleton), O.some(LL.nil))
    assert.deepStrictEqual(LL.init(LL.cons('x', someSingleton)), O.some({ type: 'Cons', head: 'x', tail: LL.nil }))
  })

  it('uncons', () => {
    assert.deepStrictEqual(LL.uncons(LL.nil), O.none)
    assert.deepStrictEqual(LL.uncons(someSingleton), O.some({ head: 'a', tail: LL.nil }))
  })

  it('unsnoc', () => {
    assert.deepStrictEqual(LL.unsnoc(LL.nil), O.none)
    assert.deepStrictEqual(
      LL.unsnoc(LL.cons('b', someSingleton)),
      O.some({ init: { type: 'Cons', head: 'b', tail: LL.nil }, last: 'a' })
    )
  })

  it('index', () => {
    assert.deepStrictEqual(LL.index(LL.nil, 0), O.none)
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.cons(2, LL.nil)), 0), O.some(1))
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.cons(2, LL.nil)), 1), O.some(2))
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.cons(2, LL.nil)), 3), O.none)
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(LL.findIndex(f, LL.nil), O.none)
    assert.deepStrictEqual(LL.findIndex(f, LL.cons(1, LL.cons(2, LL.nil))), O.some(1))
    assert.deepStrictEqual(LL.findIndex(f, LL.cons(1, LL.nil)), O.none)
  })

  it('findLastIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(LL.findLastIndex(f, LL.nil), O.none)
    assert.deepStrictEqual(LL.findLastIndex(f, LL.cons(1, LL.cons(2, LL.cons(3, LL.cons(4, LL.nil))))), O.some(3))
    assert.deepStrictEqual(LL.findLastIndex(f, LL.cons(1, LL.nil)), O.none)
  })

  it('elemIndex', () => {
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 6, LL.nil), O.none)
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 2, LL.cons(1, LL.cons(2, LL.nil))), O.some(1))
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 6, LL.cons(1, LL.nil)), O.none)
  })

  it('elemIndex', () => {
    assert.deepStrictEqual(LL.elemLastIndex(eqNumber, 6, LL.nil), O.none)
    assert.deepStrictEqual(
      LL.elemLastIndex(eqNumber, 2, LL.cons(1, LL.cons(2, LL.cons(1, LL.cons(2, LL.nil))))),
      O.some(3)
    )
    assert.deepStrictEqual(LL.elemLastIndex(eqNumber, 6, LL.cons(1, LL.nil)), O.none)
  })
  it('reverse', () => {
    assert.deepStrictEqual(LL.reverse(LL.cons(1, LL.cons(2, LL.cons(3, LL.nil)))), {
      type: 'Cons',
      head: 3,
      tail: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 1, tail: LL.nil } }
    })
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

  it('fromArray', () => {
    assert.deepStrictEqual(LL.fromArray([]), LL.nil)
    assert.deepStrictEqual(LL.fromArray(['a']), { type: 'Cons', head: 'a', tail: LL.nil })
    assert.deepStrictEqual(LL.fromArray(['a', 'b']), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: LL.nil }
    })
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

  it('filter', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.cons(4, LL.nil)))),
        LL.filter(n => n % 2 === 0)
      ),
      { type: 'Cons', head: 2, tail: { type: 'Cons', head: 4, tail: LL.nil } }
    )
  })

  it('filterMap', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.cons(4, LL.nil)))),
        LL.filterMap(n => (n % 2 === 0 ? O.some(n) : O.none))
      ),
      { type: 'Cons', head: 2, tail: { type: 'Cons', head: 4, tail: LL.nil } }
    )
  })

  it('partition', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.cons(4, LL.nil)))),
        LL.partition(n => n % 2 === 0)
      ),
      {
        left: { type: 'Cons', head: 1, tail: { type: 'Cons', head: 3, tail: LL.nil } },
        right: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 4, tail: LL.nil } }
      }
    )
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons('a', LL.cons('bb', LL.cons('ccc', LL.cons('dddd', LL.nil)))),
        LL.partitionMap(s => (s.length % 2 === 0 ? E.left(s.length) : E.right('foo')))
      ),
      {
        left: { type: 'Cons', head: 2, tail: { type: 'Cons', head: 4, tail: LL.nil } },
        right: { type: 'Cons', head: 'foo', tail: { type: 'Cons', head: 'foo', tail: LL.nil } }
      }
    )
  })

  it('compact', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(O.some(1), LL.cons(O.some(2), LL.nil)),
        LL.compact
      ),
      LL.cons(1, LL.cons(2, LL.nil))
    )
  })

  it('separate', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(E.left(6), LL.cons(E.right('foo'), LL.nil)),
        LL.separate
      ),
      { left: { type: 'Cons', head: 6, tail: LL.nil }, right: { type: 'Cons', head: 'foo', tail: LL.nil } }
    )
  })
})
