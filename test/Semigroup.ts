import { pipe } from '../src/function'
import * as N from '../src/number'
import * as _ from '../src/Semigroup'
import * as U from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Semigroup', () => {
  it('tuple', () => {
    const S1 = _.tuple(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])
    const S2 = _.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
    U.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
  })

  it('concatAll', () => {
    U.deepStrictEqual(_.concatAll(S.Monoid)('')(['a', 'b', 'c']), 'abc')
  })

  it('min', () => {
    const S = _.min(N.Ord)
    U.deepStrictEqual(pipe(1, S.concat(2)), 1)
  })

  it('max', () => {
    const S = _.max(N.Ord)
    U.deepStrictEqual(pipe(1, S.concat(2)), 2)
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
    const result = pipe(foo, S.concat(bar))
    const expected = Object.assign({}, foo, bar)
    U.deepStrictEqual(result.foo, expected.foo)
    U.deepStrictEqual(result.bar, expected.bar)
  })

  it('first', () => {
    const S = _.first<number>()
    U.deepStrictEqual(pipe(1, S.concat(2)), 1)
  })

  it('reverse', () => {
    const DS = _.reverse(S.Semigroup)
    U.deepStrictEqual(pipe('a', DS.concat('b')), 'ba')
  })

  it('intercalate', () => {
    const IS = _.intercalate(' ')(S.Semigroup)
    U.strictEqual(pipe('a', IS.concat('b')), 'a b')
    U.strictEqual(pipe('a', IS.concat('b'), IS.concat('c')), 'a b c')
  })

  it('constant', () => {
    const S = _.constant('a')
    U.strictEqual(S.concat('b')('c'), 'a')
  })
})
