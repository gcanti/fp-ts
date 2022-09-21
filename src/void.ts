/**
 * @since 3.0.0
 */
import type * as monoid from './Monoid'
import * as semigroup from './Semigroup'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: semigroup.Semigroup<void> = semigroup.constant<void>(undefined)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: monoid.Monoid<void> = {
  combine: Semigroup.combine,
  empty: undefined
}
