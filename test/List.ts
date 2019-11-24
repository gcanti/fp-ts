import * as assert from 'assert'
import * as O from '../src/Option'
import * as L from '../src/List'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { pipe } from '../src/pipeable'
import * as E from '../src/Either'
import { ordNumber } from '../src/Ord'

describe('List', () => {
  it('URI', () => {
    assert.strictEqual(L.URI, 'List')
  })

  it('cons', () => {
    assert.deepStrictEqual(L.cons('a', L.nil), { type: 'Cons', head: 'a', tail: L.nil })
    assert.deepStrictEqual(L.cons('a', L.singleton('b')), {
      type: 'Cons',
      head: 'a',
      tail: { type: 'Cons', head: 'b', tail: L.nil }
    })
  })

  it('singleton', () => {
    assert.deepStrictEqual(L.singleton('a'), { type: 'Cons', head: 'a', tail: L.nil })
  })

  it('range', () => {
    assert.deepStrictEqual(L.range(1, 3), L.cons(1, L.cons(2, L.singleton(3))))
    assert.deepStrictEqual(L.range(3, 1), L.cons(3, L.cons(2, L.singleton(1))))
    assert.deepStrictEqual(L.range(2, 2), L.singleton(2))
  })

  it('length', () => {
    assert.strictEqual(L.length(L.nil), 0)
    assert.strictEqual(L.length(L.cons('a', L.singleton('b'))), 2)
  })

  it('isNil', () => {
    assert.strictEqual(L.isNil(L.nil), true)
    assert.strictEqual(L.isNil(L.singleton('a')), false)
  })

  it('isCons', () => {
    assert.strictEqual(L.isCons(L.nil), false)
    assert.strictEqual(L.isCons(L.singleton(1)), true)
  })

  it('snoc', () => {
    assert.deepStrictEqual(L.snoc(L.singleton('a'), 'b'), L.cons('a', L.singleton('b')))
  })

  it('insertBy', () => {
    assert.deepStrictEqual(L.insertBy(ordNumber.compare)(1)(L.nil), L.singleton(1))
    assert.deepStrictEqual(
      L.insertBy(ordNumber.compare)(2)(L.cons(1, L.singleton(3))),
      L.cons(1, L.cons(2, L.singleton(3)))
    )
  })

  it('insert', () => {
    assert.deepStrictEqual(L.insert(ordNumber)(1)(L.nil), L.singleton(1))
    assert.deepStrictEqual(L.insert(ordNumber)(2)(L.cons(1, L.singleton(3))), L.cons(1, L.cons(2, L.singleton(3))))
  })

  it('head', () => {
    assert.deepStrictEqual(L.head(L.nil), O.none)
    assert.deepStrictEqual(L.head(L.cons('x', L.singleton('a'))), O.some('x'))
  })

  it('last', () => {
    assert.deepStrictEqual(L.last(L.nil), O.none)
    assert.deepStrictEqual(L.last(L.cons('x', L.singleton('a'))), O.some('a'))
  })

  it('tail', () => {
    assert.deepStrictEqual(L.tail(L.nil), O.none)
    assert.deepStrictEqual(L.tail(L.singleton('a')), O.none)
    assert.deepStrictEqual(L.tail(L.cons('x', L.singleton('a'))), O.some(L.singleton('a')))
  })

  it('init', () => {
    assert.deepStrictEqual(L.init(L.nil), O.none)
    assert.deepStrictEqual(L.init(L.singleton('a')), O.some(L.nil))
    assert.deepStrictEqual(L.init(L.cons('x', L.singleton('a'))), O.some(L.singleton('x')))
  })

  it('uncons', () => {
    assert.deepStrictEqual(L.uncons(L.nil), O.none)
    assert.deepStrictEqual(L.uncons(L.singleton('a')), O.some({ head: 'a', tail: L.nil }))
  })

  it('unsnoc', () => {
    assert.deepStrictEqual(L.unsnoc(L.nil), O.none)
    assert.deepStrictEqual(
      L.unsnoc(L.cons('b', L.singleton('a'))),
      O.some({ init: { type: 'Cons', head: 'b', tail: L.nil }, last: 'a' })
    )
  })

  it('lookup', () => {
    assert.deepStrictEqual(L.lookup(0, L.nil), O.none)
    assert.deepStrictEqual(L.lookup(0, L.cons(1, L.singleton(2))), O.some(1))
    assert.deepStrictEqual(L.lookup(1, L.cons(1, L.singleton(2))), O.some(2))
    assert.deepStrictEqual(L.lookup(3, L.cons(1, L.singleton(2))), O.none)
  })

  it('findIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(L.findIndex(f, L.nil), O.none)
    assert.deepStrictEqual(L.findIndex(f, L.cons(1, L.singleton(2))), O.some(1))
    assert.deepStrictEqual(L.findIndex(f, L.cons(1, L.nil)), O.none)
  })

  it('findLastIndex', () => {
    const f = (a: number): boolean => a % 2 === 0
    assert.deepStrictEqual(L.findLastIndex(f, L.nil), O.none)
    assert.deepStrictEqual(L.findLastIndex(f, L.cons(1, L.cons(2, L.cons(3, L.singleton(4))))), O.some(3))
    assert.deepStrictEqual(L.findLastIndex(f, L.cons(1, L.nil)), O.none)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(L.insertAt(0, 'a', L.nil), O.some(L.singleton('a')))
    assert.deepStrictEqual(L.insertAt(1, 'a', L.nil), O.none)
    assert.deepStrictEqual(
      L.insertAt(1, 'b', L.cons('a', L.singleton('c'))),
      O.some(L.cons('a', L.cons('b', L.singleton('c'))))
    )
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(L.deleteAt(0, L.nil), O.none)
    assert.deepStrictEqual(L.deleteAt(2, L.singleton('a')), O.none)
    assert.deepStrictEqual(
      L.deleteAt(1, L.cons('a', L.cons('b', L.singleton('c')))),
      O.some(L.cons('a', L.singleton('c')))
    )
  })

  it('updateAt', () => {
    assert.deepStrictEqual(L.updateAt(0, 'a', L.nil), O.none)
    assert.deepStrictEqual(L.updateAt(0, 'x', L.singleton('a')), O.some(L.singleton('x')))
    assert.deepStrictEqual(L.updateAt(2, 'x', L.singleton('a')), O.none)
    assert.deepStrictEqual(
      L.updateAt(1, 'x', L.cons('a', L.cons('b', L.singleton('c')))),
      O.some(L.cons('a', L.cons('x', L.singleton('c'))))
    )
  })

  it('modifyAt', () => {
    const toUpperCase = (s: string): string => s.toUpperCase()

    assert.deepStrictEqual(L.modifyAt(0, toUpperCase, L.nil), O.none)
    assert.deepStrictEqual(L.modifyAt(0, toUpperCase, L.singleton('a')), O.some(L.singleton('A')))
    assert.deepStrictEqual(L.modifyAt(2, toUpperCase, L.singleton('a')), O.none)
    assert.deepStrictEqual(
      L.modifyAt(1, toUpperCase, L.cons('a', L.cons('b', L.singleton('c')))),
      O.some(L.cons('a', L.cons('B', L.singleton('c'))))
    )
  })

  it('alterAt', () => {
    const toUpperCaseIfX = (s: string): O.Option<string> => (s === 'x' ? O.some(s.toUpperCase()) : O.none)

    assert.deepStrictEqual(L.alterAt(0, toUpperCaseIfX, L.nil), O.none)
    assert.deepStrictEqual(L.alterAt(0, toUpperCaseIfX, L.singleton('a')), O.some(L.nil))
    assert.deepStrictEqual(L.alterAt(0, toUpperCaseIfX, L.singleton('x')), O.some(L.singleton('X')))
    assert.deepStrictEqual(L.alterAt(2, toUpperCaseIfX, L.singleton('a')), O.none)
    assert.deepStrictEqual(
      L.alterAt(1, toUpperCaseIfX, L.cons('a', L.cons('x', L.singleton('c')))),
      O.some(L.cons('a', L.cons('X', L.singleton('c'))))
    )
  })

  it('flatten', () => {
    assert.deepStrictEqual(
      L.flatten(L.cons(L.singleton(1), L.cons(L.singleton(2), L.singleton(L.singleton(3))))),
      L.cons(1, L.cons(2, L.singleton(3)))
    )
  })

  it('sort', () => {
    assert.deepStrictEqual(
      L.sort(ordNumber)(L.cons(2, L.cons(3, L.singleton(1)))),
      L.cons(1, L.cons(2, L.singleton(3)))
    )
  })

  it('takeLeft', () => {
    assert.deepStrictEqual(L.takeLeft(1)(L.nil), L.nil)
    assert.deepStrictEqual(L.takeLeft(1)(L.cons(1, L.singleton(2))), L.singleton(1))
    assert.deepStrictEqual(L.takeLeft(3)(L.cons(1, L.singleton(2))), L.cons(1, L.singleton(2)))
  })

  it('takeLeftWhile', () => {
    const isLTThree = (n: number) => n < 3
    assert.deepStrictEqual(L.takeLeftWhile(isLTThree)(L.nil), L.nil)
    assert.deepStrictEqual(L.takeLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.singleton(3)))), L.cons(1, L.singleton(2)))
  })

  it('takeRight', () => {
    assert.deepStrictEqual(L.takeRight(1)(L.nil), L.nil)
    assert.deepStrictEqual(L.takeRight(1)(L.cons(1, L.singleton(2))), L.singleton(2))
    assert.deepStrictEqual(L.takeRight(3)(L.cons(1, L.singleton(2))), L.cons(1, L.singleton(2)))
  })

  it('dropLeft', () => {
    assert.deepStrictEqual(L.dropLeft(1)(L.nil), L.nil)
    assert.deepStrictEqual(L.dropLeft(1)(L.cons(1, L.singleton(2))), L.singleton(2))
    assert.deepStrictEqual(L.dropLeft(3)(L.cons(1, L.singleton(2))), L.nil)
  })

  it('dropLeftWhile', () => {
    const isLTThree = (n: number) => n < 3
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.nil), L.nil)
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.cons(2, L.singleton(3)))), L.singleton(3))
    assert.deepStrictEqual(L.dropLeftWhile(isLTThree)(L.cons(1, L.singleton(2))), L.nil)
  })

  it('dropRight', () => {
    assert.deepStrictEqual(L.dropRight(1)(L.nil), L.nil)
    assert.deepStrictEqual(L.dropRight(1)(L.cons(1, L.singleton(2))), L.singleton(1))
    assert.deepStrictEqual(L.dropRight(3)(L.cons(1, L.singleton(2))), L.nil)
  })

  it('reverse', () => {
    assert.deepStrictEqual(L.reverse(L.cons(1, L.cons(2, L.singleton(3)))), L.cons(3, L.cons(2, L.singleton(1))))
  })

  it('map', () => {
    assert.deepStrictEqual(pipe(L.singleton('a'), L.map(identity)), L.singleton('a'))
    assert.deepStrictEqual(
      pipe(
        L.cons('aaa', L.singleton('a')),
        L.map(s => s.length)
      ),
      L.cons(3, L.singleton(1))
    )
  })

  it('reduce', () => {
    assert.strictEqual(
      pipe(
        L.cons('b', L.singleton('a')),
        L.reduce('', (b, a) => b + a)
      ),
      'ba'
    )
  })

  it('foldMap', () => {
    const foldMap = L.foldMap(monoidString)
    assert.strictEqual(pipe(L.cons('b', L.singleton('a')), foldMap(identity)), 'ba')
  })

  it('toArray', () => {
    assert.deepStrictEqual(L.toArray(L.cons('b', L.singleton('a'))), ['b', 'a'])
  })

  it('fromArray', () => {
    assert.deepStrictEqual(L.fromArray([]), L.nil)
    assert.deepStrictEqual(L.fromArray(['a']), L.singleton('a'))
    assert.deepStrictEqual(L.fromArray(['a', 'b']), L.cons('a', L.singleton('b')))
  })

  it('reduceRight', () => {
    assert.strictEqual(
      pipe(
        L.cons('b', L.singleton('a')),
        L.reduceRight('', (a, b) => a + b)
      ),
      'ba'
    )
  })

  it('traverse', () => {
    const tfanone: L.List<number> = L.cons(2, L.singleton(1))
    const f = (n: number): O.Option<number> => (n % 2 === 0 ? O.none : O.some(n))
    const fasnone = L.list.traverse(O.option)(tfanone, f)
    assert.ok(O.isNone(fasnone))
    const tfa: L.List<number> = L.cons(3, L.singleton(1))
    const fas = L.list.traverse(O.option)(tfa, f)
    assert.deepStrictEqual(fas, O.some(tfa))
  })

  it('sequence', () => {
    assert.deepStrictEqual(
      L.list.sequence(O.option)(L.cons(O.some(1), L.singleton(O.some(3)))),
      O.some(L.cons(1, L.singleton(3)))
    )
    assert.deepStrictEqual(L.list.sequence(O.option)(L.cons(O.some(1), L.singleton(O.none))), O.none)
  })

  it('filter', () => {
    assert.deepStrictEqual(
      pipe(
        L.cons(1, L.cons(2, L.cons(3, L.singleton(4)))),
        L.filter(n => n % 2 === 0)
      ),
      L.cons(2, L.singleton(4))
    )
  })

  it('filterMap', () => {
    assert.deepStrictEqual(
      pipe(
        L.cons(1, L.cons(2, L.cons(3, L.singleton(4)))),
        L.filterMap(n => (n % 2 === 0 ? O.some(n) : O.none))
      ),

      L.cons(2, L.singleton(4))
    )
  })

  it('partition', () => {
    assert.deepStrictEqual(
      pipe(
        L.cons(1, L.cons(2, L.cons(3, L.singleton(4)))),
        L.partition(n => n % 2 === 0)
      ),
      {
        left: L.cons(1, L.singleton(3)),
        right: L.cons(2, L.singleton(4))
      }
    )
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(
      pipe(
        L.cons('a', L.cons('bb', L.cons('ccc', L.singleton('dddd')))),
        L.partitionMap(s => (s.length % 2 === 0 ? E.left(s.length) : E.right('foo')))
      ),
      {
        left: L.cons(2, L.singleton(4)),
        right: L.cons('foo', L.singleton('foo'))
      }
    )
  })

  it('compact', () => {
    assert.deepStrictEqual(pipe(L.cons(O.some(1), L.singleton(O.some(2))), L.compact), L.cons(1, L.singleton(2)))
  })

  it('separate', () => {
    assert.deepStrictEqual(pipe(L.cons(E.left(6), L.singleton(E.right('foo'))), L.separate), {
      left: L.singleton(6),
      right: L.singleton('foo')
    })
  })
})
