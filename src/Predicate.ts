/**
 * @since 3.0.0
 */
import type * as contravariant from './Contravariant'
import { constFalse, constTrue, flow } from './Function'
import type { TypeLambda } from './HKT'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this['In1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAny = <A>(): Semigroup<Predicate<A>> => ({
  combine: or
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAny = <A>(): Monoid<Predicate<A>> => ({
  combine: getSemigroupAny<A>().combine,
  empty: constFalse
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAll = <A>(): Semigroup<Predicate<A>> => ({
  combine: and
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAll = <A>(): Monoid<Predicate<A>> => ({
  combine: getSemigroupAll<A>().combine,
  empty: constTrue
})

/**
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (fa: Predicate<A>) => Predicate<B> = (f) => (predicate) =>
  flow(f, predicate)

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<PredicateTypeLambda> = {
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
