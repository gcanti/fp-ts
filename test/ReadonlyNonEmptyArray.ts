import * as assert from 'assert'
import * as B from '../src/boolean'
import type { Endomorphism } from '../src/Endomorphism'
import * as Eq from '../src/Eq'
import { identity, pipe } from '../src/Function'
import * as M from '../src/Monoid'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import { tuple } from '../src/tuple'
import * as U from './util'

describe('ReadonlyNonEmptyArray', () => {
  it('traverseWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'bb'] as _.ReadonlyNonEmptyArray<string>,
        _.traverseWithIndex(O.Apply)((i, s) => (s.length >= 1 ? O.some(s + i) : O.none))
      ),
      O.some(['a0', 'bb1'] as const)
    )
    U.deepStrictEqual(
      pipe(
        ['a', 'bb'] as _.ReadonlyNonEmptyArray<string>,
        _.traverseWithIndex(O.Apply)((i, s) => (s.length > 1 ? O.some(s + i) : O.none))
      ),
      O.none
    )
  })

  it('traverse', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3] as _.ReadonlyNonEmptyArray<number>,
        _.traverse(O.Apply)((n) => (n >= 0 ? O.some(n) : O.none))
      ),
      O.some([1, 2, 3] as const)
    )
    U.deepStrictEqual(
      pipe(
        [1, 2, 3] as _.ReadonlyNonEmptyArray<number>,
        _.traverse(O.Apply)((n) => (n >= 2 ? O.some(n) : O.none))
      ),
      O.none
    )
  })

  it('sequence', () => {
    U.deepStrictEqual(pipe([O.some(1), O.some(2), O.some(3)] as const, _.sequence(O.Apply)), O.some([1, 2, 3] as const))
    U.deepStrictEqual(pipe([O.some(1), O.none, O.some(3)] as const, _.sequence(O.Apply)), O.none)
  })

  it('head', () => {
    U.deepStrictEqual(_.head([1, 2]), 1)
  })

  it('tail', () => {
    U.deepStrictEqual(_.tail([1, 2]), [2])
  })

  it('map', () => {
    U.deepStrictEqual(pipe([1, 2], _.map(U.double)), [2, 4])
  })

  it('mapWithIndex', () => {
    const add = (i: number, n: number) => n + i
    U.deepStrictEqual(pipe([1, 2], _.mapWithIndex(add)), [1, 3])
  })

  it('of', () => {
    U.deepStrictEqual(_.of(1), [1])
  })

  it('ap', () => {
    const fab: _.ReadonlyNonEmptyArray<(n: number) => number> = [U.double, U.double]
    U.deepStrictEqual(pipe(fab, _.ap([1, 2])), [2, 4, 2, 4])
  })

  it('flatMap', () => {
    const f = (a: number): _.ReadonlyNonEmptyArray<number> => [a, 4]
    U.deepStrictEqual(pipe([1, 2], _.flatMap(f)), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = M.combineAll(N.MonoidSum)
    U.deepStrictEqual(pipe([1, 2, 3, 4], _.extend(sum)), [10, 9, 7, 4])
  })

  it('extract', () => {
    U.deepStrictEqual(_.extract([1, 2, 3]), 1)
  })

  it('min', () => {
    U.deepStrictEqual(_.min(N.Ord)([2, 1, 3]), 1)
    U.deepStrictEqual(_.min(N.Ord)([3]), 3)
  })

  it('max', () => {
    U.deepStrictEqual(_.max(N.Ord)([1, 2, 3]), 3)
    U.deepStrictEqual(_.max(N.Ord)([1]), 1)
  })

  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduce('', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(['a', 'b', 'c'] as _.ReadonlyNonEmptyArray<string>, _.foldMap(S.Monoid)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.reduceRight('', f)), 'cba')
  })

  it('fromReadonlyArray', () => {
    U.deepStrictEqual(_.fromReadonlyArray([]), O.none)
    U.deepStrictEqual(_.fromReadonlyArray([1]), O.some([1] as const))
    U.deepStrictEqual(_.fromReadonlyArray([1, 2]), O.some([1, 2] as const))
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup<number>()
    U.deepStrictEqual(pipe([1], S.combine([2])), [1, 2])
    U.deepStrictEqual(pipe([1, 2], S.combine([3, 4])), [1, 2, 3, 4])
  })

  it('getEq', () => {
    const S = _.getEq(N.Eq)
    U.deepStrictEqual(S.equals([1])([1]), true)
    U.deepStrictEqual(S.equals([1])([1, 2]), false)
  })

  it('group', () => {
    const group = _.group(N.Eq)
    U.deepStrictEqual(group([1]), [[1]])
    U.deepStrictEqual(group([1, 2, 1, 1]), [[1], [2], [1, 1]])
    U.deepStrictEqual(group([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it('last', () => {
    U.deepStrictEqual(_.last([1, 2, 3]), 3)
    U.deepStrictEqual(_.last([1]), 1)
  })

  it('init', () => {
    U.deepStrictEqual(_.init([1, 2, 3]), [1, 2])
    U.deepStrictEqual(_.init([1]), [])
  })

  it('sort', () => {
    const sort = _.sort(N.Ord)
    U.deepStrictEqual(sort([3, 2, 1]), [1, 2, 3])
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    U.strictEqual(sort(singleton), singleton)
  })

  it('prependAll', () => {
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3]), [0, 1, 0, 2, 0, 3])
    U.deepStrictEqual(_.prependAll(0)([1]), [0, 1])
    U.deepStrictEqual(_.prependAll(0)([1, 2, 3, 4]), [0, 1, 0, 2, 0, 3, 0, 4])
  })

  it('intersperse', () => {
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3]), [1, 0, 2, 0, 3])
    U.deepStrictEqual(_.intersperse(0)([1]), [1])
    U.deepStrictEqual(_.intersperse(0)([1, 2]), [1, 0, 2])
    U.deepStrictEqual(_.intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
  })

  it('intercalate', () => {
    U.deepStrictEqual(_.intercalate(S.Semigroup)('-')(['a']), 'a')
    U.deepStrictEqual(_.intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
    U.deepStrictEqual(_.intercalate(S.Semigroup)('-')(['a', '', 'c']), 'a--c')
    U.deepStrictEqual(_.intercalate(S.Semigroup)('-')(['a', 'b']), 'a-b')
    U.deepStrictEqual(_.intercalate(S.Semigroup)('-')(['a', 'b', 'c', 'd']), 'a-b-c-d')
  })

  it('reverse', () => {
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    U.strictEqual(_.reverse(singleton), singleton)
    U.deepStrictEqual(_.reverse([1, 2, 3]), [3, 2, 1])
  })

  it('groupBy', () => {
    U.deepStrictEqual(_.groupBy((_) => '')([]), {})
    U.deepStrictEqual(_.groupBy(String)([1]), { '1': [1] })
    U.deepStrictEqual(_.groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
      '3': ['foo', 'bar'],
      '6': ['foobar']
    })
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr: _.ReadonlyNonEmptyArray<{ readonly x: number }> = [a1, a2, a3]
    U.deepStrictEqual(_.updateAt(0, a4)(arr), O.some([a4, a2, a3] as const))
    U.deepStrictEqual(_.updateAt(-1, a4)(arr), O.none)
    U.deepStrictEqual(_.updateAt(3, a4)(arr), O.none)
    U.deepStrictEqual(_.updateAt(1, a4)(arr), O.some([a1, a4, a3] as const))
    // should return the same reference if nothing changed
    const r1 = _.updateAt(0, a1)(arr)
    if (O.isSome(r1)) {
      U.strictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = _.updateAt(2, a3)(arr)
    if (O.isSome(r2)) {
      U.strictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('modifyAt', () => {
    U.deepStrictEqual(_.modifyAt(1, U.double)([1]), O.none)
    U.deepStrictEqual(_.modifyAt(1, U.double)([1, 2]), O.some([1, 4] as const))
    // should return the same reference if nothing changed
    const input: _.ReadonlyNonEmptyArray<number> = [1, 2, 3]
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt(1, identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('reduceWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceWithIndex('', (i, b, a) => b + i + a)
      ),
      '0a1b'
    )
  })

  it('foldMapWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'] as _.ReadonlyNonEmptyArray<string>,
        _.foldMapWithIndex(S.Monoid)((i, a) => i + a)
      ),
      '0a1b'
    )
  })

  it('reduceRightWithIndex', () => {
    U.deepStrictEqual(
      pipe(
        ['a', 'b'],
        _.reduceRightWithIndex('', (i, a, b) => b + i + a)
      ),
      '1b0a'
    )
  })

  it('prepend', () => {
    U.deepStrictEqual(_.prepend(1)([2, 3, 4]), [1, 2, 3, 4])
  })

  it('append', () => {
    U.deepStrictEqual(pipe([1, 2, 3], _.append(4)), [1, 2, 3, 4])
  })

  it('unprepend', () => {
    U.deepStrictEqual(_.unprepend([0]), [0, []])
    U.deepStrictEqual(_.unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
  })

  it('unappend', () => {
    U.deepStrictEqual(_.unappend([0]), [[], 0])
    U.deepStrictEqual(_.unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show(['a']), `["a"]`)
    U.deepStrictEqual(Sh.show(['a', 'b', 'c']), `["a", "b", "c"]`)
  })

  it('orElse', () => {
    U.deepStrictEqual(pipe(['a'] as const, _.orElse(['b'])), ['a', 'b'])
  })

  it('foldMap', () => {
    const f = _.foldMap(N.SemigroupSum)((s: string) => s.length)
    U.deepStrictEqual(f(['a']), 1)
    U.deepStrictEqual(f(['a', 'bb']), 3)
  })

  it('foldMapWithIndex', () => {
    const f = _.foldMapWithIndex(N.SemigroupSum)((i: number, s: string) => s.length + i)
    U.deepStrictEqual(f(['a']), 1)
    U.deepStrictEqual(f(['a', 'bb']), 4)
  })

  it('fromReadonlyArray', () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    const bs = _.fromReadonlyArray(as)
    U.deepStrictEqual(bs, O.some(as))
    U.strictEqual((bs as any).value, as)
  })

  it('combineAll', () => {
    const f = _.combineAll(S.Semigroup)
    U.deepStrictEqual(f(['a']), 'a')
    U.deepStrictEqual(f(['a', 'bb']), 'abb')
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      [{ a: 1, b: 'b' }]
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b'))), [{ a: 1, b: 'b' }])
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b'))), [[1, 'b']])
  })

  it('zipWith', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)
      ),
      ['a1', 'b2', 'c3']
    )
  })

  it('zip', () => {
    U.deepStrictEqual(pipe([1, 2, 3] as const, _.zip(['a', 'b', 'c', 'd'])), [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
  })

  it('unzip', () => {
    U.deepStrictEqual(
      _.unzip([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]),
      [
        [1, 2, 3],
        ['a', 'b', 'c']
      ]
    )
  })

  it('splitAt', () => {
    const assertSplitAt = (
      input: _.ReadonlyNonEmptyArray<number>,
      index: number,
      expectedInit: ReadonlyArray<number>,
      expectedRest: ReadonlyArray<number>
    ) => {
      const [init, rest] = _.splitAt(index)(input)
      U.strictEqual(init, expectedInit)
      U.strictEqual(rest, expectedRest)
    }

    const two: _.ReadonlyNonEmptyArray<number> = [1, 2]
    U.deepStrictEqual(_.splitAt(1)(two), [[1], [2]])
    assertSplitAt(two, 2, two, RA.empty)
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    assertSplitAt(singleton, 1, singleton, RA.empty)

    // out of bounds
    assertSplitAt(singleton, 0, singleton, RA.empty)
    assertSplitAt(singleton, 2, singleton, RA.empty)
    U.deepStrictEqual(_.splitAt(0)(two), [[1], [2]])
    assertSplitAt(two, 3, two, RA.empty)
  })

  it('chunksOf', () => {
    U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
    U.deepStrictEqual(_.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
      [1, 2],
      [3, 4],
      [5, 6]
    ])
    U.deepStrictEqual(_.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    U.deepStrictEqual(_.chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    // out of bounds
    U.deepStrictEqual(_.chunksOf(0)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    U.deepStrictEqual(_.chunksOf(-1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])

    const assertSingleChunk = (input: _.ReadonlyNonEmptyArray<number>, n: number) => {
      const chunks = _.chunksOf(n)(input)
      U.strictEqual(chunks.length, 1)
      U.strictEqual(_.head(chunks), input)
    }
    // n = length
    assertSingleChunk([1, 2], 2)
    // n out of bounds
    assertSingleChunk([1, 2], 3)
  })

  it('makeBy', () => {
    const f = _.makeBy(U.double)
    U.deepStrictEqual(f(5), [0, 2, 4, 6, 8])
    // If `n` (must be a natural number) is non positive return `[f(0)]`.
    U.deepStrictEqual(f(0), [0])
    U.deepStrictEqual(f(-1), [0])
  })

  it('range', () => {
    U.deepStrictEqual(_.range(0, 0), [0])
    U.deepStrictEqual(_.range(0, 1), [0, 1])
    U.deepStrictEqual(_.range(1, 5), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.range(10, 15), [10, 11, 12, 13, 14, 15])
    U.deepStrictEqual(_.range(-1, 0), [-1, 0])
    U.deepStrictEqual(_.range(-5, -1), [-5, -4, -3, -2, -1])
    // out of bound
    U.deepStrictEqual(_.range(2, 1), [2])
    U.deepStrictEqual(_.range(-1, -2), [-1])
  })

  it('comprehension', () => {
    U.deepStrictEqual(
      _.comprehension([[1, 2, 3]], (a) => a * 2),
      [2, 4, 6]
    )
    U.deepStrictEqual(
      _.comprehension(
        [
          [1, 2, 3],
          ['a', 'b']
        ],
        tuple
      ),
      [
        [1, 'a'],
        [1, 'b'],
        [2, 'a'],
        [2, 'b'],
        [3, 'a'],
        [3, 'b']
      ]
    )
  })

  it('modifyHead', () => {
    const f: Endomorphism<string> = (s) => s + '!'
    U.deepStrictEqual(pipe(['a'], _.modifyHead(f)), ['a!'])
    U.deepStrictEqual(pipe(['a', 'b'], _.modifyHead(f)), ['a!', 'b'])
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.modifyHead(f)), ['a!', 'b', 'c'])
  })

  it('updateHead', () => {
    U.deepStrictEqual(pipe(['a'], _.updateHead('d')), ['d'])
    U.deepStrictEqual(pipe(['a', 'b'], _.updateHead('d')), ['d', 'b'])
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.updateHead('d')), ['d', 'b', 'c'])
  })

  it('modifyLast', () => {
    const f: Endomorphism<string> = (s) => s + '!'
    U.deepStrictEqual(pipe(['a'], _.modifyLast(f)), ['a!'])
    U.deepStrictEqual(pipe(['a', 'b'], _.modifyLast(f)), ['a', 'b!'])
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.modifyLast(f)), ['a', 'b', 'c!'])
  })

  it('updateLast', () => {
    U.deepStrictEqual(pipe(['a'], _.updateLast('d')), ['d'])
    U.deepStrictEqual(pipe(['a', 'b'], _.updateLast('d')), ['a', 'd'])
    U.deepStrictEqual(pipe(['a', 'b', 'c'], _.updateLast('d')), ['a', 'b', 'd'])
  })

  it('replicate', () => {
    const f = _.replicate('a')
    U.deepStrictEqual(pipe(0, f), ['a'])
    U.deepStrictEqual(pipe(1, f), ['a'])
    U.deepStrictEqual(pipe(2, f), ['a', 'a'])
  })

  it('rotate', () => {
    const singleton: _.ReadonlyNonEmptyArray<number> = [1]
    U.strictEqual(_.rotate(1)(singleton), singleton)
    U.strictEqual(_.rotate(2)(singleton), singleton)
    U.strictEqual(_.rotate(-1)(singleton), singleton)
    U.strictEqual(_.rotate(-2)(singleton), singleton)
    const two: _.ReadonlyNonEmptyArray<number> = [1, 2]
    U.strictEqual(_.rotate(2)(two), two)
    U.strictEqual(_.rotate(0)(two), two)
    U.strictEqual(_.rotate(-2)(two), two)

    U.deepStrictEqual(_.rotate(1)([1, 2]), [2, 1])
    U.deepStrictEqual(_.rotate(1)([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
    U.deepStrictEqual(_.rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-1)([1, 2, 3, 4, 5]), [2, 3, 4, 5, 1])
    U.deepStrictEqual(_.rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])

    U.deepStrictEqual(_.rotate(7)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-7)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])

    U.deepStrictEqual(_.rotate(2.2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
    U.deepStrictEqual(_.rotate(-2.2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
  })

  it('uniq', () => {
    interface A {
      readonly a: string
      readonly b: number
    }

    const eqA = pipe(
      N.Eq,
      Eq.contramap((f: A) => f.b)
    )
    const arrA: A = { a: 'a', b: 1 }
    const arrB: A = { a: 'b', b: 1 }
    const arrC: A = { a: 'c', b: 2 }
    const arrD: A = { a: 'd', b: 2 }
    const arrUniq: _.ReadonlyNonEmptyArray<A> = [arrA, arrC]

    U.deepStrictEqual(_.uniq(eqA)(arrUniq), arrUniq)
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrB, arrC, arrD]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrB, arrA, arrC, arrD]), [arrB, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrA, arrC, arrD, arrA]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrA, arrC]), [arrA, arrC])
    U.deepStrictEqual(_.uniq(eqA)([arrC, arrA]), [arrC, arrA])
    U.deepStrictEqual(_.uniq(B.Eq)([true, false, true, false]), [true, false])
    U.deepStrictEqual(_.uniq(N.Eq)([-0, -0]), [-0])
    U.deepStrictEqual(_.uniq(N.Eq)([0, -0]), [0])
    U.deepStrictEqual(_.uniq(N.Eq)([1]), [1])
    U.deepStrictEqual(_.uniq(N.Eq)([2, 1, 2]), [2, 1])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 1]), [1, 2])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(N.Eq)([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    U.deepStrictEqual(_.uniq(S.Eq)(['a', 'b', 'a']), ['a', 'b'])
    U.deepStrictEqual(_.uniq(S.Eq)(['a', 'b', 'A']), ['a', 'b', 'A'])

    const as: _.ReadonlyNonEmptyArray<number> = [1]
    U.strictEqual(_.uniq(N.Eq)(as), as)
  })

  it('sortBy', () => {
    interface X {
      readonly a: string
      readonly b: number
      readonly c: boolean
    }
    const byName = pipe(
      S.Ord,
      Ord.contramap((p: { readonly a: string; readonly b: number }) => p.a)
    )
    const byAge = pipe(
      N.Ord,
      Ord.contramap((p: { readonly a: string; readonly b: number }) => p.b)
    )
    const f = _.sortBy([byName, byAge])
    const xs: _.ReadonlyNonEmptyArray<X> = [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 3, c: true },
      { a: 'c', b: 2, c: true },
      { a: 'b', b: 2, c: true }
    ]
    U.deepStrictEqual(f(xs), [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 2, c: true },
      { a: 'b', b: 3, c: true },
      { a: 'c', b: 2, c: true }
    ])
    const sortByAgeByName = _.sortBy([byAge, byName])
    U.deepStrictEqual(sortByAgeByName(xs), [
      { a: 'a', b: 1, c: true },
      { a: 'b', b: 2, c: true },
      { a: 'c', b: 2, c: true },
      { a: 'b', b: 3, c: true }
    ])

    U.deepStrictEqual(_.sortBy([])(xs), xs)
  })

  it('getUnionSemigroup', () => {
    const combine = _.getUnionSemigroup(N.Eq).combine
    U.deepStrictEqual(pipe([1, 2], combine([3, 4])), [1, 2, 3, 4])
    U.deepStrictEqual(pipe([1, 2], combine([2, 3])), [1, 2, 3])
    U.deepStrictEqual(pipe([1, 2], combine([1, 2])), [1, 2])
  })

  it('matchLeft', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.matchLeft((head, tail) => [head, tail])
      ),
      [1, [2, 3]]
    )
  })

  it('matchRight', () => {
    U.deepStrictEqual(
      pipe(
        [1, 2, 3],
        _.matchRight((init, last) => [init, last])
      ),
      [[1, 2], 3]
    )
  })
})
