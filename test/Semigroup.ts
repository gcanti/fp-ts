import * as assert from 'assert'
import { monoidString } from '../src/Monoid'
import { ordNumber } from '../src/Ord'
import * as _ from '../src/Semigroup'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Semigroup', () => {
  it('getTupleSemigroup', () => {
    const S1 = _.getTupleSemigroup(S.Semigroup, _.semigroupSum)
    assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const S2 = _.getTupleSemigroup(S.Semigroup, _.semigroupSum, B.SemigroupAll)
    assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.deepStrictEqual(_.fold(monoidString)('', ['a', 'b', 'c']), 'abc')
    assert.deepStrictEqual(_.fold(monoidString)('')(['a', 'b', 'c']), 'abc')
  })

  it('getMeetSemigroup', () => {
    assert.deepStrictEqual(_.getMeetSemigroup(ordNumber).concat(1, 2), 1)
  })

  it('getJoinSemigroup', () => {
    assert.deepStrictEqual(_.getJoinSemigroup(ordNumber).concat(1, 2), 2)
  })

  it('getObjectSemigroup', () => {
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
    const S = _.getObjectSemigroup<T>()
    const result = S.concat(foo, bar)
    const expected = Object.assign({}, foo, bar)
    assert.deepStrictEqual(result.foo, expected.foo)
    assert.deepStrictEqual(result.bar, expected.bar)
  })

  it('semigroupProduct', () => {
    assert.deepStrictEqual(_.semigroupProduct.concat(2, 3), 6)
  })

  it('getFirstSemigroup', () => {
    assert.deepStrictEqual(_.getFirstSemigroup<number>().concat(1, 2), 1)
  })

  it('semigroupVoid', () => {
    assert.deepStrictEqual(_.semigroupVoid.concat(undefined, undefined), undefined)
  })

  it('getDualSemigroup', () => {
    const DS = _.getDualSemigroup(S.Semigroup)
    assert.deepStrictEqual(DS.concat('a', 'b'), 'ba')
  })

  it('getIntercalateSemigroup', () => {
    const IS = _.getIntercalateSemigroup(' ')(S.Semigroup)
    assert.strictEqual(IS.concat('a', 'b'), 'a b')
    assert.strictEqual(IS.concat(IS.concat('a', 'b'), 'c'), IS.concat('a', IS.concat('b', 'c')))
  })
})
