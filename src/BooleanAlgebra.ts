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
 * @since 2.10.0
 */
export const reverse = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => ({
  meet: (x, y) => B.join(x, y),
  join: (x, y) => B.meet(x, y),
  zero: B.one,
  one: B.zero,
  implies: (x, y) => B.join(B.not(x), y),
  not: B.not
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const booleanAlgebraVoid: BooleanAlgebra<void> = {
  meet: () => undefined,
  join: () => undefined,
  zero: undefined,
  one: undefined,
  implies: () => undefined,
  not: () => undefined
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `reverse` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getDualBooleanAlgebra = reverse

/**
 * Use `boolean.BooleanAlgebra` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = {
  meet: (x, y) => x && y,
  join: (x, y) => x || y,
  zero: false,
  one: true,
  implies: (x, y) => !x || y,
  not: (x) => !x
}

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
