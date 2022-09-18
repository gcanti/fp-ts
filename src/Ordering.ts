/**
 * @since 3.0.0
 */
import * as EqModule from './Eq'
import * as MonoidModule from './Monoid'
import * as SemigroupModule from './Semigroup'

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
export const match = <A, B, C = B>(onLessThan: () => A, onEqual: () => B, onGreaterThan: () => C) => (
  o: Ordering
): A | B | C => (o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan())

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: EqModule.Eq<Ordering> = EqModule.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: SemigroupModule.Semigroup<Ordering> = {
  concat: (second) => (first) => (first !== 0 ? first : second)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: MonoidModule.Monoid<Ordering> = {
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
