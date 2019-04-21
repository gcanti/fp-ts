import * as assert from 'assert'
import { getApplicativeComposition, getMonoid, when } from '../src/Applicative'
import { array } from '../src/Array'
import { either, left, right } from '../src/Either'
import { io } from '../src/IO'
import { monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { getApplicative } from '../src/Validation'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, option)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepStrictEqual(arrayOption.ap([some(double), some(inc)], [some(1), some(2)]), [
      some(2),
      some(4),
      some(2),
      some(3)
    ])
    assert.deepStrictEqual(arrayOption.ap([some(double), none], [some(1), some(2)]), [some(2), some(4), none, none])
  })

  it('when', () => {
    const log: Array<string> = []
    const action = () => {
      log.push('action called')
    }
    when(io)(false, action)()
    assert.deepStrictEqual(log, [])
    when(io)(true, action)()
    assert.deepStrictEqual(log, ['action called'])
  })

  it('getMonoid', () => {
    const MOption = getMonoid(option, monoidSum)()
    assert.deepStrictEqual(MOption.concat(none, none), none)
    assert.deepStrictEqual(MOption.concat(some(1), none), none)
    assert.deepStrictEqual(MOption.concat(none, some(2)), none)
    assert.deepStrictEqual(MOption.concat(some(1), some(2)), some(3))

    const MEither = getMonoid(either, monoidSum)<string>()
    assert.deepStrictEqual(MEither.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(MEither.concat(right(1), left('b')), left('b'))
    assert.deepStrictEqual(MEither.concat(left('a'), right(2)), left('a'))
    assert.deepStrictEqual(MEither.concat(right(1), right(2)), right(3))

    const validation = getApplicative(semigroupString)
    const MValidation = getMonoid(validation, monoidSum)()
    assert.deepStrictEqual(MValidation.concat(left('a'), left('b')), left('ab'))
    assert.deepStrictEqual(MValidation.concat(right(1), left('b')), left('b'))
    assert.deepStrictEqual(MValidation.concat(left('a'), right(2)), left('a'))
    assert.deepStrictEqual(MValidation.concat(right(1), right(2)), right(3))
  })
})
