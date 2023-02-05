/**
 * `Quasigroup` extends from `Magma` providing two additional binary operations `leftInv` and `rightInv` on the non-empty set `A`.
 * 
 * ```ts
 * interface Magma<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 * 
 * ```ts
 * interface Quasigroup<A> extends Magma<A> {
 *   readonly leftInv: (x: A, y: A) => A
 *   readonly rightInv: (x: A, y: A) => A
 * }
 * ```
 * 
 * The relationship between `concat`, `leftInv` and `rightInv` must satisfy the following equalities for any `x` and `y` elements of `A`.
 * 
 * ```ts
 * concat(x, leftInv(x, y)) = leftInv(x, concat(x, y)) = concat(rightInv(y, x), x) = rightInv(concat(y, x), x) = y
 * ```
 * 
 * A common example of a quasigroup is the type `number` with the operations `+` and `-`.
 *
 * ```ts
 * import { Quasigroup } from 'fp-ts/Quasigroup'
 *
 * const quasigroupNumber: Quasigroup<number> = {
 *   concat: (x, y) => x + y
 *   leftInv: (x, y) => y - x
 *   rightInv: (x, y) => x - y
 * }
 *
 * const x = 1
 * const y = 2
 *
 * quasigroupNumber.concat(x, y) // 3
 * 
 * quasigroupNumber.leftInv(x, y) // 1
 * 
 * quasigroupNumber.rightInv(x, y) // -1
 *
 * quasigroupNumber.concat(x, quasigroupNumber.leftInv(x, y)) // 2
 *
 * quasigroupNumber.leftInv(x, quasigroupNumber.concat(x, y)) // 2
 * 
 * quasigroupNumber.concat(quasigroupNumber.rightInv(y, x), x) // 2
 * 
 * quasigroupNumber.rightInv(quasigroupNumber.concat(y, x), x) // 2
 * ```
 *
 * @since 2.0.0
 */

import { Endomorphism } from './Endomorphism'
import { Predicate } from './Predicate'
import * as M from './Magma'

import Magma = M.Magma

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Quasigroup<A> extends Magma<A> {
    leftInv: (x: A, y: A) => A
    rightInv: (x: A, y: A) => A
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
 * @since 2.11.0
 */
export const reverse = <A>(M: Magma<A>): Magma<A> => ({
  concat: (first, second) => M.concat(second, first)
})

/**
 * @since 2.11.0
 */
export const filterFirst =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (first, second) => (predicate(first) ? M.concat(first, second) : second)
  })

/**
 * @since 2.11.0
 */
export const filterSecond =
  <A>(predicate: Predicate<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (first, second) => (predicate(second) ? M.concat(first, second) : first)
  })

/**
 * @since 2.11.0
 */
export const endo =
  <A>(f: Endomorphism<A>) =>
  (M: Magma<A>): Magma<A> => ({
    concat: (first, second) => M.concat(f(first), f(second))
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
 * @since 2.11.0
 */
export const concatAll =
  <A>(M: Magma<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => M.concat(a, acc), startWith)
