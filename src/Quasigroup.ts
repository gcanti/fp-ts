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
 * The dual of a `Quasigroup`, obtained by swapping the arguments of the binary operations.
 *
 * @example
 * import { reverse, concatAll, leftInvAll, rightInvAll } from 'fp-ts/Quasigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sumAll = concatAll(reverse(N.Quasigroup))(0)
 * const subAll = leftInvAll(reverse(N.Quasigroup))(0)
 * const diffAll = rightInvAll(reverse(N.Quasigroup))(0)
 *
 * assert.deepStrictEqual(sumAll([1, 2, 3]), 6)
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 * assert.deepStrictEqual(diffAll([1, 2, 3]), 2)
 *
 * @since 2.11.0
 */
export const reverse = <A>(Q: Quasigroup<A>): Quasigroup<A> => ({
  concat: (first, second) => Q.concat(second, first),
  leftInv: (first, second) => Q.rightInv(first, second),
  rightInv: (first, second) => Q.leftInv(first, second)
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
  (Q: Quasigroup<A>): Quasigroup<A> => ({
    concat: (first, second) => Q.concat(f(first), f(second)),
    leftInv: (first, second) => Q.leftInv(f(first), f(second)),
    rightInv: (first, second) => Q.rightInv(f(first), f(second))
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
 * import { concatAll } from 'fp-ts/Quasigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sumAll = concatAll(N.Quasigroup)(0)
 *
 * assert.deepStrictEqual(sumAll([1, 2, 3]), 6)
 *
 * @since 2.11.0
 */
export const concatAll =
  <A>(Q: Quasigroup<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => Q.concat(a, acc), startWith)

/**
 * Given a sequence of `as`, leftInv them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { leftInvAll } from 'fp-ts/Quasigroup'
 * import * as N from 'fp-ts/number'
 *
 * const diffAll = leftInvAll(Q.Quasigroup)(0)
 *
 * assert.deepStrictEqual(diffAll([1, 2, 3, 4]), 2)
 *
 * @since 2.11.0
 */
export const leftInvAll =
  <A>(Q: Quasigroup<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => Q.leftInv(a, acc), startWith)
    
/**
 * Given a sequence of `as`, rightInv them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { rightInvAll } from 'fp-ts/Quasigroup'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = rightInvAll(Q.Quasigroup)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
export const rightInvAll =
  <A>(Q: Quasigroup<A>) =>
  (startWith: A) =>
  (as: ReadonlyArray<A>): A =>
    as.reduce((a, acc) => Q.rightInv(a, acc), startWith)
