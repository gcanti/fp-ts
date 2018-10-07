import * as assert from 'assert'
import { now } from '../src/Date'

describe('Date', () => {
  it('now', () => {
    const d1 = now.run()
    const d2 = new Date()
    assert.strictEqual(d1 instanceof Date, true)
    assert.strictEqual(d1.getTime(), d2.getTime())
  })
})
