import { pipe } from '../src/function'
import * as _ from '../src/Traversable'
import * as RA from '../src/ReadonlyArray'
import * as R from '../src/ReadonlyRecord'
import * as O from '../src/Option'
import * as S from '../src/string'
import { deepStrictEqual } from './util'

describe('Traversable', () => {
  it('traverse', () => {
    const traverse = _.traverse(R.getTraversable(S.Ord), RA.Traversable)
    deepStrictEqual(
      pipe(
        { a: [1, 2], b: [3] },
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.some({ a: [1, 2], b: [3] })
    )
    deepStrictEqual(
      pipe(
        { a: [1, -2], b: [3] },
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.none
    )
  })
})
