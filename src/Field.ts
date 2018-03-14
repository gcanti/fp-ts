import { Ring } from './Ring'
import { Setoid } from './Setoid'

// adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

/** @typeclass */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}

/**
 * @instance
 * @since 1.0.0
 */
export const fieldNumber: Field<number> = {
  add: (x, y) => x + y,
  zero: 0,
  mul: (x, y) => x * y,
  one: 1,
  sub: (x, y) => x - y,
  degree: _ => 1,
  div: (x, y) => x / y,
  mod: (x, y) => x % y
}

/**
 * The *greatest common divisor* of two values
 * @function
 * @since 1.0.0
 */
export const gcd = <A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A) => {
  const zero = field.zero
  const f = (x: A, y: A): A => (S.equals(y, zero) ? x : f(y, field.mod(x, y)))
  return f
}

/**
 * The *least common multiple* of two values
 * @function
 * @since 1.0.0
 */
export const lcm = <A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A) => {
  const zero = F.zero
  const gcdSF = gcd(S, F)
  return (x, y) => (S.equals(x, zero) || S.equals(y, zero) ? zero : F.div(F.mul(x, y), gcdSF(x, y)))
}
