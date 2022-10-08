/**
 * @since 3.0.0
 */
import type * as booleanAlgebra from '@fp-ts/core/BooleanAlgebra'
import * as eq from '@fp-ts/core/Eq'
import type { LazyArg } from '@fp-ts/core/Function'
import type { Monoid } from '@fp-ts/core/Monoid'
import type * as ord from '@fp-ts/core/Ord'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type * as show_ from '@fp-ts/core/Show'

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
 * import { some, map } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 * import { match } from '@fp-ts/core/boolean'
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
export const match = <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) =>
  (value: boolean): A | B => value ? onTrue() : onFalse()

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
  meet: (that) => (self) => self && that,
  join: (that) => (self) => self || that,
  zero: false,
  one: true,
  implies: (that) => (self) => !self || that,
  not: (x) => !x
}

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from '@fp-ts/core/boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAll: Semigroup<boolean> = {
  combine: (that) => (self) => self && that
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from '@fp-ts/core/boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAny: Semigroup<boolean> = {
  combine: (that) => (self) => self || that
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
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<boolean> = {
  show: (a) => JSON.stringify(a)
}
