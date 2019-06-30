import { Semigroup } from './Semigroup'
import { Eq } from './Eq'

/**
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
 * @since 2.0.0
 */
export const eqOrdering: Eq<Ordering> = {
  equals: (x, y) => x === y
}

/**
 * @since 2.0.0
 */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y)
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
