/**
 * @since 2.0.0
 */
import * as S from './Semigroup'
import * as E from './Eq'
import * as M from './Monoid'
import { Endomorphism } from './function'

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
 * @since 2.10.0
 */
export const Eq: E.Eq<Ordering> = {
  equals: (x, y) => x === y
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Semigroup: S.Semigroup<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y)
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monoid: M.Monoid<Ordering> = {
  concat: Semigroup.concat,
  empty: 0
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)

/**
 * @since 2.10.0
 */
export const reverse: Endomorphism<Ordering> = (o) => (o === -1 ? 1 : o === 1 ? -1 : 0)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `reverse` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const invert = reverse

/**
 * Use `Semigroup` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const semigroupOrdering: S.Semigroup<Ordering> = Semigroup

/**
 * Use `Eq` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const eqOrdering: E.Eq<Ordering> = Eq

/**
 * Use `Monoid` instead
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const monoidOrdering: M.Monoid<Ordering> = Monoid
