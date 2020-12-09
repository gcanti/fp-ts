/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly map: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => B) => Kind4<F, S, R, E, B>
}
