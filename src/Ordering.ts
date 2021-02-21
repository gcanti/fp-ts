/**
 * @since 3.0.0
 */
import * as E from './Eq'
import { Endomorphism } from './function'
import * as S from './Semigroup'
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
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match = <A>(onLessThan: () => A, onEqual: () => A, onGreaterThan: () => A) => (o: Ordering): A =>
  o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan()

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
export const Semigroup: S.Semigroup<Ordering> = {
  concat: (second) => (first) => (first !== 0 ? first : second)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: M.Monoid<Ordering> = {
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

/**
 * @since 3.0.0
 */
export const reverse: Endomorphism<Ordering> = (o) => (o === -1 ? 1 : o === 1 ? -1 : 0)
