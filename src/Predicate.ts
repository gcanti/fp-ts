/**
 * @since 3.0.0
 */
import type * as contravariant from './Contravariant'
import { constFalse, constTrue, flow } from './function'
import type { HKT } from './HKT'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (fa: Predicate<A>) => Predicate<B> = (f) => (predicate) =>
  flow(f, predicate)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface PredicateF extends HKT {
  readonly type: Predicate<this['Contravariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAny = <A = never>(): Semigroup<Predicate<A>> => ({
  combine: or
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAny = <A = never>(): Monoid<Predicate<A>> => ({
  combine: getSemigroupAny<A>().combine,
  empty: constFalse
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAll = <A = never>(): Semigroup<Predicate<A>> => ({
  combine: and
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAll = <A = never>(): Monoid<Predicate<A>> => ({
  combine: getSemigroupAll<A>().combine,
  empty: constTrue
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<PredicateF> = {
  contramap
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const not =
  <A>(predicate: Predicate<A>): Predicate<A> =>
  (a) =>
    !predicate(a)

/**
 * @since 3.0.0
 */
export const or =
  <A>(second: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> =>
  (a) =>
    self(a) || second(a)

/**
 * @since 3.0.0
 */
export const and =
  <A>(second: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> =>
  (a) =>
    self(a) && second(a)
