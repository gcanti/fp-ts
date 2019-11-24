import * as assert from 'assert'
import * as O from '../src/Option'
import * as LL from '../src/LinkedList'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { pipe } from '../src/pipeable'
import * as E from '../src/Either'
import { ordNumber } from '../src/Ord'
import { eqNumber } from '../src/Eq'

describe('LinkedList', () => {
  it('URI', () => {
    assert.strictEqual(LL.URI, 'LinkedList')
  })

  it('cons', () => {
    assert.deepStrictEqual(LL.cons('a', LL.nil), { type: 'Cons', head: 'a', tail: LL.nil })
    assert.deepStrictEqual(LL.cons('a', LL.singleton('b')), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: LL.nil }
    })
  })

  it('singleton', () => {
    assert.deepStrictEqual(LL.singleton('a'), { type: 'Cons', head: 'a', tail: LL.nil })
  })

  it('range', () => {
    assert.deepStrictEqual(LL.range(1, 3), LL.cons(1, LL.cons(2, LL.singleton(3))))
    assert.deepStrictEqual(LL.range(3, 1), LL.cons(3, LL.cons(2, LL.singleton(1))))
    assert.deepStrictEqual(LL.range(2, 2), LL.singleton(2))
  })

  it('length', () => {
    assert.strictEqual(LL.length(LL.nil), 0)
    assert.strictEqual(LL.length(LL.cons('a', LL.singleton('b'))), 2)
  })

  it('isNil', () => {
    assert.strictEqual(LL.isNil(LL.nil), true)
    assert.strictEqual(LL.isNil(LL.singleton('a')), false)
  })

  it('isCons', () => {
    assert.strictEqual(LL.isCons(LL.nil), false)
    assert.strictEqual(LL.isCons(LL.singleton(1)), true)
  })

  it('snoc', () => {
    assert.deepStrictEqual(LL.snoc(LL.singleton('a'), 'b'), LL.cons('a', LL.singleton('b')))
  })

  it('insertBy', () => {
    assert.deepStrictEqual(LL.insertBy(ordNumber.compare)(1)(LL.nil), LL.singleton(1))
    assert.deepStrictEqual(
      LL.insertBy(ordNumber.compare)(2)(LL.cons(1, LL.singleton(3))),
      LL.cons(1, LL.cons(2, LL.singleton(3)))
    )
  })

  it('insert', () => {
    assert.deepStrictEqual(LL.insert(ordNumber)(1)(LL.nil), LL.singleton(1))
    assert.deepStrictEqual(
      LL.insert(ordNumber)(2)(LL.cons(1, LL.singleton(3))),
      LL.cons(1, LL.cons(2, LL.singleton(3)))
    )
  })

  it('head', () => {
    assert.deepStrictEqual(LL.head(LL.nil), O.none)
    assert.deepStrictEqual(LL.head(LL.cons('x', LL.singleton('a'))), O.some('x'))
  })

  it('last', () => {
    assert.deepStrictEqual(LL.last(LL.nil), O.none)
    assert.deepStrictEqual(LL.last(LL.cons('x', LL.singleton('a'))), O.some('a'))
  })

  it('tail', () => {
    assert.deepStrictEqual(LL.tail(LL.nil), O.none)
    assert.deepStrictEqual(LL.tail(LL.singleton('a')), O.none)
    assert.deepStrictEqual(LL.tail(LL.cons('x', LL.singleton('a'))), O.some(LL.singleton('a')))
  })

  it('init', () => {
    assert.deepStrictEqual(LL.init(LL.nil), O.none)
    assert.deepStrictEqual(LL.init(LL.singleton('a')), O.some(LL.nil))
    assert.deepStrictEqual(LL.init(LL.cons('x', LL.singleton('a'))), O.some(LL.singleton('x')))
  })

  it('uncons', () => {
    assert.deepStrictEqual(LL.uncons(LL.nil), O.none)
    assert.deepStrictEqual(LL.uncons(LL.singleton('a')), O.some({ head: 'a', tail: LL.nil }))
  })

  it('unsnoc', () => {
    assert.deepStrictEqual(LL.unsnoc(LL.nil), O.none)
    assert.deepStrictEqual(
      LL.unsnoc(LL.cons('b', LL.singleton('a'))),
      O.some({ init: { type: 'Cons', head: 'b', tail: LL.nil }, last: 'a' })
    )
  })

  it('index', () => {
    assert.deepStrictEqual(LL.index(LL.nil, 0), O.none)
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.singleton(2)), 0), O.some(1))
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.singleton(2)), 1), O.some(2))
    assert.deepStrictEqual(LL.index(LL.cons(1, LL.singleton(2)), 3), O.none)
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(LL.findIndex(f, LL.nil), O.none)
    assert.deepStrictEqual(LL.findIndex(f, LL.cons(1, LL.singleton(2))), O.some(1))
    assert.deepStrictEqual(LL.findIndex(f, LL.cons(1, LL.nil)), O.none)
  })

  it('findLastIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(LL.findLastIndex(f, LL.nil), O.none)
    assert.deepStrictEqual(LL.findLastIndex(f, LL.cons(1, LL.cons(2, LL.cons(3, LL.singleton(4))))), O.some(3))
    assert.deepStrictEqual(LL.findLastIndex(f, LL.cons(1, LL.nil)), O.none)
  })

  it('elemIndex', () => {
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 6, LL.nil), O.none)
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 2, LL.cons(1, LL.singleton(2))), O.some(1))
    assert.deepStrictEqual(LL.elemIndex(eqNumber, 6, LL.singleton(1)), O.none)
  })

  it('elemIndex', () => {
    assert.deepStrictEqual(LL.elemLastIndex(eqNumber, 6, LL.nil), O.none)
    assert.deepStrictEqual(
      LL.elemLastIndex(eqNumber, 2, LL.cons(1, LL.cons(2, LL.cons(1, LL.singleton(2))))),
      O.some(3)
    )
    assert.deepStrictEqual(LL.elemLastIndex(eqNumber, 6, LL.singleton(1)), O.none)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(LL.insertAt(0, 'a', LL.nil), O.some(LL.singleton('a')))
    assert.deepStrictEqual(LL.insertAt(1, 'a', LL.nil), O.none)
    assert.deepStrictEqual(
      LL.insertAt(1, 'b', LL.cons('a', LL.singleton('c'))),
      O.some(LL.cons('a', LL.cons('b', LL.singleton('c'))))
    )
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(LL.deleteAt(0, LL.nil), O.none)
    assert.deepStrictEqual(LL.deleteAt(2, LL.singleton('a')), O.none)
    assert.deepStrictEqual(
      LL.deleteAt(1, LL.cons('a', LL.cons('b', LL.singleton('c')))),
      O.some(LL.cons('a', LL.singleton('c')))
    )
  })

  it('updateAt', () => {
    assert.deepStrictEqual(LL.updateAt(0, 'a', LL.nil), O.none)
    assert.deepStrictEqual(LL.updateAt(0, 'x', LL.singleton('a')), O.some(LL.singleton('x')))
    assert.deepStrictEqual(LL.updateAt(2, 'x', LL.singleton('a')), O.none)
    assert.deepStrictEqual(
      LL.updateAt(1, 'x', LL.cons('a', LL.cons('b', LL.singleton('c')))),
      O.some(LL.cons('a', LL.cons('x', LL.singleton('c'))))
    )
  })

  it('modifyAt', () => {
    const toUpperCase = (s: string): string => s.toUpperCase()

    assert.deepStrictEqual(LL.modifyAt(0, toUpperCase, LL.nil), O.none)
    assert.deepStrictEqual(LL.modifyAt(0, toUpperCase, LL.singleton('a')), O.some(LL.singleton('A')))
    assert.deepStrictEqual(LL.modifyAt(2, toUpperCase, LL.singleton('a')), O.none)
    assert.deepStrictEqual(
      LL.modifyAt(1, toUpperCase, LL.cons('a', LL.cons('b', LL.singleton('c')))),
      O.some(LL.cons('a', LL.cons('B', LL.singleton('c'))))
    )
  })

  it('alterAt', () => {
    const toUpperCaseIfX = (s: string): O.Option<string> => (s === 'x' ? O.some(s.toUpperCase()) : O.none)

    assert.deepStrictEqual(LL.alterAt(0, toUpperCaseIfX, LL.nil), O.none)
    assert.deepStrictEqual(LL.alterAt(0, toUpperCaseIfX, LL.singleton('a')), O.some(LL.nil))
    assert.deepStrictEqual(LL.alterAt(0, toUpperCaseIfX, LL.singleton('x')), O.some(LL.singleton('X')))
    assert.deepStrictEqual(LL.alterAt(2, toUpperCaseIfX, LL.singleton('a')), O.none)
    assert.deepStrictEqual(
      LL.alterAt(1, toUpperCaseIfX, LL.cons('a', LL.cons('x', LL.singleton('c')))),
      O.some(LL.cons('a', LL.cons('X', LL.singleton('c'))))
    )
  })

  it('flatten', () => {
    assert.deepStrictEqual(
      LL.flatten(LL.cons(LL.singleton(1), LL.cons(LL.singleton(2), LL.singleton(LL.singleton(3))))),
      LL.cons(1, LL.cons(2, LL.singleton(3)))
    )
  })

  it('sort', () => {
    assert.deepStrictEqual(
      LL.sort(ordNumber)(LL.cons(2, LL.cons(3, LL.singleton(1)))),
      LL.cons(1, LL.cons(2, LL.singleton(3)))
    )
  })

  it('reverse', () => {
    assert.deepStrictEqual(LL.reverse(LL.cons(1, LL.cons(2, LL.singleton(3)))), LL.cons(3, LL.cons(2, LL.singleton(1))))
  })

  it('map', () => {
    assert.deepStrictEqual(pipe(LL.singleton('a'), LL.map(identity)), LL.singleton('a'))
    assert.deepStrictEqual(
      pipe(
        LL.cons('aaa', LL.singleton('a')),
        LL.map(s => s.length)
      ),
      LL.cons(3, LL.singleton(1))
    )
  })

  it('reduce', () => {
    assert.strictEqual(
      pipe(
        LL.cons('b', LL.singleton('a')),
        LL.reduce('', (b, a) => b + a)
      ),
      'ba'
    )
  })

  it('foldMap', () => {
    const foldMap = LL.foldMap(monoidString)
    assert.strictEqual(pipe(LL.cons('b', LL.singleton('a')), foldMap(identity)), 'ba')
  })

  it('toArray', () => {
    assert.deepStrictEqual(LL.toArray(LL.cons('b', LL.singleton('a'))), ['b', 'a'])
  })

  it('fromArray', () => {
    assert.deepStrictEqual(LL.fromArray([]), LL.nil)
    assert.deepStrictEqual(LL.fromArray(['a']), LL.singleton('a'))
    assert.deepStrictEqual(LL.fromArray(['a', 'b']), LL.cons('a', LL.singleton('b')))
  })

  it('reduceRight', () => {
    assert.strictEqual(
      pipe(
        LL.cons('b', LL.singleton('a')),
        LL.reduceRight('', (a, b) => a + b)
      ),
      'ba'
    )
  })

  it('traverse', () => {
    const tfanone: LL.LinkedList<number> = LL.cons(2, LL.singleton(1))
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const fasnone = LL.linkedList.traverse(O.option)(tfanone, f)
    assert.ok(O.isNone(fasnone))
    const tfa: LL.LinkedList<number> = LL.cons(3, LL.singleton(1))
    const fas = LL.linkedList.traverse(O.option)(tfa, f)
    assert.deepStrictEqual(fas, O.some(tfa))
  })

  it('sequence', () => {
    assert.deepStrictEqual(
      LL.linkedList.sequence(O.option)(LL.cons(O.some(1), LL.singleton(O.some(3)))),
      O.some(LL.cons(1, LL.singleton(3)))
    )
    assert.deepStrictEqual(LL.linkedList.sequence(O.option)(LL.cons(O.some(1), LL.singleton(O.none))), O.none)
  })

  it('filter', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.singleton(4)))),
        LL.filter(n => n % 2 === 0)
      ),
      LL.cons(2, LL.singleton(4))
    )
  })

  it('filterMap', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.singleton(4)))),
        LL.filterMap(n => (n % 2 === 0 ? O.some(n) : O.none))
      ),

      LL.cons(2, LL.singleton(4))
    )
  })

  it('partition', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons(1, LL.cons(2, LL.cons(3, LL.singleton(4)))),
        LL.partition(n => n % 2 === 0)
      ),
      {
        left: LL.cons(1, LL.singleton(3)),
        right: LL.cons(2, LL.singleton(4))
      }
    )
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(
      pipe(
        LL.cons('a', LL.cons('bb', LL.cons('ccc', LL.singleton('dddd')))),
        LL.partitionMap(s => (s.length % 2 === 0 ? E.left(s.length) : E.right('foo')))
      ),
      {
        left: LL.cons(2, LL.singleton(4)),
        right: LL.cons('foo', LL.singleton('foo'))
      }
    )
  })

  it('compact', () => {
    assert.deepStrictEqual(pipe(LL.cons(O.some(1), LL.singleton(O.some(2))), LL.compact), LL.cons(1, LL.singleton(2)))
  })

  it('separate', () => {
    assert.deepStrictEqual(pipe(LL.cons(E.left(6), LL.singleton(E.right('foo'))), LL.separate), {
      left: LL.singleton(6),
      right: LL.singleton('foo')
    })
  })
})
