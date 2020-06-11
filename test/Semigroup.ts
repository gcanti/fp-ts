import * as assert from 'assert'
import { monoidString } from '../src/Monoid'
import { ordNumber } from '../src/Ord'
import * as _ from '../src/Semigroup'

describe('Semigroup', () => {
  it('getTupleSemigroup', () => {
    const S1 = _.getTupleSemigroup(_.semigroupString, _.semigroupSum)
    assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const S2 = _.getTupleSemigroup(_.semigroupString, _.semigroupSum, _.semigroupAll)
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
    const S = _.getDualSemigroup(_.semigroupString)
    assert.deepStrictEqual(S.concat('a', 'b'), 'ba')
  })

  it('getIntercalateSemigroup', () => {
    const S = _.getIntercalateSemigroup(' ')(_.semigroupString)
    assert.strictEqual(S.concat('a', 'b'), 'a b')
    assert.strictEqual(S.concat(S.concat('a', 'b'), 'c'), S.concat('a', S.concat('b', 'c')))
  })
})
