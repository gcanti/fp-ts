import * as _ from '../src/Compactable'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as E from '../src/Either'

describe('Compactable', () => {
  it('separate', () => {
    const separate = _.separate(RA.Functor)(RA.compact)
    U.deepStrictEqual(separate([]), [[], []])
    U.deepStrictEqual(separate([E.left(123), E.right('123')]), [[123], ['123']])
  })
})
