/**
 * @since 3.0.0
 */

import { Apply2, Apply1, Apply } from './Apply'
import { flow, Lazy, pipe } from './function'
import { Functor2, Functor1, Functor } from './Functor'
import { URIS2, Kind2, URIS, Kind, HKT } from './HKT'
import { Monad2, Monad1, Monad } from './Monad'
import { Pointed2, Pointed1, Pointed } from './Pointed'
import { Semigroup } from './Semigroup'
import * as T from './These'

import These = T.These

/**
 * @since 3.0.0
 */
export function right_<M extends URIS2>(M: Pointed2<M>): <A, FE, E = never>(a: A) => Kind2<M, FE, These<E, A>>
export function right_<M extends URIS>(M: Pointed1<M>): <A, E = never>(a: A) => Kind<M, These<E, A>>
export function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, These<E, A>>
export function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, These<E, A>> {
  return flow(T.right, M.of)
}

/**
 * @since 3.0.0
 */
export function left_<M extends URIS2>(M: Pointed2<M>): <E, FE, A = never>(e: E) => Kind2<M, FE, These<E, A>>
export function left_<M extends URIS>(M: Pointed1<M>): <E, A = never>(e: E) => Kind<M, These<E, A>>
export function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, These<E, A>>
export function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, These<E, A>> {
  return flow(T.left, M.of)
}

/**
 * @since 3.0.0
 */
export function both_<M extends URIS2>(M: Pointed2<M>): <E, FE, A>(e: E, a: A) => Kind2<M, FE, These<E, A>>
export function both_<M extends URIS>(M: Pointed1<M>): <E, A>(e: E, a: A) => Kind<M, These<E, A>>
export function both_<M>(M: Pointed<M>): <E, A = never>(e: E, a: A) => HKT<M, These<E, A>>
export function both_<M>(M: Pointed<M>): <E, A = never>(e: E, a: A) => HKT<M, These<E, A>> {
  return flow(T.both, M.of)
}

/**
 * @since 3.0.0
 */
export function rightF_<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, These<E, A>>
export function rightF_<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
export function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>> {
  return F.map(T.right)
}

/**
 * @since 3.0.0
 */
export function leftF_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, These<E, A>>
export function leftF_<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
export function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>> {
  return F.map(T.left)
}

/**
 * @since 3.0.0
 */
export function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<E, B>>
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, These<E, A>>) => Kind<F, These<E, B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>> {
  return (f) => F.map(T.map(f))
}

/**
 * @since 3.0.0
 */
export function ap_<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <FE, A>(fa: Kind2<F, FE, These<E, A>>) => <B>(fab: Kind2<F, FE, These<E, (a: A) => B>>) => Kind2<F, FE, These<E, B>>
export function ap_<F extends URIS, E>(
  F: Apply1<F>,
  S: Semigroup<E>
): <A>(fa: Kind<F, These<E, A>>) => <B>(fab: Kind<F, These<E, (a: A) => B>>) => Kind<F, These<E, B>>
export function ap_<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>>
export function ap_<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>> {
  const A = T.getApply(S)
  return <A>(fa: HKT<F, These<E, A>>): (<B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>>) =>
    flow(
      F.map((gab) => (ga: These<E, A>) => A.ap(ga)(gab)),
      F.ap(fa)
    )
}

/**
 * @since 3.0.0
 */
export function chain_<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, ME, B>(f: (a: A) => Kind2<M, ME, These<E, B>>) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, These<E, B>>
export function chain_<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind<M, These<E, B>>) => (ma: Kind<M, These<E, A>>) => Kind<M, These<E, B>>
export function chain_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>>
export function chain_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>> {
  const left = left_(M)
  return (f) => (ma) =>
    pipe(
      ma,
      M.chain(
        T.fold(left, f, (e1, a) =>
          pipe(
            f(a),
            M.map(
              T.fold(
                (e2) => T.left(S.concat(e2)(e1)),
                (b) => T.both(e1, b),
                (e2, b) => T.both(S.concat(e2)(e1), b)
              )
            )
          )
        )
      )
    )
}

/**
 * @since 3.0.0
 */
export function bimap_<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, B>>
export function bimap_<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, These<E, A>>) => Kind<F, These<G, B>>
export function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>>
export function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>> {
  return flow(T.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft_<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, A>>
export function mapLeft_<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, These<E, A>>) => Kind<F, These<G, A>>
export function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>>
export function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>> {
  return (f) => F.map(T.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export function fold_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, R, A>(
  onLeft: (e: E) => Kind2<M, ME, R>,
  onRight: (a: A) => Kind2<M, ME, R>,
  onBoth: (e: E, a: A) => Kind2<M, ME, R>
) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, R>
export function fold_<M extends URIS>(
  M: Monad1<M>
): <E, R, A>(
  onLeft: (e: E) => Kind<M, R>,
  onRight: (a: A) => Kind<M, R>,
  onBoth: (e: E, a: A) => Kind<M, R>
) => (ma: Kind<M, These<E, A>>) => Kind<M, R>
export function fold_<M>(
  M: Monad<M>
): <E, R, A>(
  onLeft: (e: E) => HKT<M, R>,
  onRight: (a: A) => HKT<M, R>,
  onBoth: (e: E, a: A) => HKT<M, R>
) => (ma: HKT<M, These<E, A>>) => HKT<M, R>
export function fold_<M>(
  M: Monad<M>
): <E, R, A>(
  onLeft: (e: E) => HKT<M, R>,
  onRight: (a: A) => HKT<M, R>,
  onBoth: (e: E, a: A) => HKT<M, R>
) => (ma: HKT<M, These<E, A>>) => HKT<M, R> {
  return (onLeft, onRight, onBoth) => M.chain(T.fold(onLeft, onRight, onBoth))
}

/**
 * @since 3.0.0
 */
export function swap_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<A, E>>
export function swap_<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
export function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>> {
  return F.map(T.swap)
}

/**
 * @since 3.0.0
 */
export function toReadonlyTuple2_<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <FE>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, readonly [E, A]>
export function toReadonlyTuple2_<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export function toReadonlyTuple2_<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
export function toReadonlyTuple2_<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]> {
  return flow(T.toReadonlyTuple2, F.map)
}
