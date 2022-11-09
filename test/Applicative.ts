import * as U from './util'
import { getApplicativeComposition } from '../src/Applicative'
import * as RA from '../src/ReadonlyArray'
import * as O from '../src/Option'
import { increment } from '../src/function'

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    const AC = getApplicativeComposition(RA.Applicative, O.Applicative)
    U.deepStrictEqual(AC.of(1), [O.some(1)])
    U.deepStrictEqual(AC.map(AC.of(1), increment), [O.some(2)])
    U.deepStrictEqual(AC.ap([O.some(U.double), O.some(increment)], [O.some(1), O.some(2)]), [
      O.some(2),
      O.some(4),
      O.some(2),
      O.some(3)
    ])
    U.deepStrictEqual(AC.ap([O.some(U.double), O.none], [O.some(1), O.some(2)]), [O.some(2), O.some(4), O.none, O.none])
  })
})
