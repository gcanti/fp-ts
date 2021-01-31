import * as assert from 'assert'
import * as _ from '../src/string'

describe('string', () => {
  it('Show', () => {
    assert.deepStrictEqual(_.Show.show('a'), '"a"')
  })
})
