/**
 * @since 2.2.0
 */
import * as BA from './BooleanAlgebra'
import * as E from './Eq'
import { Semigroup } from './Semigroup'
import { Lazy } from './function'
import { Monoid } from './Monoid'
import * as O from './Ord'

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`fold`](#fold).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = <A, B>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean): A | B =>
  value ? onTrue() : onFalse()

/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.
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
 * @since 2.2.0
 */
export const fold: <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A = foldW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<boolean> = E.eqStrict

/**
 * @category instances
 * @since 2.10.0
 */
export const BooleanAlgebra: BA.BooleanAlgebra<boolean> = {
  meet: (x, y) => x && y,
  join: (x, y) => x || y,
  zero: false,
  one: true,
  implies: (x, y) => !x || y,
  not: (x) => !x
}

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(SemigroupAll.concat(true, true), true)
 * assert.deepStrictEqual(SemigroupAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
export const SemigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(SemigroupAny.concat(true, true), true)
 * assert.deepStrictEqual(SemigroupAny.concat(true, false), true)
 * assert.deepStrictEqual(SemigroupAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
export const SemigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @example
 * import { MonoidAll } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(MonoidAll.concat(true, true), true)
 * assert.deepStrictEqual(MonoidAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.10.0
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
 * @example
 * import { MonoidAny } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(MonoidAny.concat(true, true), true)
 * assert.deepStrictEqual(MonoidAny.concat(true, false), true)
 * assert.deepStrictEqual(MonoidAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
export const MonoidAny: Monoid<boolean> = {
  concat: SemigroupAny.concat,
  empty: false
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Ord: O.Ord<boolean> = {
  equals: Eq.equals,
  compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
}
