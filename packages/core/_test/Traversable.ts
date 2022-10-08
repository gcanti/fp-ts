import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as R from '@fp-ts/core/ReadonlyRecord'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'
import * as _ from '@fp-ts/core/Traversable'

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
