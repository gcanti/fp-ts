/**
 * @since 3.0.0
 */
import type { LazyArg } from './function'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'
import * as eq from './Eq'
import type * as booleanAlgebra from './BooleanAlgebra'
import type * as ord from './Ord'
import type * as show_ from './Show'
import type { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 3.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (u: unknown): u is boolean => typeof u === 'boolean'

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Defines the match over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
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
 * @category pattern matching
 * @since 3.0.0
 */
export const match =
  <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) =>
  (value: boolean): A | B =>
    value ? onTrue() : onFalse()

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<boolean> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const BooleanAlgebra: booleanAlgebra.BooleanAlgebra<boolean> = {
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
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAll: Semigroup<boolean> = {
  combine: (second) => (first) => first && second
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAny: Semigroup<boolean> = {
  combine: (second) => (first) => first || second
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
  combine: SemigroupAll.combine,
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
  combine: SemigroupAny.combine,
  empty: false
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<boolean> = {
  compare: (second) => (first) => first < second ? -1 : first > second ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<boolean> = {
  show: (a) => JSON.stringify(a)
}
