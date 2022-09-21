/**
 * @since 3.0.0
 */
import type { Option } from './Option'
import type { Either } from './Either'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns a `Refinement` from a `Option` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOptionK = <A, B extends A>(optionK: (a: A) => Option<B>): Refinement<A, B> => {
  return (a: A): a is B => _.isSome(optionK(a))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEitherK = <A, B extends A>(eitherK: (a: A) => Either<unknown, B>): Refinement<A, B> => {
  return (a: A): a is B => _.isRight(eitherK(a))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const id = <A>(): Refinement<A, A> => {
  return (_): _ is A => true
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const not =
  <A, B extends A>(refinement: Refinement<A, B>): Refinement<A, Exclude<A, B>> =>
  (a): a is Exclude<A, B> =>
    !refinement(a)

/**
 * @category combinators
 * @since 3.0.0
 */
export const or =
  <A, C extends A>(second: Refinement<A, C>) =>
  <B extends A>(self: Refinement<A, B>): Refinement<A, B | C> =>
  (a): a is B | C =>
    self(a) || second(a)

/**
 * @category combinators
 * @since 3.0.0
 */
export const and =
  <A, C extends A>(second: Refinement<A, C>) =>
  <B extends A>(self: Refinement<A, B>): Refinement<A, B & C> =>
  (a): a is B & C =>
    self(a) && second(a)

/**
 * @category combinators
 * @since 3.0.0
 */
export const emptyK = <A, B extends A>(): Refinement<A, B> => {
  return (_): _ is B => false
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const compose =
  <A, B extends A, C extends B>(bc: Refinement<B, C>) =>
  (ab: Refinement<A, B>): Refinement<A, C> => {
    return (i): i is C => ab(i) && bc(i)
  }
