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
    const action = new IO(() => {
      log.push('action called')
    })
    // tslint:disable-next-line: deprecation
    when(io)(false, action).run()
    assert.deepStrictEqual(log, [])
    // tslint:disable-next-line: deprecation
    when(io)(true, action).run()
    assert.deepStrictEqual(log, ['action called'])
  })

  it('getMonoid', () => {
    // tslint:disable-next-line: deprecation
    const MOption = getMonoid(option, monoidSum)()
    assert.deepStrictEqual(MOption.concat(none, none), none)
    assert.deepStrictEqual(MOption.concat(some(1), none), none)
    assert.deepStrictEqual(MOption.concat(none, some(2)), none)
    assert.deepStrictEqual(MOption.concat(some(1), some(2)), some(3))

    // tslint:disable-next-line: deprecation
    const MEither = getMonoid(either, monoidSum)<string>()
    assert.deepStrictEqual(MEither.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(MEither.concat(right(1), left('b')), left('b'))
    assert.deepStrictEqual(MEither.concat(left('a'), right(2)), left('a'))
    assert.deepStrictEqual(MEither.concat(right(1), right(2)), right(3))

    const validation = getApplicative(semigroupString)
    // tslint:disable-next-line: deprecation
    const MValidation = getMonoid(validation, monoidSum)()
    assert.deepStrictEqual(MValidation.concat(failure('a'), failure('b')), failure('ab'))
    assert.deepStrictEqual(MValidation.concat(success(1), failure('b')), failure('b'))
    assert.deepStrictEqual(MValidation.concat(failure('a'), success(2)), failure('a'))
    assert.deepStrictEqual(MValidation.concat(success(1), success(2)), success(3))
  })
})
