import * as assert from 'assert'
import { either, left, right } from '../src/Either'
import { fromApplicative, toApplicative } from '../src/Monoidal'
import { none, option, some } from '../src/Option'

describe('Monoidal', () => {
  it('fromApplicative', () => {
    const monoidalOption = fromApplicative(option)
    assert.deepEqual(monoidalOption.mult(some(1), some('a')), some([1, 'a']))
    assert.deepEqual(monoidalOption.mult(some(1), none), none)
    const monoidalEither = fromApplicative(either)
    assert.deepEqual(monoidalEither.mult(right(1), right('a')), right([1, 'a']))
    assert.deepEqual(monoidalEither.mult(right(1), left('error')), left('error'))
  })

  it('toApplicative', () => {
    const monoidalOption = fromApplicative(option)
    const applicative = toApplicative(monoidalOption)
    const double = (n: number) => n * 2
    assert.deepEqual(applicative.ap(option.of(double), some(1)), some(2))
    assert.deepEqual(applicative.ap(option.of(double), none), none)
  })
})
