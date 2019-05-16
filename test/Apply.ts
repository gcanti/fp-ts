import * as assert from 'assert'
import { sequenceT, sequenceS } from '../src/Apply'
import { either, left, right } from '../src/Either'
import { none, option, some, isSome, isNone } from '../src/Option'
import * as fc from 'fast-check'
import { getSome } from './property-test/Option'
import { nonEmptyArray } from './property-test/NonEmptyArray'
import { getEq, array, getMonoid } from '../src/Array'
import { fromEquals } from '../src/Eq'
import { getApplicative } from '../src/Validation'

describe('Apply', () => {
  it('sequenceT', () => {
    const sequenceTOption = sequenceT(option)
    assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)

    const S = getEq(fromEquals((x, y) => x === y))
    const somes = getSome(fc.oneof<string | number>(fc.string(), fc.integer()))
    const allSomesInput = nonEmptyArray(somes)
    const maybeNoneInput = nonEmptyArray(fc.oneof(fc.constant(none), somes))
    const input = fc.oneof(allSomesInput, maybeNoneInput)
    fc.assert(
      fc.property(input, options => {
        const x = sequenceTOption(...(options as any))
        return (
          (options.every(isSome) && isSome(x) && S.equals(x.value as any, array.compact(options))) ||
          (options.some(isNone) && isNone(x))
        )
      })
    )
  })

  it('sequenceS', () => {
    const adoOption = sequenceS(option)
    assert.deepStrictEqual(adoOption({ a: some(1) }), some({ a: 1 }))
    assert.deepStrictEqual(adoOption({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoOption({ a: some(1), b: none }), none)

    const adoEither = sequenceS(either)
    assert.deepStrictEqual(adoEither({ a: right(1) }), right({ a: 1 }))
    assert.deepStrictEqual(adoEither({ a: right(1), b: right(2) }), right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoEither({ a: right(1), b: left('error') }), left('error'))

    const adoValidation = sequenceS(getApplicative(getMonoid<string>()))
    assert.deepStrictEqual(adoValidation({ a: right(1) }), right({ a: 1 }))
    assert.deepStrictEqual(adoValidation({ a: right(1), b: right(2) }), right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoValidation({ a: right(1), b: left(['error']) }), left(['error']))
    assert.deepStrictEqual(adoValidation({ a: left(['error1']), b: left(['error2']) }), left(['error1', 'error2']))
  })
})
