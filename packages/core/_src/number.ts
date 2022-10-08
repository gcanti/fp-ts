/**
 * @since 3.0.0
 */
import type * as bounded from '@fp-ts/core/Bounded'
import * as eq from '@fp-ts/core/Eq'
import type * as field from '@fp-ts/core/Field'
import type { Magma } from '@fp-ts/core/Magma'
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
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number => typeof u === 'number'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<number> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<number> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bounded: bounded.Bounded<number> = {
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Field: field.Field<number> = {
  add: (that) => (self) => self + that,
  zero: 0,
  mul: (that) => (self) => self * that,
  one: 1,
  sub: (that) => (self) => self - that,
  degree: () => 1,
  div: (that) => (self) => self / that,
  mod: (that) => (self) => self % that
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MagmaSub: Magma<number> = {
  combine: Field.sub
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupSum: Semigroup<number> = {
  combine: (that) => (self) => self + that
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupProduct.combine(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupProduct: Semigroup<number> = {
  combine: (that) => (self) => self * that
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidSum: Monoid<number> = {
  combine: SemigroupSum.combine,
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidProduct: Monoid<number> = {
  combine: SemigroupProduct.combine,
  empty: 1
}
