/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 3.0.0
 */
import type { Endomorphism } from '../Endomorphism'
import * as ord from './Ord'
import type { Ord } from './Ord'

/**
 * @category model
 * @since 3.0.0
 */
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}

/**
 * Clamp a value between `bottom` and `top` values.
 *
 * @since 3.0.0
 */
export const clamp = <A>(B: Bounded<A>): Endomorphism<A> => ord.clamp(B)(B.bottom, B.top)

/**
 * Reverses the `Ord` of a `Bounded` and flips `top` and `bottom` values.
 *
 * @since 3.0.0
 */
export const reverse = <A>(B: Bounded<A>): Bounded<A> => ({
  compare: ord.reverse(B).compare,
  top: B.bottom,
  bottom: B.top
})
