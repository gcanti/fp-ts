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
 * @since 2.0.0
 */
import { HeytingAlgebra } from './HeytingAlgebra'
import * as B from './boolean'
import { getBooleanAlgebra } from './function'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @category combinators
 * @since 2.0.0
 */
export const getDualBooleanAlgebra = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => ({
  meet: (x, y) => B.join(x, y),
  join: (x, y) => B.meet(x, y),
  zero: B.one,
  one: B.zero,
  implies: (x, y) => B.join(B.not(x), y),
  not: B.not
})

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `boolean.BooleanAlgebra` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = B.BooleanAlgebra

/**
 * Use `function.getBooleanAlgebra` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getFunctionBooleanAlgebra: <B>(
  B: BooleanAlgebra<B>
) => <A = never>() => BooleanAlgebra<(a: A) => B> = getBooleanAlgebra

/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const booleanAlgebraVoid: BooleanAlgebra<void> = {
  meet: () => undefined,
  join: () => undefined,
  zero: undefined,
  one: undefined,
  implies: () => undefined,
  not: () => undefined
}
