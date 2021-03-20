import { pipe } from '../src/function'
import * as _ from '../src/tuple'
import * as U from './util'

describe('tuple', () => {
  it('evolve', () => {
    U.deepStrictEqual(
      pipe(
        _.tuple('a', 1, true),
        _.evolve(
          (s) => s.length,
          (b) => b > 0,
          (c) => !c
        )
      ),
      [1, true, false]
    )
  })
})
