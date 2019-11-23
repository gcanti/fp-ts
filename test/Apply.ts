import * as assert from 'assert'
import { sequenceS, sequenceT } from '../src/Apply'
import { array, getMonoid } from '../src/Array'
import { either, getValidation, left, right } from '../src/Either'
import { none, option, some } from '../src/Option'
import { pipe } from '../src/pipeable'

describe('Apply', () => {
  it('sequenceT', () => {
    const sequenceTOption = sequenceT(option)
    assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
    assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)

    // #914
    const a1 = [1, 2, 3]
    const a2 = ['a', 'b', 'c']
    const a3 = [true, false]
    assert.deepStrictEqual(
      pipe(
        sequenceT(array)(a1, a2, a3),
        arr => arr.map(([x, y, z]) => `(${x}, ${y}, ${z})`)
      ),
      [
        '(1, a, true)',
        '(1, a, false)',
        '(1, b, true)',
        '(1, b, false)',
        '(1, c, true)',
        '(1, c, false)',
        '(2, a, true)',
        '(2, a, false)',
        '(2, b, true)',
        '(2, b, false)',
        '(2, c, true)',
        '(2, c, false)',
        '(3, a, true)',
        '(3, a, false)',
        '(3, b, true)',
        '(3, b, false)',
        '(3, c, true)',
        '(3, c, false)'
      ]
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

    const adoValidation = sequenceS(getValidation(getMonoid<string>()))
    assert.deepStrictEqual(adoValidation({ a: right(1) }), right({ a: 1 }))
    assert.deepStrictEqual(adoValidation({ a: right(1), b: right(2) }), right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoValidation({ a: right(1), b: left(['error']) }), left(['error']))
    assert.deepStrictEqual(adoValidation({ a: left(['error1']), b: left(['error2']) }), left(['error1', 'error2']))

    // #914
    const a1 = [1, 2, 3]
    const a2 = ['a', 'b', 'c']
    const a3 = [true, false]
    assert.deepStrictEqual(
      pipe(
        sequenceS(array)({ a1, a2, a3 }),
        arr => arr.map(({ a1, a2, a3 }) => `(${a1}, ${a2}, ${a3})`)
      ),
      [
        '(1, a, true)',
        '(1, a, false)',
        '(1, b, true)',
        '(1, b, false)',
        '(1, c, true)',
        '(1, c, false)',
        '(2, a, true)',
        '(2, a, false)',
        '(2, b, true)',
        '(2, b, false)',
        '(2, c, true)',
        '(2, c, false)',
        '(3, a, true)',
        '(3, a, false)',
        '(3, b, true)',
        '(3, b, false)',
        '(3, c, true)',
        '(3, c, false)'
      ]
    )
  })
})
