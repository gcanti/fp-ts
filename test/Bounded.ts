import * as _ from '../src/Bounded'
import * as N from '../src/number'
import * as U from './util'

describe('Bounded', () => {
  it('clamp', () => {
    const B: _.Bounded<number> = {
      ...N.Ord,
      top: 10,
      bottom: 0
    }
    const clamp = _.clamp(B)
    U.deepStrictEqual(clamp(5), 5)
    U.deepStrictEqual(clamp(-1), 0)
    U.deepStrictEqual(clamp(11), 10)
  })

  it('reverse', () => {
    const B: _.Bounded<number> = _.reverse({
      ...N.Ord,
      top: 10,
      bottom: 0
    })
    U.deepStrictEqual(B.top, 0)
    U.deepStrictEqual(B.bottom, 10)
  })
})
