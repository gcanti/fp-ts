/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 3.0.0
 */
import * as O from './Ord'

import Ord = O.Ord

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Clamp a value between `bottom` and `top` values.
 *
 * @category utils
 * @since 3.0.0
 */
export const clamp = <T>(B: Bounded<T>) => O.clamp(B)(B.bottom, B.top)

/**
 * Reverses the `Ord` of a `Bounded` and swaps `top` and `bottom` values.
 *
 * @category utils
 * @since 3.0.0
 */
export const reverse = <T>(B: Bounded<T>): Bounded<T> => {
  const R = O.reverse(B)
  return {
    compare: R.compare,
    top: B.bottom,
    bottom: B.top
  }
}
