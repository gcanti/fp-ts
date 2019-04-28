import * as assert from 'assert'
import { left, right } from '../src/Either'
import { getMonoid as getArrayMonoid } from '../src/Array'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { getAlt, getMonad, getMonadThrow, getMonoid, getSemigroup } from '../src/Validation'

describe('Validation', () => {
  it('getMonad', () => {
    const M = getMonad(monoidString)
    const f = (s: string) => right(s.length)
    assert.deepStrictEqual(M.chain(right('abc'), f), right(3))
    assert.deepStrictEqual(M.chain(left('a'), f), left('a'))
    assert.deepStrictEqual(M.chain(left('a'), () => left('b')), left('a'))
    assert.deepStrictEqual(M.of(1), right(1))
    const double = (n: number) => n * 2
    assert.deepStrictEqual(M.ap(right(double), right(1)), right(2))
    assert.deepStrictEqual(M.ap(right(double), left('foo')), left('foo'))
    assert.deepStrictEqual(M.ap(left('foo'), right(1)), left('foo'))
    assert.deepStrictEqual(M.ap(left('foo'), left('bar')), left('foobar'))
  })

  it('getSemigroup', () => {
    const { concat } = getSemigroup(semigroupString, semigroupString)
    assert.deepStrictEqual(concat(right('a'), right('b')), right('ab'))
    assert.deepStrictEqual(concat(right('a'), left('b')), left('b'))
    assert.deepStrictEqual(concat(left('b'), right('a')), left('b'))
    assert.deepStrictEqual(concat(left('a'), left('b')), left('ab'))
  })

  it('getAlt', () => {
    const alt = getAlt(getArrayMonoid<number>())
    assert.deepStrictEqual(alt.alt(left([1]), () => right('a')), right('a'))
    assert.deepStrictEqual(alt.alt(right('a'), () => left([1])), right('a'))
    assert.deepStrictEqual(alt.alt(left([1]), () => left([2])), left([1, 2]))
  })

  it('getMonoid', () => {
    const M = getMonoid(monoidString, monoidSum)
    assert.deepStrictEqual(M.concat(right(1), right(2)), right(3))
    assert.deepStrictEqual(M.concat(right(1), left('foo')), left('foo'))
    assert.deepStrictEqual(M.concat(left('foo'), right(1)), left('foo'))
    assert.deepStrictEqual(M.concat(left('foo'), left('bar')), left('foobar'))
  })

  describe('getMonadThrow', () => {
    const M = getMonadThrow(monoidString)

    it('should obey the law', () => {
      assert.deepStrictEqual(M.chain(M.throwError('error'), a => M.of(a)), M.throwError('error'))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(M.fromOption(none, () => 'error'), left('error'))
      assert.deepStrictEqual(M.fromOption(some(1), () => 'error'), right(1))
    })
  })
})
