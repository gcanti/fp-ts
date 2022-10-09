import * as _ from '../src/ToIterable'
import { pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('ToIterable', () => {
  it('toIterableComposition', () => {
    const toIterableComposition = _.toIterableComposition(RA.ToIterable, O.ToIterable)
    U.deepStrictEqual(Array.from(pipe([O.some('a'), O.none, O.some('c')], toIterableComposition)), ['a', 'c'])
  })
})
