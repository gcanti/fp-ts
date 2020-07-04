import * as assert from 'assert'
import { sequenceS, sequenceT } from '../src/Apply'
import * as A from '../src/ReadonlyArray'
import * as E from '../src/Either'
import * as O from '../src/Option'
import { pipe } from '../src/function'

describe('Apply', () => {
  it('sequenceT', () => {
    const sequenceTOption = sequenceT(O.Applicative)
    assert.deepStrictEqual(sequenceTOption(O.some(1)), O.some([1]))
    assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('a')), O.some([1, 'a']))
    assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.some(true)), O.some([1, 'a', true]))
    assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2)), O.some([1, 'a', true, 2]))
    assert.deepStrictEqual(
      sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2), O.some('b')),
      O.some([1, 'a', true, 2, 'b'])
    )
    assert.deepStrictEqual(
      sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2), O.some('b'), O.some(false)),
      O.some([1, 'a', true, 2, 'b', false])
    )
    assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.none), O.none)

    // #914
    const a1: ReadonlyArray<number> = [1, 2, 3]
    const a2: ReadonlyArray<string> = ['a', 'b', 'c']
    const a3: ReadonlyArray<boolean> = [true, false]
    assert.deepStrictEqual(
      pipe(sequenceT(A.Applicative)(a1, a2, a3), (arr) => arr.map(([x, y, z]) => `(${x}, ${y}, ${z})`)),
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
    const adoOption = sequenceS(O.Applicative)
    assert.deepStrictEqual(adoOption({ a: O.some(1) }), O.some({ a: 1 }))
    assert.deepStrictEqual(adoOption({ a: O.some(1), b: O.some('a') }), O.some({ a: 1, b: 'a' }))
    assert.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true) }),
      O.some({ a: 1, b: 'a', c: true })
    )
    assert.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2) }),
      O.some({ a: 1, b: 'a', c: true, d: 2 })
    )
    assert.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2), e: O.some('b') }),
      O.some({ a: 1, b: 'a', c: true, d: 2, e: 'b' })
    )
    assert.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2), e: O.some('b'), f: O.some(false) }),
      O.some({ a: 1, b: 'a', c: true, d: 2, e: 'b', f: false })
    )
    assert.deepStrictEqual(adoOption({ a: O.some(1), b: O.none }), O.none)

    const adoEither = sequenceS(E.Applicative)
    assert.deepStrictEqual(adoEither({ a: E.right(1) }), E.right({ a: 1 }))
    assert.deepStrictEqual(adoEither({ a: E.right(1), b: E.right(2) }), E.right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoEither({ a: E.right(1), b: E.left('error') }), E.left('error'))

    const adoValidation = sequenceS(E.getApplicativeValidation(A.getMonoid<string>()))
    assert.deepStrictEqual(adoValidation({ a: E.right(1) }), E.right({ a: 1 }))
    assert.deepStrictEqual(adoValidation({ a: E.right(1), b: E.right(2) }), E.right({ a: 1, b: 2 }))
    assert.deepStrictEqual(adoValidation({ a: E.right(1), b: E.left(['error']) }), E.left(['error']))
    assert.deepStrictEqual(
      adoValidation({ a: E.left(['error1']), b: E.left(['error2']) }),
      E.left(['error1', 'error2'])
    )

    // #914
    const a1: ReadonlyArray<number> = [1, 2, 3]
    const a2: ReadonlyArray<string> = ['a', 'b', 'c']
    const a3: ReadonlyArray<boolean> = [true, false]
    assert.deepStrictEqual(
      pipe(sequenceS(A.Applicative)({ a1, a2, a3 }), (arr) => arr.map(({ a1, a2, a3 }) => `(${a1}, ${a2}, ${a3})`)),
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
