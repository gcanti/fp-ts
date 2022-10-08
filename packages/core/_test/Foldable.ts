import * as _ from '@fp-ts/core/Foldable'
import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as U from '@fp-ts/core/test/util'

describe('Foldable', () => {
  it('toIterableComposition', () => {
    const toIterableComposition = _.toIterableComposition(RA.Foldable, O.Foldable)
    U.deepStrictEqual(Array.from(pipe([O.some('a'), O.none, O.some('c')], toIterableComposition)), ['a', 'c'])
  })
})
