import * as assert from 'assert'
import { applyFirst, applySecond, sequenceT, sequenceS } from '../src/Apply'
import { either, left, right } from '../src/Either'
import { none, option, some, isSome, isNone } from '../src/Option'
import * as fc from 'fast-check'
import { getSome } from './property-test/Option'
import { nonEmptyArray } from './property-test/NonEmptyArray'
import { catOptions, getSetoid } from '../src/Array'
import { fromEquals } from '../src/Setoid'

describe('Apply', () => {
  const r1 = right(1)
  const r2 = right(2)
  const foo = left('foo')
  const bar = left('bar')

  it('applyFirst', () => {
    assert.deepStrictEqual(applyFirst(option)(some(5), some(6)), some(5))
    assert.deepStrictEqual(applyFirst(option)(some(5), none), none)
    assert.deepStrictEqual(applyFirst(option)(none, some(6)), none)

    assert.deepStrictEqual(applyFirst(either)(r1, r2), r1)
    assert.deepStrictEqual(applyFirst(either)(foo, r1), foo)
    assert.deepStrictEqual(applyFirst(either)(r1, foo), foo)
    assert.deepStrictEqual(applyFirst(either)(foo, bar), foo)
  })

  it('applySecond', () => {
    assert.deepStrictEqual(applySecond(option)(some(5), some(6)), some(6))
    assert.deepStrictEqual(applySecond(option)(some(5), none), none)
    assert.deepStrictEqual(applySecond(option)(none, some(6)), none)

    assert.deepStrictEqual(applySecond(either)(r1, r2), r2)
    assert.deepStrictEqual(applySecond(either)(foo, r1), foo)
    assert.deepStrictEqual(applySecond(either)(r1, foo), foo)
    assert.deepStrictEqual(applySecond(either)(foo, bar), foo)
  })

  it('sequenceT', () => {
    const sequenceTOption = sequenceT(option)
    assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)

    const S = getSetoid(fromEquals((x, y) => x === y))
    const somes = getSome(fc.oneof<string | number>(fc.string(), fc.integer()))
    const allSomesInput = nonEmptyArray(somes)
    const maybeNoneInput = nonEmptyArray(fc.oneof(fc.constant(none), somes))
    const input = fc.oneof(allSomesInput, maybeNoneInput)
    fc.assert(
      fc.property(input, options => {
        const x = sequenceTOption(...(options as any))
        return (
          (options.every(isSome) && isSome(x) && S.equals(x.value as any, catOptions(options))) ||
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
  })
})
