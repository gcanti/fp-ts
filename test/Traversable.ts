import { pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import * as S from '../src/string'
import * as _ from '../src/Traversable'
import * as U from './util'

describe('Traversable', () => {
  it('traverse', () => {
    const traverse = _.traverseComposition(R.getTraversable(S.Ord), RA.Traversable)
    U.deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.some({ a: [1, 2], b: [3] })
    )
    U.deepStrictEqual(
      pipe(
        { a: [1, -2], b: [3] },
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.none
    )
  })
})
