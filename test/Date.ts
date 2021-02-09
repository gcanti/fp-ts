import * as U from './util'
import * as _ from '../src/Date'

describe('Date', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    U.deepStrictEqual(_.Eq.equals(new Date(0), new Date(0)), true)
    U.deepStrictEqual(_.Eq.equals(new Date(0), new Date(1)), false)
    U.deepStrictEqual(_.Eq.equals(new Date(1), new Date(0)), false)
  })

  it('eqDate', () => {
    U.deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 1)), true)
    U.deepStrictEqual(_.eqDate.equals(new Date(2000, 10, 1), new Date(2000, 11, 2)), false)
  })

  it('eqMonth', () => {
    U.deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1), new Date(2000, 10, 7)), true)
    U.deepStrictEqual(_.eqMonth.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), false)
  })

  it('eqYear', () => {
    U.deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1), new Date(2000, 11, 7)), true)
    U.deepStrictEqual(_.eqYear.equals(new Date(2000, 10, 1), new Date(2001, 11, 7)), false)
  })

  it('Ord', () => {
    U.deepStrictEqual(_.Ord.compare(new Date(0), new Date(0)), 0)
    U.deepStrictEqual(_.Ord.compare(new Date(0), new Date(1)), -1)
    U.deepStrictEqual(_.Ord.compare(new Date(1), new Date(0)), 1)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('create', () => {
    const d1 = _.create()
    const m2 = new Date().getTime()
    U.deepStrictEqual(d1 instanceof Date, true)
    U.deepStrictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = _.now()
    const m2 = new Date().getTime()
    U.deepStrictEqual(m1, m2)
  })
})
