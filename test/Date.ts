import * as assert from 'assert'
import * as _ from '../src/Date'

describe('Date', () => {
  it('create', () => {
    const d1 = _.create()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(d1 instanceof Date, true)
    assert.deepStrictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = _.now()
    const m2 = new Date().getTime()
    assert.deepStrictEqual(m1, m2)
  })

  it('eqDate', () => {
    assert.deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 1)), true)
    assert.deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 2)), false)
  })

  it('eqMonth', () => {
    assert.deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1), new Date(2000, 10, 7)), true)
    assert.deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), false)
  })

  it('eqYear', () => {
    assert.deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), true)
    assert.deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1), new Date(2001, 11, 7)), false)
  })
})
