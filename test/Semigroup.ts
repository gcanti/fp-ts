import * as B from '../src/boolean'
import * as N from '../src/number'
import * as _ from '../src/Semigroup'
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
    U.deepStrictEqual(_.fold(S.Monoid)('', ['a', 'b', 'c']), 'abc')
    U.deepStrictEqual(_.fold(S.Monoid)('')(['a', 'b', 'c']), 'abc')
  })

  it('min', () => {
    U.deepStrictEqual(_.min(N.Ord).concat(1, 2), 1)
  })

  it('max', () => {
    U.deepStrictEqual(_.max(N.Ord).concat(1, 2), 2)
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
    U.strictEqual(IS.concat('a', 'b'), 'a b')
    U.strictEqual(IS.concat(IS.concat('a', 'b'), 'c'), IS.concat('a', IS.concat('b', 'c')))
  })

  it('struct', () => {
    // should ignore non own properties
    const S = _.struct(Object.create({ a: 1 }))
    U.deepStrictEqual(S.concat({}, {}), {})
  })

  it('semigroupAll', () => {
    const S = _.semigroupAll
    U.deepStrictEqual(S.concat(true, true), true)
    U.deepStrictEqual(S.concat(false, true), false)
    U.deepStrictEqual(S.concat(true, false), false)
    U.deepStrictEqual(S.concat(false, false), false)
  })

  it('semigroupAny', () => {
    const S = _.semigroupAny
    U.deepStrictEqual(S.concat(true, true), true)
    U.deepStrictEqual(S.concat(false, true), true)
    U.deepStrictEqual(S.concat(true, false), true)
    U.deepStrictEqual(S.concat(false, false), false)
  })

  it('semigroupSum', () => {
    U.deepStrictEqual(_.semigroupSum.concat(2, 3), 5)
  })

  it('semigroupProduct', () => {
    U.deepStrictEqual(_.semigroupProduct.concat(2, 3), 6)
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
    U.deepStrictEqual(S.concat(foo, bar), Object.assign({}, foo, bar))
  })
})
