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
export const reverse = <S>(Magma: Magma<S>): Magma<S> => ({
  combine: (that) => (self) => Magma.combine(self)(that)
})

/**
 * @since 3.0.0
 */
export const filterFirst =
  <S>(predicate: Predicate<S>) =>
  (Magma: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => predicate(self) ? Magma.combine(that)(self) : that
  })

/**
 * @since 3.0.0
 */
export const filterSecond =
  <S>(predicate: Predicate<S>) =>
  (Magma: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => predicate(that) ? Magma.combine(that)(self) : self
  })

/**
 * @since 3.0.0
 */
export const endo =
  <S>(f: Endomorphism<S>) =>
  (Magma: Magma<S>): Magma<S> => ({
    combine: (that) => (self) => Magma.combine(f(that))(f(self))
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
  <S>(Magma: Magma<S>) =>
  (startWith: S) =>
  (collection: Iterable<S>): S => {
    let out: S = startWith
    for (const s of collection) {
      out = Magma.combine(s)(out)
    }
    return out
  }
