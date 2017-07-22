import * as assert from 'assert'
import * as array from '../src/Array'
import { Reader, distribute } from '../src/Reader'

describe('Reader', () => {
  it('distribute', () => {
    assert.deepEqual(distribute(array)([new Reader((n: number) => n + 1), new Reader((n: number) => n * 2)]).run(2), [
      3,
      4
    ])
  })
})
