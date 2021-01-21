import * as _ from '../src/Date'
import { deepStrictEqual } from './util'

describe('Date', () => {
  it('create', () => {
    const d1 = _.create()
    const m2 = new Date().getTime()
    deepStrictEqual(d1 instanceof Date, true)
    deepStrictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = _.now()
    const m2 = new Date().getTime()
    deepStrictEqual(m1, m2)
  })

  it('eqDate', () => {
    deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1))(new Date(2000, 11, 1)), true)
    deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1))(new Date(2000, 11, 2)), false)
  })

  it('eqMonth', () => {
    deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1))(new Date(2000, 10, 7)), true)
    deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1))(new Date(2000, 11, 7)), false)
  })

  it('eqYear', () => {
    deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1))(new Date(2000, 11, 7)), true)
    deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1))(new Date(2001, 11, 7)), false)
  })
})
