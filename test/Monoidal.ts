import * as assert from 'assert'
import { fromApplicative, toApplicative } from '../src/Monoidal'
import * as option from '../src/Option'
import * as either from '../src/Either'

describe('Monoidal', () => {
  it('fromApplicative', () => {
    const monoidalOption = fromApplicative(option)
    assert.deepEqual(monoidalOption.mult(option.some(1), option.some('a')), option.some([1, 'a']))
    assert.deepEqual(monoidalOption.mult(option.some(1), option.none), option.none)
    const monoidalEither = fromApplicative(either)
    assert.deepEqual(monoidalEither.mult(either.right(1), either.right('a')), either.right([1, 'a']))
    assert.deepEqual(monoidalEither.mult(either.right(1), either.left('error')), either.left('error'))
  })

  it('toApplicative', () => {
    const monoidalOption = fromApplicative(option)
    const applicative = toApplicative(monoidalOption)
    const double = (n: number) => n * 2
    assert.deepEqual(applicative.ap(option.of(double), option.some(1)), option.some(2))
    assert.deepEqual(applicative.ap(option.of(double), option.none), option.none)
  })
})
