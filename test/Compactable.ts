import * as _ from '../src/Compactable'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as O from '../src/Option'
import { separated } from '../src/Separated'
import * as E from '../src/Either'

describe('Compactable', () => {
  it('compactDefault', () => {
    const compact = _.compactDefault(RA.Functor)(RA.separate)
    U.deepStrictEqual(compact([]), [])
    U.deepStrictEqual(compact([O.some(1), O.some(2), O.some(3)]), [1, 2, 3])
    U.deepStrictEqual(compact([O.some(1), O.none, O.some(3)]), [1, 3])
  })

  it('separateDefault', () => {
    const separate = _.separateDefault(RA.Functor)(RA.compact)
    U.deepStrictEqual(separate([]), separated([], []))
    U.deepStrictEqual(separate([E.left(123), E.right('123')]), separated([123], ['123']))
  })
})
