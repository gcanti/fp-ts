/**
 * @since 2.11.0
 */
import { Option } from './Option'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns a `Refinement` from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * @category constructors
 * @since 2.11.0
 */
export const fromOptionK = <A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> => {
  return (a: A): a is B => _.isSome(getOption(a))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const not = <A, B extends A>(refinement: Refinement<A, B>): Refinement<A, Exclude<A, B>> => (
  a
): a is Exclude<A, B> => !refinement(a)

/**
 * @since 2.11.0
 */
export const or = <A, C extends A>(second: Refinement<A, C>) => <B extends A>(
  first: Refinement<A, B>
): Refinement<A, B | C> => (a): a is B | C => first(a) || second(a)

/**
 * @since 2.11.0
 */
export const and = <A, C extends A>(second: Refinement<A, C>) => <B extends A>(
  first: Refinement<A, B>
): Refinement<A, B & C> => (a): a is B & C => first(a) && second(a)
