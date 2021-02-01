/**
 * @since 2.0.0
 */
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Ordering = -1 | 0 | 1

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const eqOrdering: Eq<Ordering> = {
  equals: (x, y) => x === y
}

/**
 * @category instances
 * @since 2.4.0
 */
export const monoidOrdering: Monoid<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y),
  empty: 0
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export function sign(n: number): Ordering {
  return n <= -1 ? -1 : n >= 1 ? 1 : 0
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

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `monoidOrdering` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: monoidOrdering.concat
}
