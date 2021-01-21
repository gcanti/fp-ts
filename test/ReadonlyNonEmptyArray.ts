import * as assert from 'assert'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as M from '../src/Monoid'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as _ from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/Semigroup'
import { showString } from '../src/Show'
import { deepStrictEqual } from './util'

describe('ReadonlyNonEmptyArray', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.traverse(O.Applicative)((n) => (n >= 0 ? O.some(n) : O.none))
        ),
        O.some([1, 2, 3] as const)
      )
      deepStrictEqual(
        pipe(
          [1, 2, 3],
          _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none))
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      deepStrictEqual(sequence([O.some(1), O.some(2), O.some(3)]), O.some([1, 2, 3] as const))
      deepStrictEqual(sequence([O.none, O.some(2), O.some(3)]), O.none)
    })

    it('traverseWithIndex', () => {
      deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
        ),
        O.some(['a0', 'bb1'] as const)
      )
      deepStrictEqual(
        pipe(
          ['a', 'bb'],
          _.traverseWithIndex(O.Applicative)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
        ),
        O.none
      )
    })
  })

  it('head', () => {
    deepStrictEqual(_.head([1, 2]), 1)
  })

  it('tail', () => {
    deepStrictEqual(_.tail([1, 2]), [2])
  })

  it('map', () => {
    deepStrictEqual(
      pipe(
        [1, 2],
        _.map((n) => n * 2)
      ),
      [2, 4]
    )
  })

  it('mapWithIndex', () => {
    const add = (i: number, n: number) => n + i
    deepStrictEqual(pipe([1, 2], _.mapWithIndex(add)), [1, 3])
  })

  it('of', () => {
    deepStrictEqual(_.of(1), [1])
  })

  it('ap', () => {
    const double = (n: number) => n * 2
    const fab: _.ReadonlyNonEmptyArray<(n: number) => number> = [double, double]
    deepStrictEqual(pipe(fab, _.ap([1, 2])), [2, 4, 2, 4])
  })

  it('chain', () => {
    const f = (a: number): _.ReadonlyNonEmptyArray<number> => [a, 4]
    deepStrictEqual(pipe([1, 2], _.chain(f)), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = M.fold(M.monoidSum)
    deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
  })

  it('extract', () => {
    deepStrictEqual(_.extract([1, 2, 3]), 1)
  })

  it('min', () => {
    deepStrictEqual(_.min(Ord.ordNumber)([2, 1, 3]), 1)
    deepStrictEqual(_.min(Ord.ordNumber)([3]), 3)
  })

  it('max', () => {
    deepStrictEqual(_.max(Ord.ordNumber)([1, 2, 3]), 3)
    deepStrictEqual(_.max(Ord.ordNumber)([1]), 1)
  })

  it('reduce', () => {
    deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    deepStrictEqual(pipe(['a', 'b', 'c'], _.foldMap(M.monoidString)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    deepStrictEqual(pipe(['a', 'b', 'c'], _.reduceRight('', f)), 'cba')
  })

  it('fromReadonlyArray', () => {
    deepStrictEqual(_.fromReadonlyArray([]), O.none)
    deepStrictEqual(_.fromReadonlyArray([1]), O.some([1] as const))
    deepStrictEqual(_.fromReadonlyArray([1, 2]), O.some([1, 2] as const))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup<number>()
    deepStrictEqual(pipe([1], S.concat([2])), [1, 2])
    deepStrictEqual(pipe([1, 2], S.concat([3, 4])), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const S = _.getEq(eqNumber)
    deepStrictEqual(S.equals([1])([1]), true)
    deepStrictEqual(S.equals([1])([1, 2]), false)
  })

  it('group', () => {
    deepStrictEqual(_.group(Ord.ordNumber)([]), [])

    deepStrictEqual(_.group(Ord.ordNumber)([1, 2, 1, 1]), [[1], [2], [1, 1]])

    deepStrictEqual(_.group(Ord.ordNumber)([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it('groupSort', () => {
    deepStrictEqual(_.groupSort(Ord.ordNumber)([]), [])
    deepStrictEqual(_.groupSort(Ord.ordNumber)([1, 2, 1, 1]), [[1, 1, 1], [2]])
  })

  it('last', () => {
    deepStrictEqual(_.last([1, 2, 3]), 3)
    deepStrictEqual(_.last([1]), 1)
  })

  it('init', () => {
    deepStrictEqual(_.init([1, 2, 3]), [1, 2])
    deepStrictEqual(_.init([1]), [])
  })

  it('sort', () => {
    deepStrictEqual(_.sort(Ord.ordNumber)([3, 2, 1]), [1, 2, 3])
  })

  it('prependToAll', () => {
    deepStrictEqual(_.prependToAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    deepStrictEqual(_.prependToAll(0)([1]), [0, 1])
    deepStrictEqual(_.prependToAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    deepStrictEqual(_.intersperse(0)([1]), [1])
    deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('reverse', () => {
    deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('groupBy', () => {
    deepStrictEqual(_.groupBy((_) => '')([]), {})
    deepStrictEqual(_.groupBy(String)([1]), { '1': [1] })
    deepStrictEqual(_.groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
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
    deepStrictEqual(_.insertAt(0, a4)([a1, a2, a3]), O.some([a4, a1, a2, a3] as const))
    deepStrictEqual(_.insertAt(-1, a4)([a1, a2, a3]), O.none)
    deepStrictEqual(_.insertAt(3, a4)([a1, a2, a3]), O.some([a1, a2, a3, a4] as const))
    deepStrictEqual(_.insertAt(1, a4)([a1, a2, a3]), O.some([a1, a4, a2, a3] as const))
    deepStrictEqual(_.insertAt(4, a4)([a1, a2, a3]), O.none)
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr: _.ReadonlyNonEmptyArray<{ readonly x: number }> = [a1, a2, a3]
    deepStrictEqual(_.updateAt(0, a4)(arr), O.some([a4, a2, a3] as const))
    deepStrictEqual(_.updateAt(-1, a4)(arr), O.none)
    deepStrictEqual(_.updateAt(3, a4)(arr), O.none)
    deepStrictEqual(_.updateAt(1, a4)(arr), O.some([a1, a4, a3] as const))
    // should return the same reference if nothing changed
    const r1 = _.updateAt(0, a1)(arr)
    if (O.isSome(r1)) {
      assert.strictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = _.updateAt(2, a3)(arr)
    if (O.isSome(r2)) {
      assert.strictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('modifyAt', () => {
    const double = (n: number): number => n * 2
    deepStrictEqual(_.modifyAt(1, double)([1]), O.none)
    deepStrictEqual(_.modifyAt(1, double)([1, 2]), O.some([1, 4] as const))
  })

  it('filter', () => {
    const make = (x: number) => ({ x })
    const a1 = make(1)
    const a2 = make(1)
    const a3 = make(2)
    deepStrictEqual(_.filter(({ x }) => x !== 1)([a1, a2, a3]), O.some([a3] as const))
    deepStrictEqual(_.filter(({ x }) => x !== 2)([a1, a2, a3]), O.some([a1, a2] as const))
    deepStrictEqual(
      _.filter(({ x }) => {
        return !(x === 1 || x === 2)
      })([a1, a2, a3]),
      O.none
    )
    deepStrictEqual(_.filter(({ x }) => x !== 10)([a1, a2, a3]), O.some([a1, a2, a3] as const))

    // refinements
    const actual1 = _.filter(O.isSome)([O.some(3), O.some(2), O.some(1)])
    deepStrictEqual(actual1, O.some([O.some(3), O.some(2), O.some(1)] as const))
    const actual2 = _.filter(O.isSome)([O.some(3), O.none, O.some(1)])
    deepStrictEqual(actual2, O.some([O.some(3), O.some(1)] as const))
  })

  it('filterWithIndex', () => {
    deepStrictEqual(_.filterWithIndex((i) => i % 2 === 0)([1, 2, 3]), O.some([1, 3] as const))
    deepStrictEqual(_.filterWithIndex((i, a: number) => i % 2 === 1 && a > 2)([1, 2, 3]), O.none)
  })

  it('reduceWithIndex', () => {
    deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceWithIndex('', (i, b, a) => b + i + a)
      ),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.foldMapWithIndex(M.monoidString)((i, a) => i + a)
      ),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceRightWithIndex('', (i, a, b) => b + i + a)
      ),
      '1b0a'
    )
  })

  it('cons', () => {
    deepStrictEqual(_.cons(1)([2, 3, 4]), [1, 2, 3, 4])
  })

  it('snoc', () => {
    deepStrictEqual(pipe([1, 2, 3], _.snoc(4)), [1, 2, 3, 4])
  })

  it('uncons', () => {
    deepStrictEqual(_.uncons([0]), [0, []])
    deepStrictEqual(_.uncons([1, 2, 3, 4]), [1, [2, 3, 4]])
  })

  it('unsnoc', () => {
    deepStrictEqual(_.unsnoc([0]), [[], 0])
    deepStrictEqual(_.unsnoc([1, 2, 3, 4]), [[1, 2, 3], 4])
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    deepStrictEqual(S.show(['a']), `["a"]`)
    deepStrictEqual(S.show(['a', 'b', 'c']), `["a", "b", "c"]`)
  })

  it('alt / concat', () => {
    deepStrictEqual(_.concat(['a'], []), ['a'])
    deepStrictEqual(
      pipe(
        ['a'],
        _.alt(() => ['b'])
      ),
      ['a', 'b']
    )
  })

  it('foldMap', () => {
    const f = _.foldMap(S.semigroupSum)((s: string) => s.length)
    deepStrictEqual(f(['a']), 1)
    deepStrictEqual(f(['a', 'bb']), 3)
  })

  it('foldMapWithIndex', () => {
    const f = _.foldMapWithIndex(S.semigroupSum)((i: number, s: string) => s.length + i)
    deepStrictEqual(f(['a']), 1)
    deepStrictEqual(f(['a', 'bb']), 4)
  })

  it('fromReadonlyArray', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    const bs = _.fromReadonlyArray(as)
    deepStrictEqual(bs, O.some(as))
    assert.strictEqual((bs as any).value, as)
  })

  it('fold', () => {
    const f = _.fold(S.semigroupString)
    deepStrictEqual(f(['a']), 'a')
    deepStrictEqual(f(['a', 'bb']), 'abb')
  })

  it('do notation', () => {
    deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      [{ a: 1, b: 'b' }]
    )
  })

  it('apS', () => {
    deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), [{ a: 1, b: 'b' }])
  })

  it('apT', () => {
    deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b'))), [[1, 'b']])
  })
})
