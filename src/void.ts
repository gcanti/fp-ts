/**
 * @since 3.0.0
 */
import type * as monoid from './Monoid'
import * as semigroup from './Semigroup'

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: semigroup.Semigroup<void> = /*#__PURE__*/ semigroup.constant<void>(undefined)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: monoid.Monoid<void> = {
  combine: Semigroup.combine,
  empty: undefined
}
