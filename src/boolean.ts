/**
 * @since 2.2.0
 */
import * as BA from './BooleanAlgebra'
import * as E from './Eq'
import { Semigroup, semigroupAll, semigroupAny } from './Semigroup'
import { Lazy } from './function'
import { Monoid, monoidAll, monoidAny } from './Monoid'
import * as O from './Ord'
import * as S from './Show'

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchW = <A, B>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean): A | B =>
  value ? onTrue() : onFalse()

/**
 * Alias of [`matchW`](#matchW).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchW

/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 * import { match } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(match(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
export const match: <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A = foldW

/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.2.0
 */
export const fold = match

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Eq: E.Eq<boolean> = E.eqBoolean

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const BooleanAlgebra: BA.BooleanAlgebra<boolean> = BA.booleanAlgebraBoolean

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
// tslint:disable-next-line: deprecation
export const SemigroupAll: Semigroup<boolean> = semigroupAll

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
// tslint:disable-next-line: deprecation
export const SemigroupAny: Semigroup<boolean> = semigroupAny

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
// tslint:disable-next-line: deprecation
export const MonoidAll: Monoid<boolean> = monoidAll

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
// tslint:disable-next-line: deprecation
export const MonoidAny: Monoid<boolean> = monoidAny

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Ord: O.Ord<boolean> = O.ordBoolean

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Show: S.Show<boolean> = S.showBoolean
