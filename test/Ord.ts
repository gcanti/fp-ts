import * as U from './util'
import { sort } from '../src/ReadonlyArray'
import * as _ from '../src/Ord'
import { concatAll } from '../src/Monoid'
import { pipe } from '../src/function'
import * as B from '../src/boolean'
import * as S from '../src/string'
import * as N from '../src/number'

describe('Ord', () => {
  it('tuple', () => {
    const O = _.tuple(S.Ord, N.Ord, B.Ord)
    U.deepStrictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
    U.deepStrictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
    U.deepStrictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
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
    const O1 = concatAll(M)([M.empty, sortByFst, sortBySnd])
    U.deepStrictEqual(sort(O1)(tuples), [
      [1, 'b'],
      [1, 'c'],
      [2, 'a'],
      [2, 'c']
    ])
    //                           right unit --v
    const O2 = concatAll(M)([sortBySnd, sortByFst, M.empty])
    U.deepStrictEqual(sort(O2)(tuples), [
      [2, 'a'],
      [1, 'b'],
      [1, 'c'],
      [2, 'c']
    ])
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
    U.deepStrictEqual(O.compare(1, 2), 1)
    U.deepStrictEqual(O.compare(2, 1), -1)
    U.deepStrictEqual(O.compare(2, 2), 0)
  })

  it('leq', () => {
    U.deepStrictEqual(_.leq(N.Ord)(0, 1), true)
    U.deepStrictEqual(_.leq(N.Ord)(1, 1), true)
    U.deepStrictEqual(_.leq(N.Ord)(2, 1), false)
  })

  it('geq', () => {
    U.deepStrictEqual(_.geq(N.Ord)(0, 1), false)
    U.deepStrictEqual(_.geq(N.Ord)(1, 1), true)
    U.deepStrictEqual(_.geq(N.Ord)(2, 1), true)
  })

  it('fromCompare', () => {
    const O1 = _.fromCompare(N.Ord.compare)
    U.deepStrictEqual(O1.equals(0, 1), false)
    U.deepStrictEqual(O1.equals(1, 1), true)
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const O2 = _.fromCompare<A>((a, b) => {
      nbCall += 1
      return N.Ord.compare(a.x, b.x)
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    U.deepStrictEqual(O2.equals(a1, a1), true)
    U.deepStrictEqual(nbCall, 0)
    U.deepStrictEqual(O2.equals(a1, a2), true)
    U.deepStrictEqual(nbCall, 1)
    U.deepStrictEqual(O2.compare(a1, a1), 0)
    U.deepStrictEqual(nbCall, 1)
    U.deepStrictEqual(O2.compare(a1, a2), 0)
    U.deepStrictEqual(nbCall, 2)
  })
})
