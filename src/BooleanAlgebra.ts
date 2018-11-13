import { HeytingAlgebra } from './HeytingAlgebra'

/**
 * Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
 * (equivalently, double-negation is true).
 *
 * Instances should satisfy the following laws in addition to the {@link HeytingAlgebra} laws:
 *
 * - Excluded middle: `a ∨ ¬a = 1`
 *
 * Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".
 *
 * @typeclass
 * @since 1.4.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}

/**
 * @instance
 * @since 1.4.0
 */
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = {
  meet: (x, y) => x && y,
  join: (x, y) => x || y,
  zero: false,
  one: true,
  implies: (x, y) => !x || y,
  not: x => !x
}

/**
 * @instance
 * @since 1.4.0
 */
export const booleanAlgebraVoid: BooleanAlgebra<void> = {
  meet: () => undefined,
  join: () => undefined,
  zero: undefined,
  one: undefined,
  implies: () => undefined,
  not: () => undefined
}

/**
 * @function
 * @since 1.4.0
 */
export const getFunctionBooleanAlgebra = <B>(B: BooleanAlgebra<B>) => <A = never>(): BooleanAlgebra<(a: A) => B> => {
  return {
    meet: (x, y) => a => B.meet(x(a), y(a)),
    join: (x, y) => a => B.join(x(a), y(a)),
    zero: () => B.zero,
    one: () => B.one,
    implies: (x, y) => a => B.implies(x(a), y(a)),
    not: x => a => B.not(x(a))
  }
}

/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 * @function
 * @since 1.4.0
 */
export const getDualBooleanAlgebra = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => {
  return {
    meet: (x, y) => B.join(x, y),
    join: (x, y) => B.meet(x, y),
    zero: B.one,
    one: B.zero,
    implies: (x, y) => B.join(B.not(x), y),
    not: B.not
  }
}
