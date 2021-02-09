import * as U from './util'
import { sequenceS, sequenceT } from '../src/Apply'
import * as RA from '../src/ReadonlyArray'
import * as E from '../src/Either'
import * as O from '../src/Option'
import { pipe } from '../src/function'

describe('Apply', () => {
  it('sequenceT', () => {
    const sequenceTOption = sequenceT(O.Applicative)
    U.deepStrictEqual(sequenceTOption(O.some(1)), O.some([1]))
    U.deepStrictEqual(sequenceTOption(O.some(1), O.some('a')), O.some([1, 'a']))
    U.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.some(true)), O.some([1, 'a', true]))
    U.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2)), O.some([1, 'a', true, 2]))
    U.deepStrictEqual(
      sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2), O.some('b')),
      O.some([1, 'a', true, 2, 'b'])
    )
    U.deepStrictEqual(
      sequenceTOption(O.some(1), O.some('a'), O.some(true), O.some(2), O.some('b'), O.some(false)),
      O.some([1, 'a', true, 2, 'b', false])
    )
    U.deepStrictEqual(sequenceTOption(O.some(1), O.some('a'), O.none), O.none)

    // #914
    const a1: ReadonlyArray<number> = [1, 2, 3]
    const a2: ReadonlyArray<string> = ['a', 'b', 'c']
    const a3: ReadonlyArray<boolean> = [true, false]
    U.deepStrictEqual(
      pipe(sequenceT(RA.Applicative)(a1, a2, a3), (arr) => arr.map(([x, y, z]) => `(${x}, ${y}, ${z})`)),
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
    U.deepStrictEqual(adoOption({ a: O.some(1) }), O.some({ a: 1 }))
    U.deepStrictEqual(adoOption({ a: O.some(1), b: O.some('a') }), O.some({ a: 1, b: 'a' }))
    U.deepStrictEqual(adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true) }), O.some({ a: 1, b: 'a', c: true }))
    U.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2) }),
      O.some({ a: 1, b: 'a', c: true, d: 2 })
    )
    U.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2), e: O.some('b') }),
      O.some({ a: 1, b: 'a', c: true, d: 2, e: 'b' })
    )
    U.deepStrictEqual(
      adoOption({ a: O.some(1), b: O.some('a'), c: O.some(true), d: O.some(2), e: O.some('b'), f: O.some(false) }),
      O.some({ a: 1, b: 'a', c: true, d: 2, e: 'b', f: false })
    )
    U.deepStrictEqual(adoOption({ a: O.some(1), b: O.none }), O.none)

    const adoEither = sequenceS(E.Applicative)
    U.deepStrictEqual(adoEither({ a: E.right(1) }), E.right({ a: 1 }))
    U.deepStrictEqual(adoEither({ a: E.right(1), b: E.right(2) }), E.right({ a: 1, b: 2 }))
    U.deepStrictEqual(adoEither({ a: E.right(1), b: E.left('error') }), E.left('error'))

    const adoValidation = sequenceS(E.getApplicativeValidation(RA.getMonoid<string>()))
    U.deepStrictEqual(adoValidation({ a: E.right(1) }), E.right({ a: 1 }))
    U.deepStrictEqual(adoValidation({ a: E.right(1), b: E.right(2) }), E.right({ a: 1, b: 2 }))
    U.deepStrictEqual(adoValidation({ a: E.right(1), b: E.left(['error']) }), E.left(['error']))
    U.deepStrictEqual(adoValidation({ a: E.left(['error1']), b: E.left(['error2']) }), E.left(['error1', 'error2']))

    // #914
    const a1: ReadonlyArray<number> = [1, 2, 3]
    const a2: ReadonlyArray<string> = ['a', 'b', 'c']
    const a3: ReadonlyArray<boolean> = [true, false]
    U.deepStrictEqual(
      pipe(sequenceS(RA.Applicative)({ a1, a2, a3 }), (arr) => arr.map(({ a1, a2, a3 }) => `(${a1}, ${a2}, ${a3})`)),
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
