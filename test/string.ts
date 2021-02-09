import * as U from './util'
import * as _ from '../src/string'

describe('string', () => {
  it('Show', () => {
    U.deepStrictEqual(_.Show.show('a'), '"a"')
  })
})
