import * as _ from '../src/FoldableWithIndex'
import { pipe } from '../src/Function'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('FoldableWithIndex', () => {
  it('toEntriesComposition', () => {
    const toEntriesComposition = _.toEntriesComposition(RA.FoldableWithIndex, RA.FoldableWithIndex)
    U.deepStrictEqual(Array.from(pipe([['a'], [], ['c']], toEntriesComposition)), [
      [[0, 0], 'a'],
      [[2, 0], 'c']
    ])
  })
})
