import { Ring } from './Ring'
import { Setoid } from './Setoid'

// adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

export interface Field<A> extends Ring<A> {
  degree(a: A): number
  div(x: A, y: A): A
  mod(x: A, y: A): A
}

export const fieldNumber: Field<number> = {
  add: x => y => x + y,
  zero: () => 0,
  mul: x => y => x * y,
  one: () => 1,
  sub: (x, y) => x - y,
  degree: () => 1,
  div: (x, y) => x / y,
  mod: (x, y) => x % y
}

/** The *greatest common divisor* of two values */
export function gcd<A>(setoid: Setoid<A>, field: Field<A>): (x: A, y: A) => A {
  const zero = field.zero()
  function f(x: A, y: A): A {
    if (setoid.equals(y, zero)) {
      return x
    }
    return f(y, field.mod(x, y))
  }
  return f
}

/** The *least common multiple* of two values */
export function lcm<A>(setoid: Setoid<A>, field: Field<A>): (x: A, y: A) => A {
  const zero = field.zero()
  return (x, y) => {
    if (setoid.equals(x, zero) || setoid.equals(y, zero)) {
      return zero
    }
    return field.div(field.mul(x)(y), gcd(setoid, field)(x, y))
  }
}
