/**
 * @since 3.0.0
 */
import * as B from './Bounded'
import * as E from './Eq'
import * as F from './Field'
import * as O from './Ord'
import * as S from './Show'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Magma } from './Magma'

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: E.Eq<number> = E.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: O.Ord<number> = {
  equals: Eq.equals,
  compare: (second) => (first) => (first < second ? -1 : first > second ? 1 : 0)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bounded: B.Bounded<number> = {
  equals: Ord.equals,
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Field: F.Field<number> = {
  add: (second) => (first) => first + second,
  zero: 0,
  mul: (second) => (first) => first * second,
  one: 1,
  sub: (second) => (first) => first - second,
  degree: () => 1,
  div: (second) => (first) => first / second,
  mod: (second) => (first) => first % second
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: S.Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MagmaSub: Magma<number> = {
  concat: Field.sub
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.concat(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupSum: Semigroup<number> = {
  concat: (second) => (first) => first + second
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupProduct.concat(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupProduct: Semigroup<number> = {
  concat: (second) => (first) => first * second
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
  concat: SemigroupSum.concat,
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
  concat: SemigroupProduct.concat,
  empty: 1
}
