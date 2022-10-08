import * as B from '@fp-ts/core/boolean'
import { pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import * as _ from '@fp-ts/core/Semigroup'
import * as string from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

describe('Semigroup', () => {
  it('tuple', () => {
    const S1 = _.tuple(string.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])
    const S2 = _.tuple(string.Semigroup, N.SemigroupSum, B.SemigroupAll)
    U.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
  })

  it('combineAll', () => {
    U.deepStrictEqual(_.combineAll(string.Monoid)('')(['a', 'b', 'c']), 'abc')
    U.deepStrictEqual(_.combineAll(string.Monoid)('')(new Set(['a', 'b', 'c'])), 'abc')
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
    const DS = _.reverse(string.Semigroup)
    U.deepStrictEqual(pipe('a', DS.combine('b')), 'ba')
  })

  it('intercalate', () => {
    const IS = _.intercalate(' ')(string.Semigroup)
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
