import * as _ from '../src/Foldable'
import { pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('Foldable', () => {
  it('toIterableComposition', () => {
    const toIterableComposition = _.toIterableComposition(RA.Foldable, O.Foldable)
    U.deepStrictEqual(Array.from(pipe([O.some('a'), O.none, O.some('c')], toIterableComposition)), ['a', 'c'])
  })
})
