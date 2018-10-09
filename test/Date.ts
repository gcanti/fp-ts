import * as assert from 'assert'
import { create, now } from '../src/Date'

describe('Date', () => {
  it('create', () => {
    const d1 = create.run()
    const m2 = new Date().getTime()
    assert.strictEqual(d1 instanceof Date, true)
    assert.strictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = now.run()
    const m2 = new Date().getTime()
    assert.strictEqual(m1, m2)
  })
})
