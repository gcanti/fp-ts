import { pipe, constTrue, constFalse } from '../src/function'
import * as _ from '../src/Predicate'
import * as U from './util'
import * as fc from 'fast-check'

const isPositive: _.Predicate<number> = (n) => n > 0
const isNegative: _.Predicate<number> = (n) => n < 0
const lt2: _.Predicate<number> = (n) => n < 2

describe('Predicate', () => {
  it('contramap', () => {
    type A = {
      readonly a: number
    }
    const predicate = pipe(
      isPositive,
      _.contramap((a: A) => a.a)
    )
    U.deepStrictEqual(predicate({ a: -1 }), false)
    U.deepStrictEqual(predicate({ a: 0 }), false)
    U.deepStrictEqual(predicate({ a: 1 }), true)
  })

  it('Contravariant.contramap', () => {
    type A = {
      readonly a: number
    }
    const predicate = _.Contravariant.contramap(isPositive, (a: A) => a.a)
    U.deepStrictEqual(predicate({ a: -1 }), false)
    U.deepStrictEqual(predicate({ a: 0 }), false)
    U.deepStrictEqual(predicate({ a: 1 }), true)
  })

  it('not', () => {
    const predicate = _.not(isPositive)
    U.deepStrictEqual(predicate(1), false)
    U.deepStrictEqual(predicate(0), true)
    U.deepStrictEqual(predicate(-1), true)
  })

  it('implies', () => {
    const implies = (a: boolean, b: boolean) => _.implies(() => a, () => b)(true)

    // Truth table.
    U.deepStrictEqual(implies(true, true), true)
    U.deepStrictEqual(implies(true, false), false)
    U.deepStrictEqual(implies(false, true), true)
    U.deepStrictEqual(implies(false, false), true)
  })

  it('getMonoidAny', () => {
    const M = _.getMonoidAny<number>()
    const predicate = M.concat(isPositive, isNegative)
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-1), true)
    U.deepStrictEqual(predicate(1), true)
  })

  it('getMonoidAll', () => {
    const M = _.getMonoidAll<number>()
    const predicate = M.concat(isPositive, lt2)
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-2), false)
    U.deepStrictEqual(predicate(1), true)
  })

  it('ifElse', () => {
    fc.assert(fc.property(fc.boolean(), fc.boolean(), (a, b) =>
      _.ifElse(constTrue, () => a, () => b)(null) === a &&
      _.ifElse(constFalse, () => a, () => b)(null) === b))
  })

  it('ifElseW', () => {
    fc.assert(fc.property(fc.boolean(), fc.boolean(), (a, b) =>
      _.ifElseW(constTrue, () => a, () => b)(null) === a &&
      _.ifElseW(constFalse, () => a, () => b)(null) === b))
  })

})
