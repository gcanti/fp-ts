/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @since 3.0.0
 */
import { flow } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
}

/**
 * @since 3.0.0
 */
export function apFirst_<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
export function apFirst_<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst_<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst_<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst_<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst_<F extends URIS>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A>
export function apFirst_<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, A>
export function apFirst_<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, A> {
  return (second) =>
    flow(
      A.map((a) => () => a),
      A.ap(second)
    )
}

/**
 * @since 3.0.0
 */
export function apSecond_<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export function apSecond_<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond_<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond_<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond_<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond_<F extends URIS>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B>
export function apSecond_<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, B>
export function apSecond_<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, B> {
  return <B>(second: HKT<F, B>) =>
    flow(
      A.map(() => (b: B) => b),
      A.ap(second)
    )
}
