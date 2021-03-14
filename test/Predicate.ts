import * as _ from '../src/Predicate'
import * as U from './util'

describe('function', () => {
  it('not', () => {
    const n = _.not(Boolean)
    U.deepStrictEqual(n(false), true)
    U.deepStrictEqual(n(1), false)
    U.deepStrictEqual(n(''), true)
  })
})
