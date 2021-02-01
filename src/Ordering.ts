/**
 * @since 3.0.0
 */
import * as E from './Eq'
import { Endomorphism } from './function'
import * as M from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Ordering = -1 | 0 | 1

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: E.Eq<Ordering> = E.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: M.Monoid<Ordering> = {
  concat: (second) => (first) => (first !== 0 ? first : second),
  empty: 0
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)

/**
 * @since 3.0.0
 */
export const invert: Endomorphism<Ordering> = (O) => {
  switch (O) {
    case -1:
      return 1
    case 1:
      return -1
    default:
      return 0
  }
}
