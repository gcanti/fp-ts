import { fromRange, clamp, top, bottom, isWithin, isOverlapping, toTuple, isValid } from '../src/Bounded'
import * as U from './util'
import * as n from '../src/number'
import { pipe } from 'fp-ts/function'
import fc from 'fast-check'
import * as Eq from '../src/Eq'

describe('Bounded', () => {
  const numBound = fromRange(n.Ord)

  it('top', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) =>
      pipe(numBound(b)(t), top, Eq.isEqual(n.Eq)(t))
    ))
  })

  it('bottom', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) =>
      pipe(numBound(b)(t), bottom, Eq.isEqual(n.Eq)(b))
    ))
  })

  it('isValid', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) =>
      b <= t && pipe(numBound(b)(t), isValid)
    ))
  })

  it('toTuple', () => {
    fc.assert(fc.property(fc.integer(), fc.integer(), (b, t) => {
      pipe(numBound(b)(t), toTuple, Eq.isEqual(Eq.tuple(n.Eq, n.Eq))([b, t]))
    }))
  })

  it('clamp', () => {
    const clampNum = pipe(numBound(1)(10), clamp)

    U.deepStrictEqual(clampNum(2), 2)
    U.deepStrictEqual(clampNum(10), 10)
    U.deepStrictEqual(clampNum(20), 10)
    U.deepStrictEqual(clampNum(1), 1)
    U.deepStrictEqual(clampNum(-10), 0)
  })

  it('isWithin', () => {
    const withinRange = pipe(numBound(1)(10), isWithin)

    U.deepStrictEqual(withinRange(2), true)
    U.deepStrictEqual(withinRange(10), true)
    U.deepStrictEqual(withinRange(20), false)
    U.deepStrictEqual(withinRange(1), true)
    U.deepStrictEqual(withinRange(-10), false)
  })

  it('isOverlapping', () => {
    const boundOverlaps = pipe(numBound(0)(10), isOverlapping)

    U.deepStrictEqual(boundOverlaps(numBound(1)(5)), true)
    U.deepStrictEqual(boundOverlaps(numBound(10)(11)), true)
    U.deepStrictEqual(boundOverlaps(numBound(-1)(0)), true)
    U.deepStrictEqual(boundOverlaps(numBound(-2)(-1)), false)
    U.deepStrictEqual(boundOverlaps(numBound(11)(12)), false)
  })

})
