import { reverse, isSingular, coerceBound, fromRange, fromTuple, clamp, top, bottom, isWithin, toTuple, isValid } from '../src/Bounded'
import { BooleanAlgebra as b } from '../src/boolean'
import * as U from './util'
import * as n from '../src/number'
import { pipe } from '../src/function'
import fc from 'fast-check'
import * as Eq from '../src/Eq'

describe('Bounded', () => {

  it('top', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) =>
      pipe({ ...n.Ord, bottom: b, top: t }, top, val => n.Eq.equals(t, val))
    ))
  })

  it('bottom', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) =>
      pipe({ ...n.Ord, bottom: b, top: t }, bottom, val => n.Eq.equals(b, val))))
  })

  it('isValid', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (bottom, top) =>
      b.implies(
        bottom <= top,
        isValid({ ...n.Ord, bottom, top })
      )))
  })

  it('isSingular', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (bottom, top) =>
      b.implies(bottom === top, isSingular({ ...n.Ord, bottom, top }) &&
        b.implies(bottom !== top, !isSingular({ ...n.Ord, bottom, top })
        )))
    )
  })

  it('reverse', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (x, y) => {
      const bound = { ...n.Ord, bottom: x, top: y }
      const reverseBound = reverse(bound)

      return top(bound) === bottom(reverseBound) && bottom(bound) === top(reverseBound) &&
        bound.compare(x, y) === reverseBound.compare(y, x) &&
        b.implies(isValid(bound), isValid(reverseBound))

    }))
  })

  it('coerceBound', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (x, y) => {
      const bound = coerceBound(n.Ord)(x)(y)

      return isValid(bound) &&
        b.implies(x <= y, top(bound) === y && bottom(bound) === x) &&
        b.implies(y <= x, top(bound) === x && bottom(bound) === y)

    }))
  })

  it('toTuple', () => {
    fc.assert(fc.property(fc.integer(), (bottom) => {
      const top = bottom + 100

      return pipe(
        { ...n.Ord, bottom, top },
        toTuple,
        val => Eq.tuple(n.Eq, n.Eq).equals([bottom, top], val))
    }))
  })

  it('isWithin', () => {
    const inRange = isWithin({ ...n.Ord, bottom: 0, top: 10 })

    U.deepStrictEqual(inRange(2), true)
    U.deepStrictEqual(inRange(10), true)
    U.deepStrictEqual(inRange(0), true)
    U.deepStrictEqual(inRange(20), false)
    U.deepStrictEqual(inRange(-10), false)
  })

  it('fromRange', () => {
    const numRange = fromRange(n.Ord)

    U.deepStrictEqual(numRange(0)(10)._tag, 'Some')
    U.deepStrictEqual(numRange(0)(0)._tag, 'Some')
    U.deepStrictEqual(numRange(-1)(0)._tag, 'Some')
    U.deepStrictEqual(numRange(-1)(-2)._tag, 'None')
    U.deepStrictEqual(numRange(1)(0)._tag, 'None')
  })

  it('fromTuple', () => {
    const numRange = fromTuple(n.Ord)

    U.deepStrictEqual(numRange([0, 10])._tag, 'Some')
    U.deepStrictEqual(numRange([0,0])._tag, 'Some')
    U.deepStrictEqual(numRange([-1, 0])._tag, 'Some')
    U.deepStrictEqual(numRange([-1, -2])._tag, 'None')
    U.deepStrictEqual(numRange([1, 0])._tag, 'None')
  })

  it('clamp', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (bottom, val) => {
      const top = bottom + 100
      const bound = { ...n.Ord, bottom, top }

      const clampedValue = clamp(bound)(val)

      return b.implies(isWithin(bound)(val), clampedValue === val) &&
        b.implies(val < bottom, clampedValue === bottom) &&
        b.implies(val > top, clampedValue === top)
    }))
  })

})
