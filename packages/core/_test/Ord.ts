import * as B from '@fp-ts/core/boolean'
import { pipe } from '@fp-ts/core/Function'
import { combineAll } from '@fp-ts/core/Monoid'
import * as N from '@fp-ts/core/number'
import * as _ from '@fp-ts/core/Ord'
import { sort } from '@fp-ts/core/ReadonlyArray'
import * as RR from '@fp-ts/core/ReadonlyRecord'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

describe('Ord', () => {
  it('tuple', () => {
    const O = _.tuple(S.Ord, N.Ord, B.Ord)
    U.deepStrictEqual(pipe(['a', 1, true], O.compare(['b', 2, true])), -1)
    U.deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 2, true])), -1)
    U.deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 1, false])), 1)
  })

  it('getMonoid', () => {
    type T = readonly [number, string]
    const tuples: ReadonlyArray<T> = [
      [2, 'c'],
      [1, 'b'],
      [2, 'a'],
      [1, 'c']
    ]
    const M = _.getMonoid<T>()
    const sortByFst = pipe(
      N.Ord,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      S.Ord,
      _.contramap((x: T) => x[1])
    )
    //                  v-- left unit
    const O1 = combineAll(M)([M.empty, sortByFst, sortBySnd])
    U.deepStrictEqual(sort(O1)(tuples), [
      [1, 'b'],
      [1, 'c'],
      [2, 'a'],
      [2, 'c']
    ])
    //                           right unit --v
    const O2 = combineAll(M)([sortBySnd, sortByFst, M.empty])
    U.deepStrictEqual(sort(O2)(tuples), [
      [2, 'a'],
      [1, 'b'],
      [1, 'c'],
      [2, 'c']
    ])
  })

  it('ordNumber', () => {
    U.deepStrictEqual(pipe(1, N.Ord.compare(2)), -1)
    U.deepStrictEqual(pipe(2, N.Ord.compare(1)), 1)
    U.deepStrictEqual(pipe(2, N.Ord.compare(2)), 0)
  })

  it('clamp', () => {
    const clampNumber = _.clamp(N.Ord)
    U.deepStrictEqual(clampNumber(1, 10)(2), 2)
    U.deepStrictEqual(clampNumber(1, 10)(10), 10)
    U.deepStrictEqual(clampNumber(1, 10)(20), 10)
    U.deepStrictEqual(clampNumber(1, 10)(1), 1)
    U.deepStrictEqual(clampNumber(1, 10)(-10), 1)
  })

  it('between', () => {
    const betweenNumber = _.between(N.Ord)
    U.deepStrictEqual(betweenNumber(1, 10)(2), true)
    U.deepStrictEqual(betweenNumber(1, 10)(10), true)
    U.deepStrictEqual(betweenNumber(1, 10)(20), false)
    U.deepStrictEqual(betweenNumber(1, 10)(1), true)
    U.deepStrictEqual(betweenNumber(1, 10)(-10), false)
  })

  it('reverse', () => {
    const O = _.reverse(N.Ord)
    U.deepStrictEqual(pipe(1, O.compare(2)), 1)
    U.deepStrictEqual(pipe(2, O.compare(1)), -1)
    U.deepStrictEqual(pipe(2, O.compare(2)), 0)
  })

  it('leq', () => {
    const f = _.leq(N.Ord)
    U.deepStrictEqual(pipe(0, f(1)), true)
    U.deepStrictEqual(pipe(1, f(1)), true)
    U.deepStrictEqual(pipe(2, f(1)), false)
  })

  it('geq', () => {
    const f = _.geq(N.Ord)
    U.deepStrictEqual(pipe(0, f(1)), false)
    U.deepStrictEqual(pipe(1, f(1)), true)
    U.deepStrictEqual(pipe(2, f(1)), true)
  })

  it('min', () => {
    type A = { readonly a: number }
    const min = _.min(
      pipe(
        N.Ord,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, min({ a: 2 })), { a: 1 })
    U.deepStrictEqual(pipe({ a: 2 }, min({ a: 1 })), { a: 1 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, min(second)), first)
  })

  it('max', () => {
    type A = { readonly a: number }
    const max = _.max(
      pipe(
        N.Ord,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, max({ a: 2 })), { a: 2 })
    U.deepStrictEqual(pipe({ a: 2 }, max({ a: 1 })), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, max(second)), first)
  })

  it('equals', () => {
    const equals = _.equals(N.Ord)
    U.deepStrictEqual(equals(1)(1), true)
    U.deepStrictEqual(equals(1)(2), false)
  })

  it('trivial', () => {
    const toReadonlyArray = RR.toEntries(_.trivial)
    U.deepStrictEqual(toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    U.deepStrictEqual(toReadonlyArray({ b: 2, a: 1 }), [
      ['b', 2],
      ['a', 1]
    ])
  })
})
