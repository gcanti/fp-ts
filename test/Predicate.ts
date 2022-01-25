import { pipe } from '../src/function'
import { isEmpty } from '../src/string'
import * as _ from '../src/Predicate'
import * as U from './util'

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

  it('getDivisibleAny', () => {
    type A = {
      readonly b: string
      readonly c: number
    }
    const predicate = _.getDivisibleAny().divide((a: A) => [a.c, a.b], isPositive, isEmpty)
    U.deepStrictEqual(predicate({ b: '', c: 1 }), true)
    U.deepStrictEqual(predicate({ b: 'b', c: 1 }), true)
    U.deepStrictEqual(predicate({ b: '', c: -1 }), true)
    U.deepStrictEqual(predicate({ b: 'b', c: -1 }), false)
  })

  it('getDivisibleAll', () => {
    type A = {
      readonly b: string
      readonly c: number
    }
    const predicate = _.getDivisibleAll().divide((a: A) => [a.c, a.b], isPositive, isEmpty)
    U.deepStrictEqual(predicate({ b: '', c: 1 }), true)
    U.deepStrictEqual(predicate({ b: 'b', c: 1 }), false)
    U.deepStrictEqual(predicate({ b: '', c: -1 }), false)
    U.deepStrictEqual(predicate({ b: 'b', c: -1 }), false)
  })

  it('not', () => {
    const predicate = _.not(isPositive)
    U.deepStrictEqual(predicate(1), false)
    U.deepStrictEqual(predicate(0), true)
    U.deepStrictEqual(predicate(-1), true)
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
})
