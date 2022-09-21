import { pipe } from '../src/function'
import * as _ from '../src/Ordering'
import { deepStrictEqual } from './util'

describe('Ordering', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    deepStrictEqual(_.Eq.equals(-1)(-1), true)
    deepStrictEqual(_.Eq.equals(-1)(0), false)
    deepStrictEqual(_.Eq.equals(-1)(1), false)
    deepStrictEqual(_.Eq.equals(0)(-1), false)
    deepStrictEqual(_.Eq.equals(0)(0), true)
    deepStrictEqual(_.Eq.equals(0)(1), false)
    deepStrictEqual(_.Eq.equals(1)(-1), false)
    deepStrictEqual(_.Eq.equals(1)(0), false)
    deepStrictEqual(_.Eq.equals(1)(1), true)
  })

  it('Monoid', () => {
    // combine
    deepStrictEqual(pipe(-1, _.Monoid.combine(-1)), -1)
    deepStrictEqual(pipe(-1, _.Monoid.combine(0)), -1)
    deepStrictEqual(pipe(-1, _.Monoid.combine(1)), -1)
    deepStrictEqual(pipe(0, _.Monoid.combine(-1)), -1)
    deepStrictEqual(pipe(0, _.Monoid.combine(0)), 0)
    deepStrictEqual(pipe(0, _.Monoid.combine(1)), 1)
    deepStrictEqual(pipe(1, _.Monoid.combine(-1)), 1)
    deepStrictEqual(pipe(1, _.Monoid.combine(0)), 1)
    deepStrictEqual(pipe(1, _.Monoid.combine(1)), 1)

    // empty
    deepStrictEqual(pipe(1, _.Monoid.combine(_.Monoid.empty)), 1)
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(1)), 1)
    deepStrictEqual(pipe(-1, _.Monoid.combine(_.Monoid.empty)), -1)
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(-1)), -1)
    deepStrictEqual(pipe(0, _.Monoid.combine(_.Monoid.empty)), 0)
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(0)), 0)
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', () => {
    const f = _.match(
      () => 'lt',
      () => 'eq',
      () => 'gt'
    )
    deepStrictEqual(f(-1), 'lt')
    deepStrictEqual(f(0), 'eq')
    deepStrictEqual(f(1), 'gt')
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('reverse', () => {
    deepStrictEqual(_.reverse(-1), 1)
    deepStrictEqual(_.reverse(0), 0)
    deepStrictEqual(_.reverse(1), -1)
  })

  it('sign', () => {
    deepStrictEqual(_.sign(10), 1)
    deepStrictEqual(_.sign(0), 0)
    deepStrictEqual(_.sign(-10), -1)
  })
})
