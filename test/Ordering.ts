import { pipe } from '../src/function'
import { eqOrdering, invert, monoidOrdering, sign } from '../src/Ordering'
import { deepStrictEqual } from './util'

describe('Ordering', () => {
  it('sign', () => {
    deepStrictEqual(sign(10), 1)
    deepStrictEqual(sign(0), 0)
    deepStrictEqual(sign(-10), -1)
  })

  it('eqOrdering', () => {
    deepStrictEqual(eqOrdering.equals(-1)(-1), true)
    deepStrictEqual(eqOrdering.equals(-1)(0), false)
    deepStrictEqual(eqOrdering.equals(-1)(1), false)
    deepStrictEqual(eqOrdering.equals(0)(-1), false)
    deepStrictEqual(eqOrdering.equals(0)(0), true)
    deepStrictEqual(eqOrdering.equals(0)(1), false)
    deepStrictEqual(eqOrdering.equals(1)(-1), false)
    deepStrictEqual(eqOrdering.equals(1)(0), false)
    deepStrictEqual(eqOrdering.equals(1)(1), true)
  })

  it('monoidOrdering', () => {
    // concat
    deepStrictEqual(pipe(-1, monoidOrdering.concat(-1)), -1)
    deepStrictEqual(pipe(-1, monoidOrdering.concat(0)), -1)
    deepStrictEqual(pipe(-1, monoidOrdering.concat(1)), -1)
    deepStrictEqual(pipe(0, monoidOrdering.concat(-1)), -1)
    deepStrictEqual(pipe(0, monoidOrdering.concat(0)), 0)
    deepStrictEqual(pipe(0, monoidOrdering.concat(1)), 1)
    deepStrictEqual(pipe(1, monoidOrdering.concat(-1)), 1)
    deepStrictEqual(pipe(1, monoidOrdering.concat(0)), 1)
    deepStrictEqual(pipe(1, monoidOrdering.concat(1)), 1)

    // empty
    deepStrictEqual(pipe(1, monoidOrdering.concat(monoidOrdering.empty)), 1)
    deepStrictEqual(pipe(monoidOrdering.empty, monoidOrdering.concat(1)), 1)
    deepStrictEqual(pipe(-1, monoidOrdering.concat(monoidOrdering.empty)), -1)
    deepStrictEqual(pipe(monoidOrdering.empty, monoidOrdering.concat(-1)), -1)
    deepStrictEqual(pipe(0, monoidOrdering.concat(monoidOrdering.empty)), 0)
    deepStrictEqual(pipe(monoidOrdering.empty, monoidOrdering.concat(0)), 0)
  })

  it('invert', () => {
    deepStrictEqual(invert(-1), 1)
    deepStrictEqual(invert(0), 0)
    deepStrictEqual(invert(1), -1)
  })
})
