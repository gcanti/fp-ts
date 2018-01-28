import { Ord, ordNumber } from './Ord'

/**
 * The `Bounded` type class represents totally ordered types that have an
 * upper and lower boundary.
 *
 * Instances should satisfy the following law in addition to the `Ord` laws:
 *
 * - Bounded: `bottom <= a <= top`
 * @typeclass
 */
export interface Bounded<A> extends Ord<A> {
  top: A
  bottom: A
}

/** @instance */
export const boundedNumber: Bounded<number> = {
  ...ordNumber,
  top: Infinity,
  bottom: -Infinity
}
