import * as _ from '../src/Eq'
import { pipe } from '../src/function'
import { fold } from '../src/Monoid'
import { deepStrictEqual } from './util'

describe('Eq', () => {
  describe('pipeables', () => {
    it('contramap', () => {
      const S = pipe(
        _.eqString,
        _.contramap((p: Person) => p.name)
      )
      deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'a', age: 2 }), true)
      deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'a', age: 1 }), true)
      deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'b', age: 1 }), false)
      deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'b', age: 2 }), false)
    })
  })

  it('getTupleEq', () => {
    const S = _.getTupleEq(_.eqString, _.eqNumber, _.eqBoolean)
    deepStrictEqual(S.equals(['a', 1, true])(['a', 1, true]), true)
    deepStrictEqual(S.equals(['a', 1, true])(['b', 1, true]), false)
    deepStrictEqual(S.equals(['a', 1, true])(['a', 2, true]), false)
    deepStrictEqual(S.equals(['a', 1, true])(['a', 1, false]), false)
  })

  interface Person {
    readonly name: string
    readonly age: number
  }

  it('fromEquals', () => {
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const S1 = _.fromEquals<A>((second) => (first) => {
      nbCall += 1
      return first.x === second.x
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    S1.equals(a1)(a1)
    deepStrictEqual(nbCall, 0)
    S1.equals(a1)(a2)
    deepStrictEqual(nbCall, 1)
  })

  it('eqDate', () => {
    deepStrictEqual(_.eqDate.equals(new Date(0))(new Date(0)), true)
    deepStrictEqual(_.eqDate.equals(new Date(0))(new Date(1)), false)
    deepStrictEqual(_.eqDate.equals(new Date(1))(new Date(0)), false)
  })

  it('getStructEq', () => {
    const S = _.getStructEq<Person>({
      name: _.eqString,
      age: _.eqNumber
    })
    deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'a', age: 1 }), true)
    deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'a', age: 2 }), false)
    deepStrictEqual(S.equals({ name: 'a', age: 1 })({ name: 'b', age: 1 }), false)
  })

  it('eqStrict', () => {
    deepStrictEqual(_.eqStrict.equals(1)(1), true)
    deepStrictEqual(_.eqStrict.equals(1)('a'), false)
  })

  it('getMonoid', () => {
    type T = readonly [string, number, boolean]
    const M = _.getMonoid<T>()
    const eqFst: _.Eq<T> = _.contramap((x: T) => x[0])(_.eqString)
    const eqSnd: _.Eq<T> = _.contramap((x: T) => x[1])(_.eqNumber)
    const eq3rd: _.Eq<T> = _.contramap((x: T) => x[2])(_.eqBoolean)
    const eq = fold(M)([eqFst, eqSnd, eq3rd])
    deepStrictEqual(eq.equals(['a', 1, true])(['a', 1, true]), true)
    deepStrictEqual(eq.equals(['a', 1, true])(['b', 1, true]), false)
    deepStrictEqual(eq.equals(['a', 1, true])(['a', 2, true]), false)
    deepStrictEqual(eq.equals(['a', 1, true])(['a', 1, false]), false)
  })
})
