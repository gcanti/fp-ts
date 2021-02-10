import * as assert from 'assert'
import * as N from '../src/number'
import * as _ from '../src/Semigroup'
import * as B from '../src/boolean'
import * as S from '../src/string'
import * as U from './util'

describe('Semigroup', () => {
  it('tuple', () => {
    const S1 = _.tuple(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const S2 = _.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
    U.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('concatAll', () => {
    U.deepStrictEqual(_.concatAll(S.Monoid)('')(['a', 'b', 'c']), 'abc')
  })

  it('fold', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.fold(S.Monoid)('', ['a', 'b', 'c']), 'abc')
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.fold(S.Monoid)('')(['a', 'b', 'c']), 'abc')
  })

  it('min', () => {
    U.deepStrictEqual(_.min(N.Ord).concat(1, 2), 1)
  })

  it('max', () => {
    U.deepStrictEqual(_.max(N.Ord).concat(1, 2), 2)
  })

  it('assign', () => {
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
    const S = _.assign<T>()
    const result = S.concat(foo, bar)
    const expected = Object.assign({}, foo, bar)
    U.deepStrictEqual(result.foo, expected.foo)
    U.deepStrictEqual(result.bar, expected.bar)
  })

  it('first', () => {
    U.deepStrictEqual(_.first<number>().concat(1, 2), 1)
  })

  it('semigroupVoid', () => {
    U.deepStrictEqual(_.semigroupVoid.concat(undefined, undefined), undefined)
  })

  it('reverse', () => {
    const DS = _.reverse(S.Semigroup)
    U.deepStrictEqual(DS.concat('a', 'b'), 'ba')
  })

  it('intercalate', () => {
    const IS = _.intercalate(' ')(S.Semigroup)
    assert.strictEqual(IS.concat('a', 'b'), 'a b')
    assert.strictEqual(IS.concat(IS.concat('a', 'b'), 'c'), IS.concat('a', IS.concat('b', 'c')))
  })
})
