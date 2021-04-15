/**
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs
 *
 * @since 2.0.0
 */
import { Ring } from './Ring'
import { Eq } from './Eq'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * The *greatest common divisor* of two values
 *
 * @since 2.0.0
 */
export function gcd<A>(E: Eq<A>, field: Field<A>): (x: A, y: A) => A {
  const zero = field.zero
  const f = (x: A, y: A): A => (E.equals(y, zero) ? x : f(y, field.mod(x, y)))
  return f
}

/**
 * The *least common multiple* of two values
 *
 * @since 2.0.0
 */
export function lcm<A>(E: Eq<A>, F: Field<A>): (x: A, y: A) => A {
  const zero = F.zero
  const gcdSF = gcd(E, F)
  return (x, y) => (E.equals(x, zero) || E.equals(y, zero) ? zero : F.div(F.mul(x, y), gcdSF(x, y)))
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`Field`](./number.ts.html#Field) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const fieldNumber: Field<number> = {
  add: (x, y) => x + y,
  zero: 0,
  mul: (x, y) => x * y,
  one: 1,
  sub: (x, y) => x - y,
  degree: (_) => 1,
  div: (x, y) => x / y,
  mod: (x, y) => x % y
}
