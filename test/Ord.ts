import * as assert from 'assert'
import { sort } from '../src/ReadonlyArray'
import * as _ from '../src/Ord'
import { fold } from '../src/Monoid'
import { pipe } from '../src/function'

describe('Ord', () => {
  it('getTupleOrd', () => {
    const O = _.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean)
    assert.deepStrictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
    assert.deepStrictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
    assert.deepStrictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
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
    assert.deepStrictEqual(_.ordNumber.compare(1, 2), -1)
    assert.deepStrictEqual(_.ordNumber.compare(2, 1), 1)
    assert.deepStrictEqual(_.ordNumber.compare(2, 2), 0)
  })

  it('ordBoolean', () => {
    assert.deepStrictEqual(_.ordBoolean.compare(false, true), -1)
    assert.deepStrictEqual(_.ordBoolean.compare(true, false), 1)
    assert.deepStrictEqual(_.ordBoolean.compare(true, true), 0)
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
    assert.deepStrictEqual(O.compare(1, 2), 1)
    assert.deepStrictEqual(O.compare(2, 1), -1)
    assert.deepStrictEqual(O.compare(2, 2), 0)
  })

  it('ordDate', () => {
    assert.deepStrictEqual(_.ordDate.compare(new Date(0), new Date(0)), 0)
    assert.deepStrictEqual(_.ordDate.compare(new Date(0), new Date(1)), -1)
    assert.deepStrictEqual(_.ordDate.compare(new Date(1), new Date(0)), 1)
  })

  it('leq', () => {
    assert.deepStrictEqual(_.leq(_.ordNumber)(0, 1), true)
    assert.deepStrictEqual(_.leq(_.ordNumber)(1, 1), true)
    assert.deepStrictEqual(_.leq(_.ordNumber)(2, 1), false)
  })

  it('geq', () => {
    assert.deepStrictEqual(_.geq(_.ordNumber)(0, 1), false)
    assert.deepStrictEqual(_.geq(_.ordNumber)(1, 1), true)
    assert.deepStrictEqual(_.geq(_.ordNumber)(2, 1), true)
  })

  it('fromCompare', () => {
    const O1 = _.fromCompare(_.ordNumber.compare)
    assert.deepStrictEqual(O1.equals(0, 1), false)
    assert.deepStrictEqual(O1.equals(1, 1), true)
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const O2 = _.fromCompare<A>((a, b) => {
      nbCall += 1
      return _.ordNumber.compare(a.x, b.x)
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    assert.deepStrictEqual(O2.equals(a1, a1), true)
    assert.deepStrictEqual(nbCall, 0)
    assert.deepStrictEqual(O2.equals(a1, a2), true)
    assert.deepStrictEqual(nbCall, 1)
    assert.deepStrictEqual(O2.compare(a1, a1), 0)
    assert.deepStrictEqual(nbCall, 1)
    assert.deepStrictEqual(O2.compare(a1, a2), 0)
    assert.deepStrictEqual(nbCall, 2)
  })
})
