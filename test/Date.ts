import { pipe } from '../src/function'
import * as O from '../src/Option'
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

  it('isValid', () => {
    U.deepStrictEqual(pipe(new Date('2000-10-01'), _.isValid), true)
    U.deepStrictEqual(pipe(new Date('not a date'), _.isValid), false)
  })

  it('fromString', () => {
    U.deepStrictEqual(pipe('2000-10-01', _.fromString), O.some(new Date('2000-10-01')))
    U.deepStrictEqual(pipe('not a date', _.fromString), O.none)
  })

  it('create', () => {
    const d1 = _.create()
    U.deepStrictEqual(d1 instanceof Date, true)
  })

  it('now', () => {
    const m1 = _.now()
    U.deepStrictEqual(typeof m1, 'number')
  })
})
