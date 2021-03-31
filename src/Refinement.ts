/**
 * @since 2.11.0
 */

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
