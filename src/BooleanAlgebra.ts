/**
 * Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
 * (equivalently, double-negation is true).
 *
 * Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:
 *
 * - Excluded middle: `a ∨ ¬a <-> 1`
 *
 * Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".
 *
 * @since 3.0.0
 */
import { HeytingAlgebra } from './HeytingAlgebra'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}

/**
 * @category instances
 * @since 3.0.0
 */
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = {
  meet: (second) => (first) => first && second,
  join: (second) => (first) => first || second,
  zero: false,
  one: true,
  implies: (second) => (first) => !first || second,
  not: (x) => !x
}

/**
 * @category instances
 * @since 3.0.0
 */
export const booleanAlgebraVoid: BooleanAlgebra<void> = {
  meet: () => () => undefined,
  join: () => () => undefined,
  zero: undefined,
  one: undefined,
  implies: () => () => undefined,
  not: () => undefined
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctionBooleanAlgebra = <B>(B: BooleanAlgebra<B>) => <A = never>(): BooleanAlgebra<(a: A) => B> => ({
  meet: (second) => (first) => (a) => B.meet(second(a))(first(a)),
  join: (second) => (first) => (a) => B.join(second(a))(first(a)),
  zero: () => B.zero,
  one: () => B.one,
  implies: (second) => (first) => (a) => B.implies(second(a))(first(a)),
  not: (x) => (a) => B.not(x(a))
})

/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getDualBooleanAlgebra = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => ({
  meet: B.join,
  join: B.meet,
  zero: B.one,
  one: B.zero,
  implies: (second) => (first) => B.join(second)(B.not(first)),
  not: B.not
})
