/**
 * @since 3.0.0
 */
import * as eq from './Eq'
import type * as monoid from './Monoid'
import type * as semigroup from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Ordering = -1 | 0 | 1

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const reverse = (o: Ordering): Ordering => (o === -1 ? 1 : o === 1 ? -1 : 0)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match =
  <A, B, C = B>(onLessThan: () => A, onEqual: () => B, onGreaterThan: () => C) =>
  (o: Ordering): A | B | C =>
    o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan()

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<Ordering> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: semigroup.Semigroup<Ordering> = {
  concat: (second) => (first) => first !== 0 ? first : second
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: monoid.Monoid<Ordering> = {
  concat: Semigroup.concat,
  empty: 0
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)
