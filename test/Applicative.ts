import * as assert from 'assert'
import { getApplicativeComposition, getMonoid, when } from '../src/Applicative'
import { array } from '../src/Array'
import { either, left, right } from '../src/Either'
import { IO, io } from '../src/IO'
import { monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { failure, getApplicative, success } from '../src/Validation'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const arrayOption = getApplicativeComposition(array, option)
    const double = (n: number) => n * 2
    const inc = (n: number) => n + 1
    assert.deepEqual(arrayOption.ap([some(double), some(inc)], [some(1), some(2)]), [
      some(2),
      some(4),
      some(2),
      some(3)
    ])
    assert.deepEqual(arrayOption.ap([some(double), none], [some(1), some(2)]), [some(2), some(4), none, none])
  })

  it('when', () => {
    const log: Array<string> = []
    const action = new IO(() => {
      log.push('action called')
    })
    when(io)(false, action).run()
    assert.deepEqual(log, [])
    when(io)(true, action).run()
    assert.deepEqual(log, ['action called'])
  })

  it('getMonoid', () => {
    const MOption = getMonoid(option, monoidSum)()
    assert.deepEqual(MOption.concat(none, none), none)
    assert.deepEqual(MOption.concat(some(1), none), none)
    assert.deepEqual(MOption.concat(none, some(2)), none)
    assert.deepEqual(MOption.concat(some(1), some(2)), some(3))

    const MEither = getMonoid(either, monoidSum)<string>()
    assert.deepEqual(MEither.concat(left('a'), left('b')), left('a'))
    assert.deepEqual(MEither.concat(right(1), left('b')), left('b'))
    assert.deepEqual(MEither.concat(left('a'), right(2)), left('a'))
    assert.deepEqual(MEither.concat(right(1), right(2)), right(3))

    const validation = getApplicative(semigroupString)
    const MValidation = getMonoid(validation, monoidSum)()
    assert.deepEqual(MValidation.concat(failure('a'), failure('b')), failure('ab'))
    assert.deepEqual(MValidation.concat(success(1), failure('b')), failure('b'))
    assert.deepEqual(MValidation.concat(failure('a'), success(2)), failure('a'))
    assert.deepEqual(MValidation.concat(success(1), success(2)), success(3))
  })
})
