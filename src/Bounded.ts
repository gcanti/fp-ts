/**
 * The `Bounded` type class represents totally ordered types that have an upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 *
 * @since 2.0.0
 */
import { Ord, ordNumber } from './Ord'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}

/**
 * @category instances
 * @since 2.0.0
 */
export const boundedNumber: Bounded<number> = {
  equals: ordNumber.equals,
  compare: ordNumber.compare,
  top: Infinity,
  bottom: -Infinity
}
