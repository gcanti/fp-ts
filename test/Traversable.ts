import { pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/Traversable'
import * as U from './util'

describe('Traversable', () => {
  it('traverse', () => {
    const traverse = _.traverseComposition(RA.Traversable, RA.Traversable)
    U.deepStrictEqual(
      pipe(
        [[1, 2], [3]],
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.some([[1, 2], [3]])
    )
    U.deepStrictEqual(
      pipe(
        [[1, -2], [3]],
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.none
    )
  })
})
