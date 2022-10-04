/**
 * A `Magma` is a pair `(A, combine)` in which `A` is a non-empty set and `combine` is a binary operation on `A`
 *
 * @see {@link https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html|Semigroup}
 * @since 3.0.0
 */

import type { Endomorphism } from './Endomorphism'
import type { Predicate } from './Predicate'

/**
 * @category model
 * @since 3.0.0
 */
export interface Magma<S> {
  readonly combine: (that: S) => (self: S) => S
}

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
 * @since 3.0.0
 */
export const reverse = <S>(M: Magma<S>): Magma<S> => ({
  combine: (that) => (self) => M.combine(self)(that)
})

/**
 * @since 3.0.0
 */
export const filterFirst =
  <S>(predicate: Predicate<S>) =>
  (M: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => predicate(self) ? M.combine(that)(self) : that
  })

/**
 * @since 3.0.0
 */
export const filterSecond =
  <S>(predicate: Predicate<S>) =>
  (M: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => predicate(that) ? M.combine(that)(self) : self
  })

/**
 * @since 3.0.0
 */
export const endo =
  <S>(f: Endomorphism<S>) =>
  (M: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => M.combine(f(that))(f(self))
  })

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
  <S>(M: Magma<S>) =>
  (startWith: S) =>
  (elements: ReadonlyArray<S>): S =>
    elements.reduce((a, acc) => M.combine(acc)(a), startWith)
