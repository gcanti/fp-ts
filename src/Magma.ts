/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
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
  readonly concat: (second: A) => (first: A) => A
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(M: Magma<A>): Magma<A> => ({
  concat: (second) => (first) => M.concat(first)(second)
})

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterFirst =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (second) => (first) => predicate(first) ? M.concat(second)(first) : second
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterSecond =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (second) => (first) => predicate(second) ? M.concat(second)(first) : first
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const endo =
  <A>(f: Endomorphism<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (second) => (first) => M.concat(f(second))(f(first))
  })

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 3.0.0
 */
export const concatAll =
  <A>(M: Magma<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => M.concat(acc)(a), startWith)
