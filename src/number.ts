/**
 * @since 2.10.0
 */
import * as B from './Bounded'
import * as E from './Eq'
import * as F from './Field'
import * as O from './Ord'
import * as S from './Show'
import { Semigroup } from './Semigroup'

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<number> = E.eqStrict

/**
 * @category instances
 * @since 2.10.0
 */
export const Ord: O.Ord<number> = {
  equals: Eq.equals,
  compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Bounded: B.Bounded<number> = {
  equals: Ord.equals,
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Field: F.Field<number> = {
  add: (x, y) => x + y,
  zero: 0,
  mul: (x, y) => x * y,
  one: 1,
  sub: (x, y) => x - y,
  degree: (_) => 1,
  div: (x, y) => x / y,
  mod: (x, y) => x % y
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Show: S.Show<number> = {
  show: (a) => JSON.stringify(a)
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
 * @since 2.0.0
 */
export const SemigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}
