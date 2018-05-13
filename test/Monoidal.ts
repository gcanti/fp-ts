import * as assert from 'assert'
import { either, left, right } from '../src/Either'
import { fromApplicative, toApplicative } from '../src/Monoidal'
import { none, option, some } from '../src/Option'

describe('Monoidal', () => {
  it('fromApplicative', () => {
    const M = fromApplicative(option)
    assert.deepEqual(M.mult(some(1), some('a')), some([1, 'a']))
    assert.deepEqual(M.mult(some(1), none), none)
    assert.deepEqual(M.unit(), some(undefined))
    const monoidalEither = fromApplicative(either)
    assert.deepEqual(monoidalEither.mult(right(1), right('a')), right([1, 'a']))
    assert.deepEqual(monoidalEither.mult(right(1), left('error')), left('error'))
  })

  it('toApplicative', () => {
    const M = fromApplicative(option)
    const F = toApplicative(M)
    const double = (n: number) => n * 2
    assert.deepEqual(F.ap(option.of(double), some(1)), some(2))
    assert.deepEqual(F.ap(option.of(double), none), none)
    assert.deepEqual(F.of(1), some(1))
  })
})
