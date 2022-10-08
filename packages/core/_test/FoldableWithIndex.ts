import * as _ from '@fp-ts/core/FoldableWithIndex'
import { pipe } from '@fp-ts/core/Function'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as U from '@fp-ts/core/test/util'

describe('FoldableWithIndex', () => {
  it('toEntriesComposition', () => {
    const toEntriesComposition = _.toEntriesComposition(RA.FoldableWithIndex, RA.FoldableWithIndex)
    U.deepStrictEqual(Array.from(pipe([['a'], [], ['c']], toEntriesComposition)), [
      [[0, 0], 'a'],
      [[2, 0], 'c']
    ])
  })
})
