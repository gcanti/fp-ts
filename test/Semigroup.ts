import { pipe } from '../src/function'
import * as N from '../src/number'
import * as _ from '../src/Semigroup'
import * as U from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Semigroup', () => {
  it('tuple', () => {
    const S1 = _.tuple(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])
    const S2 = _.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
    U.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
  })

  it('combineAll', () => {
    U.deepStrictEqual(_.combineAll(S.Monoid)('')(['a', 'b', 'c']), 'abc')
  })

  it('min', () => {
    const S = _.min(N.Ord)
    U.deepStrictEqual(pipe(1, S.combine(2)), 1)
  })

  it('max', () => {
    const S = _.max(N.Ord)
    U.deepStrictEqual(pipe(1, S.combine(2)), 2)
  })

  it('first', () => {
    const S = _.first<number>()
    U.deepStrictEqual(pipe(1, S.combine(2)), 1)
  })

  it('reverse', () => {
    const DS = _.reverse(S.Semigroup)
    U.deepStrictEqual(pipe('a', DS.combine('b')), 'ba')
  })

  it('intercalate', () => {
    const IS = _.intercalate(' ')(S.Semigroup)
    U.strictEqual(pipe('a', IS.combine('b')), 'a b')
    U.strictEqual(pipe('a', IS.combine('b'), IS.combine('c')), 'a b c')
  })

  it('constant', () => {
    const S = _.constant('a')
    U.strictEqual(S.combine('b')('c'), 'a')
  })

  it('struct', () => {
    // should ignore non own properties
    const semigroups = Object.create({ a: 1 })
    const s = _.struct(semigroups)
    U.deepStrictEqual(s.combine({})({}), {})
  })
})
