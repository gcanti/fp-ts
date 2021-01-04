/**
 * @since 3.0.0
 */

import { Apply, Apply1, Apply2 } from './Apply'
import { flow, pipe } from './function'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad2, Monad1, Monad } from './Monad'
import { Pointed2, Pointed1, Pointed } from './Pointed'
import { Reader } from './Reader'

/**
 * @since 3.0.0
 */
export function of_<M extends URIS2>(M: Pointed2<M>): <A, R, ME>(a: A) => Reader<R, Kind2<M, ME, A>>
export function of_<M extends URIS>(M: Pointed1<M>): <A, R>(a: A) => Reader<R, Kind<M, A>>
export function of_<M>(M: Pointed<M>): <A, R>(a: A) => Reader<R, HKT<M, A>>
export function of_<M>(M: Pointed<M>): <A, R>(a: A) => Reader<R, HKT<M, A>> {
  return (a) => () => M.of(a)
}

/**
 * @since 3.0.0
 */
export function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
export function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>> {
  return (f) => (fa) => flow(fa, F.map(f))
}

/**
 * @since 3.0.0
 */
export function ap_<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(
  fa: Reader<R, Kind2<F, E, A>>
) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export function ap_<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export function ap_<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
export function ap_<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>> {
  return (fa) => (fab) => (r) => F.ap(fa(r))(fab(r))
}

/**
 * @since 3.0.0
 */
export function chain_<M extends URIS2>(
  M: Monad2<M>
): <A, R, E, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export function chain_<M extends URIS>(
  M: Monad1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export function chain_<M>(
  M: Monad<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
export function chain_<M>(
  M: Monad<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>> {
  return (f) => (ma) => (r) =>
    pipe(
      ma(r),
      M.chain((a) => f(a)(r))
    )
}

/**
 * @since 3.0.0
 */
export function ask_<M extends URIS2>(M: Pointed2<M>): <R, E>() => Reader<R, Kind2<M, E, R>>
export function ask_<M extends URIS>(M: Pointed1<M>): <R>() => Reader<R, Kind<M, R>>
export function ask_<M>(M: Pointed<M>): <R>() => Reader<R, HKT<M, R>>
export function ask_<M>(M: Pointed<M>): <R>() => Reader<R, HKT<M, R>> {
  return () => M.of
}

/**
 * @since 3.0.0
 */
export function asks_<M extends URIS2>(M: Pointed2<M>): <R, A, E>(f: (r: R) => A) => Reader<R, Kind2<M, E, A>>
export function asks_<M extends URIS>(M: Pointed1<M>): <R, A>(f: (r: R) => A) => Reader<R, Kind<M, A>>
export function asks_<M>(M: Pointed<M>): <R, A>(f: (r: R) => A) => Reader<R, HKT<M, A>>
export function asks_<M>(M: Pointed<M>): <R, A>(f: (r: R) => A) => Reader<R, HKT<M, A>> {
  return (f) => flow(M.of, M.map(f))
}

/**
 * @since 3.0.0
 */
export function fromReader_<M extends URIS2>(M: Pointed2<M>): <R, A, E>(ma: Reader<R, A>) => Reader<R, Kind2<M, E, A>>
export function fromReader_<M extends URIS>(M: Pointed1<M>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<M, A>>
export function fromReader_<M>(M: Pointed<M>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<M, A>>
export function fromReader_<M>(M: Pointed<M>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<M, A>> {
  return (ma) => flow(ma, M.of)
}
