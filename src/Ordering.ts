/**
 * @since 2.0.0
 */
import { Eq, eqStrict } from './Eq'
import { Monoid } from './Monoid'

/**
 * @category model
 * @since 2.0.0
 */
export type Ordering = -1 | 0 | 1

/**
 * @since 2.0.0
 */
export function sign(n: number): Ordering {
  return n <= -1 ? -1 : n >= 1 ? 1 : 0
}

/**
 * @category instances
 * @since 2.0.0
 */
export const eqOrdering: Eq<Ordering> = {
  equals: eqStrict.equals
}

/**
 * @category instances
 * @since 2.4.0
 */
export const monoidOrdering: Monoid<Ordering> = {
  concat: (second) => (first) => (first !== 0 ? first : second),
  empty: 0
}

/**
 * @since 2.0.0
 */
export function invert(O: Ordering): Ordering {
  switch (O) {
    case -1:
      return 1
    case 1:
      return -1
    default:
      return 0
  }
}
