/**
 * A `Magma` is a pair `(A, combine)` in which `A` is a non-empty set and `combine` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 3.0.0
 */

import type { Endomorphism } from './Endomorphism'
import type { Predicate } from './Predicate'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Magma<A> {
  readonly combine: (that: A) => (self: A) => A
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Magma`, obtained by swapping the arguments of `combine`.
 *
 * @example
 * import { reverse, combineAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = combineAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(M: Magma<A>): Magma<A> => ({
  combine: (that) => (self) => M.combine(self)(that)
})

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterFirst =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (that) => (self) => predicate(self) ? M.combine(that)(self) : that
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterSecond =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (that) => (self) => predicate(that) ? M.combine(that)(self) : self
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const endo =
  <A>(f: Endomorphism<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (that) => (self) => M.combine(f(that))(f(self))
  })

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { combineAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = combineAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 3.0.0
 */
export const combineAll =
  <A>(M: Magma<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => M.combine(acc)(a), startWith)
