import { pipe } from '../src/function'
import { concatAll } from '../src/Monoid'
import * as _ from '../src/Ord'
import { sort } from '../src/ReadonlyArray'
import { deepStrictEqual } from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'
import * as N from '../src/number'
import * as assert from 'assert'

describe('Ord', () => {
  it('tuple', () => {
    const O = _.tuple(S.Ord, N.Ord, B.Ord)
    deepStrictEqual(pipe(['a', 1, true], O.compare(['b', 2, true])), -1)
    deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 2, true])), -1)
    deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 1, false])), 1)
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
    deepStrictEqual(sort(O1)(tuples), [
      [1, 'b'],
      [1, 'c'],
      [2, 'a'],
      [2, 'c']
    ])
    //                           right unit --v
    const O2 = concatAll(M)([sortBySnd, sortByFst, M.empty])
    deepStrictEqual(sort(O2)(tuples), [
      [2, 'a'],
      [1, 'b'],
      [1, 'c'],
      [2, 'c']
    ])
  })

  it('ordNumber', () => {
    deepStrictEqual(pipe(1, N.Ord.compare(2)), -1)
    deepStrictEqual(pipe(2, N.Ord.compare(1)), 1)
    deepStrictEqual(pipe(2, N.Ord.compare(2)), 0)
  })

  it('clamp', () => {
    const clampNumber = _.clamp(N.Ord)
    deepStrictEqual(clampNumber(1, 10)(2), 2)
    deepStrictEqual(clampNumber(1, 10)(10), 10)
    deepStrictEqual(clampNumber(1, 10)(20), 10)
    deepStrictEqual(clampNumber(1, 10)(1), 1)
    deepStrictEqual(clampNumber(1, 10)(-10), 1)
  })

  it('between', () => {
    const betweenNumber = _.between(N.Ord)
    deepStrictEqual(betweenNumber(1, 10)(2), true)
    deepStrictEqual(betweenNumber(1, 10)(10), true)
    deepStrictEqual(betweenNumber(1, 10)(20), false)
    deepStrictEqual(betweenNumber(1, 10)(1), true)
    deepStrictEqual(betweenNumber(1, 10)(-10), false)
  })

  it('reverse', () => {
    const O = _.reverse(N.Ord)
    deepStrictEqual(pipe(1, O.compare(2)), 1)
    deepStrictEqual(pipe(2, O.compare(1)), -1)
    deepStrictEqual(pipe(2, O.compare(2)), 0)
  })

  it('leq', () => {
    const f = _.leq(N.Ord)
    deepStrictEqual(pipe(0, f(1)), true)
    deepStrictEqual(pipe(1, f(1)), true)
    deepStrictEqual(pipe(2, f(1)), false)
  })

  it('geq', () => {
    const f = _.geq(N.Ord)
    deepStrictEqual(pipe(0, f(1)), false)
    deepStrictEqual(pipe(1, f(1)), true)
    deepStrictEqual(pipe(2, f(1)), true)
  })

  it('fromCompare', () => {
    const O1 = _.fromCompare(N.Ord.compare)
    deepStrictEqual(O1.equals(0)(1), false)
    deepStrictEqual(O1.equals(1)(1), true)
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const O2 = _.fromCompare<A>((second) => {
      const f = N.Ord.compare(second.x)
      return (first) => {
        nbCall += 1
        return f(first.x)
      }
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    deepStrictEqual(O2.equals(a1)(a1), true)
    deepStrictEqual(nbCall, 0)
    deepStrictEqual(O2.equals(a1)(a2), true)
    deepStrictEqual(nbCall, 1)
    deepStrictEqual(pipe(a1, O2.compare(a1)), 0)
    deepStrictEqual(nbCall, 1)
    deepStrictEqual(pipe(a1, O2.compare(a2)), 0)
    deepStrictEqual(nbCall, 2)
  })

  it('min', () => {
    type A = { readonly a: number }
    const min = _.min(
      pipe(
        N.Ord,
        _.contramap((a: A) => a.a)
      )
    )
    deepStrictEqual(pipe({ a: 1 }, min({ a: 2 })), { a: 1 })
    deepStrictEqual(pipe({ a: 2 }, min({ a: 1 })), { a: 1 })
    const first = { a: 1 }
    const second = { a: 1 }
    assert.strictEqual(pipe(first, min(second)), first)
  })

  it('max', () => {
    type A = { readonly a: number }
    const max = _.max(
      pipe(
        N.Ord,
        _.contramap((a: A) => a.a)
      )
    )
    deepStrictEqual(pipe({ a: 1 }, max({ a: 2 })), { a: 2 })
    deepStrictEqual(pipe({ a: 2 }, max({ a: 1 })), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    assert.strictEqual(pipe(first, max(second)), first)
  })
})
