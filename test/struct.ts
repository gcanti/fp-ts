import * as _ from '../src/struct'
import * as S from '../src/string'
import * as U from './util'
import { Eq as NumberEq, Show as NumberShow } from '../src/number'

describe('struct', () => {
  it('getShow', () => {
    U.deepStrictEqual(_.getShow({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    U.deepStrictEqual(_.getShow({ a: S.Show, b: NumberShow }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
    // should ignore non own properties
    const shows = Object.create({ a: 1 })
    const s = _.getShow(shows)
    U.deepStrictEqual(s.show({}), '{}')
  })

  it('getEq', () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const E = _.getEq<Person>({
      name: S.Eq,
      age: NumberEq
    })
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })

  it('getSemigroup', () => {
    // should ignore non own properties
    const S = _.getSemigroup(Object.create({ a: 1 }))
    U.deepStrictEqual(S.concat({}, {}), {})
  })

  it('getAssignSemigroup', () => {
    type T = {
      readonly foo?: number
      readonly bar: string
    }
    const foo: T = {
      foo: 123,
      bar: '456'
    }
    const bar: T = {
      bar: '123'
    }
    const S = _.getAssignSemigroup<T>()
    U.deepStrictEqual(S.concat(foo, bar), Object.assign({}, foo, bar))
  })

  it('getMonoid', () => {
    // should ignore non own properties
    const monoids = Object.create({ a: 1 })
    const s = _.getMonoid(monoids)
    U.deepStrictEqual(s.empty, {})
  })
})
