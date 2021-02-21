import * as U from './util'
import * as _ from '../src/Ordering'

describe('Ordering', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    U.deepStrictEqual(_.Eq.equals(-1, -1), true)
    U.deepStrictEqual(_.Eq.equals(-1, 0), false)
    U.deepStrictEqual(_.Eq.equals(-1, 1), false)
    U.deepStrictEqual(_.Eq.equals(0, -1), false)
    U.deepStrictEqual(_.Eq.equals(0, 0), true)
    U.deepStrictEqual(_.Eq.equals(0, 1), false)
    U.deepStrictEqual(_.Eq.equals(1, -1), false)
    U.deepStrictEqual(_.Eq.equals(1, 0), false)
    U.deepStrictEqual(_.Eq.equals(1, 1), true)
  })

  it('Monoid', () => {
    // concat
    U.deepStrictEqual(_.Monoid.concat(-1, -1), -1)
    U.deepStrictEqual(_.Monoid.concat(-1, 0), -1)
    U.deepStrictEqual(_.Monoid.concat(-1, 1), -1)
    U.deepStrictEqual(_.Monoid.concat(0, -1), -1)
    U.deepStrictEqual(_.Monoid.concat(0, 0), 0)
    U.deepStrictEqual(_.Monoid.concat(0, 1), 1)
    U.deepStrictEqual(_.Monoid.concat(1, -1), 1)
    U.deepStrictEqual(_.Monoid.concat(1, 0), 1)
    U.deepStrictEqual(_.Monoid.concat(1, 1), 1)

    // empty
    U.deepStrictEqual(_.Monoid.concat(1, _.Monoid.empty), 1)
    U.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, 1), 1)
    U.deepStrictEqual(_.Monoid.concat(-1, _.Monoid.empty), -1)
    U.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, -1), -1)
    U.deepStrictEqual(_.Monoid.concat(0, _.Monoid.empty), 0)
    U.deepStrictEqual(_.Monoid.concat(_.Monoid.empty, 0), 0)
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('sign', () => {
    const f = _.match(
      () => 'lt',
      () => 'eq',
      () => 'gt'
    )
    U.deepStrictEqual(f(-1), 'lt')
    U.deepStrictEqual(f(0), 'eq')
    U.deepStrictEqual(f(1), 'gt')
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('sign', () => {
    U.deepStrictEqual(_.sign(10), 1)
    U.deepStrictEqual(_.sign(0), 0)
    U.deepStrictEqual(_.sign(-10), -1)
  })

  it('reverse', () => {
    U.deepStrictEqual(_.reverse(-1), 1)
    U.deepStrictEqual(_.reverse(0), 0)
    U.deepStrictEqual(_.reverse(1), -1)
  })
})
