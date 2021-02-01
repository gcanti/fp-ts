import { pipe } from '../src/function'
import { Eq, invert, Monoid, sign } from '../src/Ordering'
import { deepStrictEqual } from './util'

describe('Ordering', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    deepStrictEqual(Eq.equals(-1)(-1), true)
    deepStrictEqual(Eq.equals(-1)(0), false)
    deepStrictEqual(Eq.equals(-1)(1), false)
    deepStrictEqual(Eq.equals(0)(-1), false)
    deepStrictEqual(Eq.equals(0)(0), true)
    deepStrictEqual(Eq.equals(0)(1), false)
    deepStrictEqual(Eq.equals(1)(-1), false)
    deepStrictEqual(Eq.equals(1)(0), false)
    deepStrictEqual(Eq.equals(1)(1), true)
  })

  it('Monoid', () => {
    // concat
    deepStrictEqual(pipe(-1, Monoid.concat(-1)), -1)
    deepStrictEqual(pipe(-1, Monoid.concat(0)), -1)
    deepStrictEqual(pipe(-1, Monoid.concat(1)), -1)
    deepStrictEqual(pipe(0, Monoid.concat(-1)), -1)
    deepStrictEqual(pipe(0, Monoid.concat(0)), 0)
    deepStrictEqual(pipe(0, Monoid.concat(1)), 1)
    deepStrictEqual(pipe(1, Monoid.concat(-1)), 1)
    deepStrictEqual(pipe(1, Monoid.concat(0)), 1)
    deepStrictEqual(pipe(1, Monoid.concat(1)), 1)

    // empty
    deepStrictEqual(pipe(1, Monoid.concat(Monoid.empty)), 1)
    deepStrictEqual(pipe(Monoid.empty, Monoid.concat(1)), 1)
    deepStrictEqual(pipe(-1, Monoid.concat(Monoid.empty)), -1)
    deepStrictEqual(pipe(Monoid.empty, Monoid.concat(-1)), -1)
    deepStrictEqual(pipe(0, Monoid.concat(Monoid.empty)), 0)
    deepStrictEqual(pipe(Monoid.empty, Monoid.concat(0)), 0)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('invert', () => {
    deepStrictEqual(invert(-1), 1)
    deepStrictEqual(invert(0), 0)
    deepStrictEqual(invert(1), -1)
  })

  it('sign', () => {
    deepStrictEqual(sign(10), 1)
    deepStrictEqual(sign(0), 0)
    deepStrictEqual(sign(-10), -1)
  })
})
