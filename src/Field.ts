/**
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs
 *
 * @since 2.0.0
 */
import { Ring } from './Ring'
import { Eq } from './Eq'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (second: A) => (first: A) => A
  readonly mod: (second: A) => (first: A) => A
}

/**
 * @category instances
 * @since 2.0.0
 */
export const fieldNumber: Field<number> = {
  add: (second) => (first) => first + second,
  zero: 0,
  mul: (second) => (first) => first * second,
  one: 1,
  sub: (second) => (first) => first - second,
  degree: (_) => 1,
  div: (second) => (first) => first / second,
  mod: (second) => (first) => first % second
}

// TODO: make piapeable
/**
 * The *greatest common divisor* of two values
 *
 * @since 2.0.0
 */
export function gcd<A>(E: Eq<A>, field: Field<A>): (x: A, y: A) => A {
  const predicate = E.equals(field.zero)
  const f = (x: A, y: A): A => (predicate(y) ? x : f(y, field.mod(y)(x)))
  return f
}

// TODO: make piapeable
/**
 * The *least common multiple* of two values
 *
 * @since 2.0.0
 */
export function lcm<A>(E: Eq<A>, F: Field<A>): (x: A, y: A) => A {
  const zero = F.zero
  const predicate = E.equals(zero)
  const gcdSF = gcd(E, F)
  return (x, y) => (predicate(x) || predicate(y) ? zero : F.div(gcdSF(x, y))(F.mul(y)(x)))
}
