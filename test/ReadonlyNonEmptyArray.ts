import * as assert from 'assert'
import * as C from '../src/Const'
import { eqNumber } from '../src/Eq'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import * as M from '../src/Monoid'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as _ from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/Semigroup'
import { showString } from '../src/Show'

describe('ReadonlyNonEmptyArray', () => {
  it('head', () => {
    assert.deepStrictEqual(_.head([1, 2]), 1)
  })

  it('tail', () => {
    assert.deepStrictEqual(_.tail([1, 2]), [2])
  })

  it('map', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(_.readonlyNonEmptyArray.map([1, 2], double), [2, 4])
  })

  it('mapWithIndex', () => {
    const add = (i: number, n: number) => n + i
    assert.deepStrictEqual(_.readonlyNonEmptyArray.mapWithIndex([1, 2], add), [1, 3])
  })

  it('of', () => {
    assert.deepStrictEqual(_.readonlyNonEmptyArray.of(1), [1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(_.readonlyNonEmptyArray.ap([double, double], [1, 2]), [2, 4, 2, 4])
  })

  it('chain', () => {
    const f = (a: number): _.ReadonlyNonEmptyArray<number> => [a, 4]
    assert.deepStrictEqual(_.readonlyNonEmptyArray.chain([1, 2], f), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = M.fold(M.monoidSum)
    assert.deepStrictEqual(_.readonlyNonEmptyArray.extend([1, 2, 3, 4], sum), [10, 9, 7, 4])
  })

  it('extract', () => {
    assert.deepStrictEqual(_.readonlyNonEmptyArray.extract([1, 2, 3]), 1)
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.traverse(O.option)([1, 2, 3], n => (n >= 0 ? O.some(n) : O.none)),
      O.some([1, 2, 3])
    )
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.traverse(O.option)([1, 2, 3], n => (n >= 2 ? O.some(n) : O.none)),
      O.none
    )
  })

  it('sequence', () => {
    const sequence = _.readonlyNonEmptyArray.sequence(O.option)
    assert.deepStrictEqual(sequence([O.some(1), O.some(2), O.some(3)]), O.some([1, 2, 3]))
    assert.deepStrictEqual(sequence([O.none, O.some(2), O.some(3)]), O.none)
  })

  it('min', () => {
    assert.deepStrictEqual(_.min(Ord.ordNumber)([2, 1, 3]), 1)
    assert.deepStrictEqual(_.min(Ord.ordNumber)([3]), 3)
  })

  it('max', () => {
    assert.deepStrictEqual(_.max(Ord.ordNumber)([1, 2, 3]), 3)
    assert.deepStrictEqual(_.max(Ord.ordNumber)([1]), 1)
  })

  it('reduce', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.reduce(['a', 'b'], '', (b, a) => b + a),
      'ab'
    )
  })

  it('foldMap', () => {
    const foldMap = _.readonlyNonEmptyArray.foldMap(M.monoidString)
    assert.deepStrictEqual(foldMap(['a', 'b', 'c'], identity), 'abc')
  })

  it('reduceRight', () => {
    const reduceRight = _.readonlyNonEmptyArray.reduceRight
    const init1 = ''
    const f = (a: string, acc: string) => acc + a
    assert.deepStrictEqual(reduceRight(['a', 'b', 'c'], init1, f), 'cba')
  })

  it('fromReadonlyArray', () => {
    assert.deepStrictEqual(_.fromReadonlyArray([]), O.none)
    assert.deepStrictEqual(_.fromReadonlyArray([1]), O.some([1]))
    assert.deepStrictEqual(_.fromReadonlyArray([1, 2]), O.some([1, 2]))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup<number>()
    assert.deepStrictEqual(S.concat([1], [2]), [1, 2])
    assert.deepStrictEqual(S.concat([1, 2], [3, 4]), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    assert.deepStrictEqual(S.equals([1], [1]), true)
    assert.deepStrictEqual(S.equals([1], [1, 2]), false)
  })

  it('group', () => {
    assert.deepStrictEqual(_.group(Ord.ordNumber)([]), [])

    assert.deepStrictEqual(_.group(Ord.ordNumber)([1, 2, 1, 1]), [[1], [2], [1, 1]])

    assert.deepStrictEqual(_.group(Ord.ordNumber)([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it('groupSort', () => {
    assert.deepStrictEqual(_.groupSort(Ord.ordNumber)([]), [])
    assert.deepStrictEqual(_.groupSort(Ord.ordNumber)([1, 2, 1, 1]), [[1, 1, 1], [2]])
  })

  it('last', () => {
    assert.deepStrictEqual(_.last([1, 2, 3]), 3)
    assert.deepStrictEqual(_.last([1]), 1)
  })

  it('init', () => {
    assert.deepStrictEqual(_.init([1, 2, 3]), [1, 2])
    assert.deepStrictEqual(_.init([1]), [])
  })

  it('sort', () => {
    assert.deepStrictEqual(_.sort(Ord.ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('reverse', () => {
    assert.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('groupBy', () => {
    assert.deepStrictEqual(_.groupBy(_ => '')([]), {})
    assert.deepStrictEqual(_.groupBy(String)([1]), { '1': [1] })
    assert.deepStrictEqual(_.groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
      '3': ['foo', 'bar'],
      '6': ['foobar']
    })
  })

  it('insertAt', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    const a4 = make(3)
    assert.deepStrictEqual(_.insertAt(0, a4)([a1, a2, a3]), O.some([a4, a1, a2, a3]))
    assert.deepStrictEqual(_.insertAt(-1, a4)([a1, a2, a3]), O.none)
    assert.deepStrictEqual(_.insertAt(3, a4)([a1, a2, a3]), O.some([a1, a2, a3, a4]))
    assert.deepStrictEqual(_.insertAt(1, a4)([a1, a2, a3]), O.some([a1, a4, a2, a3]))
    assert.deepStrictEqual(_.insertAt(4, a4)([a1, a2, a3]), O.none)
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr: _.ReadonlyNonEmptyArray<{ readonly x: number }> = [a1, a2, a3]
    assert.deepStrictEqual(_.updateAt(0, a4)(arr), O.some([a4, a2, a3]))
    assert.deepStrictEqual(_.updateAt(-1, a4)(arr), O.none)
    assert.deepStrictEqual(_.updateAt(3, a4)(arr), O.none)
    assert.deepStrictEqual(_.updateAt(1, a4)(arr), O.some([a1, a4, a3]))
    // should return the same reference if nothing changed
    const r1 = _.updateAt(0, a1)(arr)
    if (O.isSome(r1)) {
      assert.deepStrictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = _.updateAt(2, a3)(arr)
    if (O.isSome(r2)) {
      assert.deepStrictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('modifyAt', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(_.modifyAt(1, double)(_.cons(1, [])), O.none)
    assert.deepStrictEqual(_.modifyAt(1, double)(_.cons(1, [2])), O.some(_.cons(1, [4])))
  })

  it('filter', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    assert.deepStrictEqual(_.filter(({ x }) => x !== 1)([a1, a2, a3]), O.some([a3]))
    assert.deepStrictEqual(_.filter(({ x }) => x !== 2)([a1, a2, a3]), O.some([a1, a2]))
    assert.deepStrictEqual(
      _.filter(({ x }) => {
        return !(x === 1 || x === 2)
      })([a1, a2, a3]),
      O.none
    )
    assert.deepStrictEqual(_.filter(({ x }) => x !== 10)([a1, a2, a3]), O.some([a1, a2, a3]))

    // refinements
    const actual1 = _.filter(O.isSome)([O.some(3), O.some(2), O.some(1)])
    assert.deepStrictEqual(actual1, O.some([O.some(3), O.some(2), O.some(1)]))
    const actual2 = _.filter(O.isSome)([O.some(3), O.none, O.some(1)])
    assert.deepStrictEqual(actual2, O.some([O.some(3), O.some(1)]))
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(_.filterWithIndex(i => i % 2 === 0)([1, 2, 3]), O.some([1, 3]))
    assert.deepStrictEqual(_.filterWithIndex((i, a: number) => i % 2 === 1 && a > 2)([1, 2, 3]), O.none)
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.reduceWithIndex(['a', 'b'], '', (i, b, a) => b + i + a),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.foldMapWithIndex(M.monoidString)(['a', 'b'], (i, a) => i + a),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.reduceRightWithIndex(['a', 'b'], '', (i, a, b) => b + i + a),
      '1b0a'
    )
  })

  it('traverseWithIndex', () => {
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.traverseWithIndex(O.option)(['a', 'bb'], (i, s) =>
        s.length >= 1 ? O.some(s + i) : O.none
      ),
      O.some(['a0', 'bb1'])
    )
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.traverseWithIndex(O.option)(['a', 'bb'], (i, s) =>
        s.length > 1 ? O.some(s + i) : O.none
      ),
      O.none
    )

    // FoldableWithIndex compatibility
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.foldMapWithIndex(M.monoidString)(['a', 'bb'], f),
      _.readonlyNonEmptyArray.traverseWithIndex(C.getApplicative(M.monoidString))(['a', 'bb'], (i, a) =>
        C.make(f(i, a))
      )
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.mapWithIndex(['a', 'bb'], f),
      _.readonlyNonEmptyArray.traverseWithIndex(I.identity)(['a', 'bb'], (i, a) => I.identity.of(f(i, a)))
    )
  })

  it('cons', () => {
    assert.deepStrictEqual(_.cons(1, [2, 3, 4]), [1, 2, 3, 4])
  })

  it('snoc', () => {
    assert.deepStrictEqual(_.snoc([1, 2, 3], 4), [1, 2, 3, 4])
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show(['a']), `["a"]`)
    assert.deepStrictEqual(S.show(['a', 'b', 'c']), `["a", "b", "c"]`)
  })

  it('alt / concat', () => {
    assert.deepStrictEqual(_.concat(['a'], []), ['a'])
    assert.deepStrictEqual(
      _.readonlyNonEmptyArray.alt(['a'], () => ['b']),
      ['a', 'b']
    )
  })

  it('foldMap', () => {
    const f = _.foldMap(S.semigroupSum)((s: string) => s.length)
    assert.deepStrictEqual(f(['a']), 1)
    assert.deepStrictEqual(f(['a', 'bb']), 3)
  })

  it('foldMapWithIndex', () => {
    const f = _.foldMapWithIndex(S.semigroupSum)((i: number, s: string) => s.length + i)
    assert.deepStrictEqual(f(['a']), 1)
    assert.deepStrictEqual(f(['a', 'bb']), 4)
  })

  it('fromArray', () => {
    assert.strictEqual(_.fromArray([]), O.none)
    // tslint:disable-next-line: readonly-array
    const as = [1, 2, 3]
    const bs = _.fromArray(as)
    assert.deepStrictEqual(bs, O.some(as))
    assert.notStrictEqual((bs as any).value, as)
  })

  it('fromReadonlyArray', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    const bs = _.fromReadonlyArray(as)
    assert.deepStrictEqual(bs, O.some(as))
    assert.strictEqual((bs as any).value, as)
  })

  it('fold', () => {
    const f = _.fold(S.semigroupString)
    assert.deepStrictEqual(f(['a']), 'a')
    assert.deepStrictEqual(f(['a', 'bb']), 'abb')
  })
})
