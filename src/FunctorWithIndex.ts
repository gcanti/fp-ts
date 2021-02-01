/**
 * A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.
 *
 * `mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.mapWithIndex((_i, a) => a) <-> fa`
 * 2. Composition: `F.mapWithIndex((_i, a) => bc(ab(a))) <-> flow(F.mapWithIndex((_i, a) => ab(a)), F.mapWithIndex((_i, b) => bc(b)))`
 *
 * @since 3.0.0
 */
import { pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex2C<F extends URIS2, I, E> extends Functor2C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex3C<F extends URIS3, I, E> extends Functor3C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `mapWithIndex` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function mapWithIndex<F extends URIS, I, G extends URIS, J>(
  F: FunctorWithIndex1<F, I>,
  G: FunctorWithIndex1<G, J>
): <A, B>(f: (ij: readonly [I, J], a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export function mapWithIndex<F, I, G, J>(
  F: FunctorWithIndex<F, I>,
  G: FunctorWithIndex<G, J>
): <A, B>(f: (ij: readonly [I, J], a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
export function mapWithIndex<F, I, G, J>(
  F: FunctorWithIndex<F, I>,
  G: FunctorWithIndex<G, J>
): <A, B>(f: (ij: readonly [I, J], a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> {
  return (f) =>
    F.mapWithIndex((i, ga) =>
      pipe(
        ga,
        G.mapWithIndex((j, a) => f([i, j], a))
      )
    )
}
