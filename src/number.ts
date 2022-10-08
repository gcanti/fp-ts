/**
 * @since 3.0.0
 */
import type * as bounded from './Bounded'
import * as eq from './Eq'
import type * as ord from './Ord'
import type * as show_ from './Show'
import type { Semigroup } from './Semigroup'
import type { Monoid } from './Monoid'
import type { Magma } from './Magma'
import type { Refinement } from './Refinement'

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
export const Show: show_.Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MagmaSub: Magma<number> = {
  combine: (that) => (self) => self - that
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
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
 * import { SemigroupProduct } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
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
