import * as assert from 'assert'
import { create, now } from '../src/Date'

describe('Date', () => {
  it('create', () => {
    const d1 = create()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(d1 instanceof Date, true)
    assert.deepStrictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = now()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(m1, m2)
  })
})
