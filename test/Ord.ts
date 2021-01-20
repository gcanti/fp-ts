import * as assert from 'assert'
import { sort } from '../src/ReadonlyArray'
import * as _ from '../src/Ord'
import { fold } from '../src/Monoid'
import { pipe } from '../src/function'

describe('Ord', () => {
  it('getTupleOrd', () => {
    const O = _.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean)
    assert.deepStrictEqual(pipe(['a', 1, true], O.compare(['b', 2, true])), -1)
    assert.deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 2, true])), -1)
    assert.deepStrictEqual(pipe(['a', 1, true], O.compare(['a', 1, false])), 1)
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
      _.ordNumber,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      _.ordString,
      _.contramap((x: T) => x[1])
    )
    //                  v-- left unit
    const O1 = fold(M)([M.empty, sortByFst, sortBySnd])
    assert.deepStrictEqual(sort(O1)(tuples), [
      [1, 'b'],
      [1, 'c'],
      [2, 'a'],
      [2, 'c']
    ])
    //                           right unit --v
    const O2 = fold(M)([sortBySnd, sortByFst, M.empty])
    assert.deepStrictEqual(sort(O2)(tuples), [
      [2, 'a'],
      [1, 'b'],
      [1, 'c'],
      [2, 'c']
    ])
  })

  it('ordNumber', () => {
    assert.deepStrictEqual(pipe(1, _.ordNumber.compare(2)), -1)
    assert.deepStrictEqual(pipe(2, _.ordNumber.compare(1)), 1)
    assert.deepStrictEqual(pipe(2, _.ordNumber.compare(2)), 0)
  })

  it('ordBoolean', () => {
    assert.deepStrictEqual(pipe(false, _.ordBoolean.compare(true)), -1)
    assert.deepStrictEqual(pipe(true, _.ordBoolean.compare(false)), 1)
    assert.deepStrictEqual(pipe(true, _.ordBoolean.compare(true)), 0)
  })

  it('clamp', () => {
    const clampNumber = _.clamp(_.ordNumber)
    assert.deepStrictEqual(clampNumber(1, 10)(2), 2)
    assert.deepStrictEqual(clampNumber(1, 10)(10), 10)
    assert.deepStrictEqual(clampNumber(1, 10)(20), 10)
    assert.deepStrictEqual(clampNumber(1, 10)(1), 1)
    assert.deepStrictEqual(clampNumber(1, 10)(-10), 1)
  })

  it('between', () => {
    const betweenNumber = _.between(_.ordNumber)
    assert.deepStrictEqual(betweenNumber(1, 10)(2), true)
    assert.deepStrictEqual(betweenNumber(1, 10)(10), true)
    assert.deepStrictEqual(betweenNumber(1, 10)(20), false)
    assert.deepStrictEqual(betweenNumber(1, 10)(1), true)
    assert.deepStrictEqual(betweenNumber(1, 10)(-10), false)
  })

  it('getDualOrd', () => {
    const O = _.getDualOrd(_.ordNumber)
    assert.deepStrictEqual(pipe(1, O.compare(2)), 1)
    assert.deepStrictEqual(pipe(2, O.compare(1)), -1)
    assert.deepStrictEqual(pipe(2, O.compare(2)), 0)
  })

  it('ordDate', () => {
    assert.deepStrictEqual(pipe(new Date(0), _.ordDate.compare(new Date(0))), 0)
    assert.deepStrictEqual(pipe(new Date(0), _.ordDate.compare(new Date(1))), -1)
    assert.deepStrictEqual(pipe(new Date(1), _.ordDate.compare(new Date(0))), 1)
  })

  it('ordBigint', () => {
    assert.deepStrictEqual(pipe(BigInt(0), _.ordBigint.compare(BigInt(0))), 0)
    assert.deepStrictEqual(pipe(BigInt(0), _.ordBigint.compare(BigInt(1))), -1)
    assert.deepStrictEqual(pipe(BigInt(1), _.ordBigint.compare(BigInt(0))), 1)
  })

  it('leq', () => {
    const f = _.leq(_.ordNumber)
    assert.deepStrictEqual(pipe(0, f(1)), true)
    assert.deepStrictEqual(pipe(1, f(1)), true)
    assert.deepStrictEqual(pipe(2, f(1)), false)
  })

  it('geq', () => {
    const f = _.geq(_.ordNumber)
    assert.deepStrictEqual(pipe(0, f(1)), false)
    assert.deepStrictEqual(pipe(1, f(1)), true)
    assert.deepStrictEqual(pipe(2, f(1)), true)
  })

  it('fromCompare', () => {
    const O1 = _.fromCompare(_.ordNumber.compare)
    assert.deepStrictEqual(O1.equals(0)(1), false)
    assert.deepStrictEqual(O1.equals(1)(1), true)
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const O2 = _.fromCompare<A>((second) => {
      const f = _.ordNumber.compare(second.x)
      return (first) => {
        nbCall += 1
        return f(first.x)
      }
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    assert.deepStrictEqual(O2.equals(a1)(a1), true)
    assert.deepStrictEqual(nbCall, 0)
    assert.deepStrictEqual(O2.equals(a1)(a2), true)
    assert.deepStrictEqual(nbCall, 1)
    assert.deepStrictEqual(pipe(a1, O2.compare(a1)), 0)
    assert.deepStrictEqual(nbCall, 1)
    assert.deepStrictEqual(pipe(a1, O2.compare(a2)), 0)
    assert.deepStrictEqual(nbCall, 2)
  })
})
