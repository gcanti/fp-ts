/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 2.0.0
 */
import * as Ord from './Ord'
import { Option, fromPredicate } from './Option'
import * as n from './number'
import { pipe } from './function'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bounded<A> extends Ord.Ord<A> {
  readonly top: A
  readonly bottom: A
}

// -------------------------------------------------------------------------------------
// deconstructors
// -------------------------------------------------------------------------------------

/**
 * @category deconstructors
 * @since 2.12.0
 */
export const top = <T>(B: Bounded<T>) => B.top

/**
 * @category deconstructors
 * @since 2.12.0
 */
export const bottom = <T>(B: Bounded<T>) => B.bottom

/**
 * Returns the tuple [bottom, top].
 *
 * @category deconstructors
 * @since 2.12.0
 */
export const toTuple = <T>(B: Bounded<T>): [T, T] =>
    [B.bottom, B.top]

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Test that top >= bottom
 *
 * @category guards
 * @since 2.12.0
 */
export const isValid = <T>(B: Bounded<T>) =>
    Ord.leq(B)(B.bottom, B.top)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns an instance of Bounded from a range of values.
 * Returns none if bottom > top and some if top >= bottom.
 *
 * @category constructors
 * @since 2.12.0
 */
export const fromRange = <T>(O: Ord.Ord<T>) => (b: T) => (t: T): Option<Bounded<T>> =>
  pipe({ ...O, top: t, bottom: b }, fromPredicate(isValid))

/**
 * Creates an instance of Bounded from the tuple [bottom, top].
 * Returns none if fst > snd and some if snd >= fst.
 *
 * @category constructors
 * @since 2.12.0
 */
export const fromTuple = <T>(O: Ord.Ord<T>) => ([b, t]: [T, T]) =>
  fromRange(O)(b)(t)

/**
 * Returns a valid instance of Bounded given two values where top is the greater of
 * the two values and bottom is set to the smaller of the values.
 *
 * @category constructors
 * @since 2.12.0
 */
export const coerceBound = <T>(O: Ord.Ord<T>) => (b: T) => (t: T): Bounded<T> =>
  Ord.leq(O)(b, t) ? ({ ...O, bottom: b, top: t }) : ({ ...O, bottom: t, top: b })

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Clamp a value between bottom and top values.
 *
 * @category utils
 * @since 2.12.0
 */
export const clamp = <T>(B: Bounded<T>) =>
    Ord.clamp(B)(B.bottom, B.top)

/**
 * Tests whether a value lies between the top and bottom values of bound.
 *
 * @category utils
 * @since 2.12.0
 */
export const isWithin = <T>(B: Bounded<T>) =>
    Ord.between(B)(B.bottom, B.top)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use [`Bounded`](./number.ts.html#bounded) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const boundedNumber: Bounded<number> = {
  equals: n.Ord.equals,
  compare: n.Ord.compare,
  top: Infinity,
  bottom: -Infinity
}
