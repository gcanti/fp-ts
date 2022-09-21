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
  readonly combine: (second: A) => (self: A) => A
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
  combine: (second) => (self) => M.combine(self)(second)
})

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterFirst =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (second) => (self) => predicate(self) ? M.combine(second)(self) : second
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterSecond =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (second) => (self) => predicate(second) ? M.combine(second)(self) : self
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const endo =
  <A>(f: Endomorphism<A>) =>
  (M: Magma<A>): Magma<A> => ({
    combine: (second) => (self) => M.combine(f(second))(f(self))
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
