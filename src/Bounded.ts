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
 * @since 2.0.0
 */
export const top = <T>(b: Bounded<T>) => b.top

/**
 * @category deconstructors
 * @since 2.0.0
 */
export const bottom = <T>(b: Bounded<T>) => b.bottom

/**
 * Returns the tuple [bottom, top].
 *
 * @category deconstructors
 * @since 2.0.0
 */
export const toTuple = <T>(bound: Bounded<T>): [T, T] =>
    [bound.bottom, bound.top]

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Test that top >= bottom
 *
 * @category guards
 * @since 2.0.0
 */
export const isValid = <T>(bound: Bounded<T>) =>
    Ord.geq(bound)(bound.bottom, bound.top)

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns an instance of Bounded from a range of values.
 * Returns none if bottom > top and some if top >= bottom.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromRange = <T>(ord: Ord.Ord<T>) => (b: T) => (t: T): Bounded<T> =>
  ({ ...ord, bottom: b, top: t })

/**
 * Creates an instance of Bounded from the tuple [bottom, top].
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromTuple = <T>(ord: Ord.Ord<T>) => ([b, t]: [T, T]): Bounded<T> =>

  fromRange(ord)(b)(t)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Clamp a value between bottom and top values.
 *
 * @category utils
 * @since 2.0.0
 */
export const clamp = <T>(bound: Bounded<T>) =>
    Ord.clamp(bound)(bound.bottom, bound.top)

/**
 * Tests if two bounds are overlapping
 *
 * @category utils
 * @since 2.0.0
 */
export const isOverlapping = <T>(a: Bounded<T>) => (b: Bounded<T>) =>
    Ord.leq(a)(a.bottom, b.top) && Ord.geq(a)(a.top, b.bottom)

/**
 * Tests whether a value lies between the top and bottom values of bound.
 *
 * @category util
 * s
 * @since 2.0.0
 */
export const isWithin = <T>(bound: Bounded<T>) =>
    Ord.between(bound)(bound.bottom, bound.top)

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
  equals: ordNumber.equals,
  compare: ordNumber.compare,
  top: Infinity,
  bottom: -Infinity
}
