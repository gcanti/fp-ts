/**
 * @since 3.0.0
 */
import { Lazy } from './function'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import * as E from './Eq'
import * as BA from './BooleanAlgebra'
import * as O from './Ord'
import * as S from './Show'

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`fold`](#fold).
 *
 * @category destructors
 * @since 3.0.0
 */
export const foldW = <A, B>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean): A | B =>
  value ? onTrue() : onFalse()

/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 * import { fold } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(fold(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const fold: <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A = foldW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: E.Eq<boolean> = E.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const BooleanAlgebra: BA.BooleanAlgebra<boolean> = {
  meet: (second) => (first) => first && second,
  join: (second) => (first) => first || second,
  zero: false,
  one: true,
  implies: (second) => (first) => !first || second,
  not: (x) => !x
}

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAll.concat(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.concat(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAll: Semigroup<boolean> = {
  concat: (second) => (first) => first && second
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAny.concat(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.concat(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.concat(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAny: Semigroup<boolean> = {
  concat: (second) => (first) => first || second
}

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidAll: Monoid<boolean> = {
  concat: SemigroupAll.concat,
  empty: true
}

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidAny: Monoid<boolean> = {
  concat: SemigroupAny.concat,
  empty: false
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: O.Ord<boolean> = {
  equals: Eq.equals,
  compare: (second) => (first) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: S.Show<boolean> = {
  show: (a) => JSON.stringify(a)
}
