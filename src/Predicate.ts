/**
 * @since 2.11.0
 */
import { Contravariant1 } from './Contravariant'
import { constFalse, constTrue, flow, pipe } from './function'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

const contramap_: Contravariant1<URI>['contramap'] = (predicate, f) => pipe(predicate, contramap(f))

/**
 * @since 2.11.0
 */
export const contramap =
  <B, A>(f: (b: B) => A) =>
  (predicate: Predicate<A>): Predicate<B> =>
    flow(f, predicate)

/**
 * @category type lambdas
 * @since 2.11.0
 */
export const URI = 'Predicate'

/**
 * @category type lambdas
 * @since 2.11.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Predicate<A>
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getSemigroupAny = <A = never>(): Semigroup<Predicate<A>> => ({
  concat: (first, second) => pipe(first, or(second))
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getMonoidAny = <A = never>(): Monoid<Predicate<A>> => ({
  concat: getSemigroupAny<A>().concat,
  empty: constFalse
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getSemigroupAll = <A = never>(): Semigroup<Predicate<A>> => ({
  concat: (first, second) => pipe(first, and(second))
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getMonoidAll = <A = never>(): Monoid<Predicate<A>> => ({
  concat: getSemigroupAll<A>().concat,
  empty: constTrue
})

/**
 * @category instances
 * @since 2.11.0
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: contramap_
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const not =
  <A>(predicate: Predicate<A>): Predicate<A> =>
  (a) =>
    !predicate(a)

/**
 * @since 2.11.0
 */
export const or =
  <A>(second: Predicate<A>) =>
  (first: Predicate<A>): Predicate<A> =>
  (a) =>
    first(a) || second(a)

/**
 * @since 2.11.0
 */
export const and =
  <A>(second: Predicate<A>) =>
  (first: Predicate<A>): Predicate<A> =>
  (a) =>
    first(a) && second(a)
