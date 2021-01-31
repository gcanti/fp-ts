/**
 * @since 2.10.0
 */
import * as B from './Bounded'
import * as E from './Eq'
import * as F from './Field'
import * as O from './Ord'

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
