/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import type { Flattenable } from './Flattenable'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import type { Kind, TypeLambda } from './HKT'
import type { FromIdentity } from './FromIdentity'
import type { Reader } from './Reader'

/**
 * @since 3.0.0
 */
export interface ReaderT<F extends TypeLambda, R> extends TypeLambda {
  readonly type: Reader<R, Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const of =
  <F extends TypeLambda>(Pointed: FromIdentity<F>) =>
  <A, R, S, FR, O, E>(a: A): Kind<ReaderT<F, R>, S, FR, O, E, A> =>
  () =>
    Pointed.of(a)

/**
 * @since 3.0.0
 */
export const map =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <A, B>(f: (a: A) => B) =>
  <R, S, FR, O, E>(fa: Kind<ReaderT<F, R>, S, FR, O, E, A>): Kind<ReaderT<F, R>, S, FR, O, E, B> =>
    flow(fa, Functor.map(f))

/**
 * @since 3.0.0
 */
export const ap =
  <F extends TypeLambda>(Apply: Apply<F>) =>
  <R2, S, FR2, O2, E2, A>(fa: Kind<ReaderT<F, R2>, S, FR2, O2, E2, A>) =>
  <R1, FR1, O1, E1, B>(
    fab: Kind<ReaderT<F, R1>, S, FR1, O1, E1, (a: A) => B>
  ): Kind<ReaderT<F, R1 & R2>, S, FR1 & FR2, O1 | O2, E1 | E2, B> =>
  (r) =>
    Apply.ap(fa(r))(fab(r))

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <A, R2, S, FR2, O2, E2, B>(f: (a: A) => Kind<ReaderT<F, R2>, S, FR2, O2, E2, B>) =>
  <R1, FR1, O1, E1>(
    ma: Kind<ReaderT<F, R1>, S, FR1, O1, E1, A>
  ): Kind<ReaderT<F, R1 & R2>, S, FR1 & FR2, O1 | O2, E1 | E2, B> =>
  (r) =>
    pipe(
      ma(r),
      Flattenable.flatMap((a) => f(a)(r))
    )

/**
 * @since 3.0.0
 */
export const fromReader =
  <F extends TypeLambda>(Pointed: FromIdentity<F>) =>
  <R, A, S>(fa: Reader<R, A>): Kind<ReaderT<F, R>, S, unknown, never, never, A> =>
  (r) =>
    Pointed.of(fa(r))
