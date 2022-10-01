import * as _ from '../src/Compactable'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as O from '../src/Option'
import * as E from '../src/Either'

describe('Compactable', () => {
  it('compactDefault', () => {
    const compact = _.compact(RA.Functor)(RA.separate)
    U.deepStrictEqual(compact([]), [])
    U.deepStrictEqual(compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
    U.deepStrictEqual(compact([O.some(1), O.none, O.some(3)]), [1, 3])
  })

  it('separateDefault', () => {
    const separate = _.separate(RA.Functor)(RA.compact)
    U.deepStrictEqual(separate([]), [[], []])
    U.deepStrictEqual(separate([E.left(123), E.right('123')]), [[123], ['123']])
  })
})
