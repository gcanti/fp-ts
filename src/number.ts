/**
 * @since 2.10.0
 */
import * as B from './Bounded'
import * as E from './Eq'
import * as F from './Field'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Ord'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import * as S from './Show'

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 2.11.0
 */
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number => typeof u === 'number'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<number> = {
  equals: (first, second) => first === second
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Ord: O.Ord<number> = {
  equals: Eq.equals,
  compare: (first, second) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Bounded: B.Bounded<number> = {
  equals: Eq.equals,
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Show: S.Show<number> = {
  show: (n) => JSON.stringify(n)
}

/**
 * @category instances
 * @since 2.11.0
 */
export const MagmaSub: Magma<number> = {
  concat: (first, second) => first - second
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.10.0
 */
export const SemigroupSum: Semigroup<number> = {
  concat: (first, second) => first + second
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.10.0
 */
export const SemigroupProduct: Semigroup<number> = {
  concat: (first, second) => first * second
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
export const MonoidSum: Monoid<number> = {
  concat: SemigroupSum.concat,
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
export const MonoidProduct: Monoid<number> = {
  concat: SemigroupProduct.concat,
  empty: 1
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Field: F.Field<number> = {
  add: SemigroupSum.concat,
  zero: 0,
  mul: SemigroupProduct.concat,
  one: 1,
  sub: MagmaSub.concat,
  degree: (_) => 1,
  div: (first, second) => first / second,
  mod: (first, second) => first % second
}
