import * as U from './util'
import * as _ from '../src/Tuple'

describe('Tuple', () => {
  it('swap', () => {
    U.deepStrictEqual(_.swap([1, 'a']), ['a', 1])
  })
})
