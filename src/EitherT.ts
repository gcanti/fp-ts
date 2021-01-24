/**
 * @since 2.0.0
 */
import { ApplicativeComposition12, ApplicativeComposition22, ApplicativeCompositionHKT2 } from './Applicative'
import { Apply, Apply1, Apply2, ap_ as ap__ } from './Apply'
import * as E from './Either'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, map_ as map__ } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Pointed, Pointed1, Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'

import Either = E.Either

/**
 * @since 2.10.0
 */
export function right_<M extends URIS2>(M: Pointed2<M>): <A, FE, E = never>(a: A) => Kind2<M, FE, Either<E, A>>
export function right_<M extends URIS>(M: Pointed1<M>): <A, E = never>(a: A) => Kind<M, Either<E, A>>
export function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, Either<E, A>>
export function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, Either<E, A>> {
  return flow(E.right, M.of)
}

/**
 * @since 2.10.0
 */
export function left_<M extends URIS2>(M: Pointed2<M>): <E, FE, A = never>(e: E) => Kind2<M, FE, Either<E, A>>
export function left_<M extends URIS>(M: Pointed1<M>): <E, A = never>(e: E) => Kind<M, Either<E, A>>
export function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, Either<E, A>>
export function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, Either<E, A>> {
  return flow(E.left, M.of)
}

/**
 * @since 2.10.0
 */
export function rightF_<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export function rightF_<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, Either<E, A>>
export function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>>
export function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>> {
  return (fa) => F.map(fa, E.right)
}

/**
 * @since 2.10.0
 */
export function leftF_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export function leftF_<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, Either<E, A>>
export function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>>
export function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>> {
  return (fe) => F.map(fe, E.left)
}

/**
 * @since 2.10.0
 */
export function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<E, B>>
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Either<E, A>>) => Kind<F, Either<E, B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Either<E, A>>) => HKT<F, Either<E, B>>
export function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Either<E, A>>) => HKT<F, Either<E, B>> {
  return map__(F, E.Functor)
}

/**
 * @since 2.10.0
 */
export function ap_<F extends URIS2>(
  F: Apply2<F>
): <FE, E, A>(
  fa: Kind2<F, FE, Either<E, A>>
) => <B>(fab: Kind2<F, FE, Either<E, (a: A) => B>>) => Kind2<F, FE, Either<E, B>>
export function ap_<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: Kind<F, Either<E, A>>) => <B>(fab: Kind<F, Either<E, (a: A) => B>>) => Kind<F, Either<E, B>>
export function ap_<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, Either<E, A>>) => <B>(fab: HKT<F, Either<E, (a: A) => B>>) => HKT<F, Either<E, B>>
export function ap_<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, Either<E, A>>) => <B>(fab: HKT<F, Either<E, (a: A) => B>>) => HKT<F, Either<E, B>> {
  return ap__(F, E.Apply)
}

/**
 * @since 2.10.0
 */
export function chain_<M extends URIS2>(
  M: Monad2<M>
): <A, ME, E, B>(
  f: (a: A) => Kind2<M, ME, Either<E, B>>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, B>>
export function chain_<M extends URIS>(
  M: Monad1<M>
): <A, E, B>(f: (a: A) => Kind<M, Either<E, B>>) => (ma: Kind<M, Either<E, A>>) => Kind<M, Either<E, B>>
export function chain_<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>>
export function chain_<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>> {
  return (f) => (ma) => M.chain(ma, (e) => (E.isLeft(e) ? M.of(e) : f(e.right)))
}

/**
 * @since 2.10.0
 */
export function alt_<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A>(
  second: Lazy<Kind2<M, ME, Either<E, A>>>
) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function alt_<M extends URIS>(
  M: Monad1<M>
): <E, A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export function alt_<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
export function alt_<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>> {
  return (second) => (first) => M.chain(first, (e) => (E.isLeft(e) ? second() : M.of(e)))
}

/**
 * @since 2.10.0
 */
export function bimap_<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, B>>
export function bimap_<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, B>>
export function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, B>>
export function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, B>> {
  return (f, g) => (fea) => F.map(fea, E.bimap(f, g))
}

/**
 * @since 2.10.0
 */
export function mapLeft_<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, A>>
export function mapLeft_<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, A>>
export function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, A>>
export function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, A>> {
  return (f) => (fea) => F.map(fea, E.mapLeft(f))
}

/**
 * @since 2.10.0
 */
export function fold_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, R, A>(
  onLeft: (e: E) => Kind2<M, ME, R>,
  onRight: (a: A) => Kind2<M, ME, R>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, R>
export function fold_<M extends URIS>(
  M: Monad1<M>
): <E, R, A>(onLeft: (e: E) => Kind<M, R>, onRight: (a: A) => Kind<M, R>) => (ma: Kind<M, Either<E, A>>) => Kind<M, R>
export function fold_<M>(
  M: Monad<M>
): <E, R, A>(onLeft: (e: E) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => (ma: HKT<M, Either<E, A>>) => HKT<M, R>
export function fold_<M>(
  M: Monad<M>
): <E, R, A>(onLeft: (e: E) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => (ma: HKT<M, Either<E, A>>) => HKT<M, R> {
  return (onLeft, onRight) => (ma) => M.chain(ma, E.fold(onLeft, onRight))
}

/**
 * @since 2.10.0
 */
export function getOrElse_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, A>
export function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: Kind<M, Either<E, A>>) => Kind<M, A>
export function getOrElse_<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, Either<E, A>>) => HKT<M, A>
export function getOrElse_<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, Either<E, A>>) => HKT<M, A> {
  return (onLeft) => (ma) => M.chain(ma, E.fold(onLeft, M.of))
}

/**
 * @since 2.10.0
 */
export function orElse_<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, Either<E2, A>>
) => (ma: Kind2<M, ME, Either<E1, A>>) => Kind2<M, ME, Either<E2, A>>
export function orElse_<M extends URIS>(
  M: Monad1<M>
): <E1, E2, A>(onLeft: (e: E1) => Kind<M, Either<E2, A>>) => (ma: Kind<M, Either<E1, A>>) => Kind<M, Either<E2, A>>
export function orElse_<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, Either<E2, A>>) => (ma: HKT<M, Either<E1, A>>) => HKT<M, Either<E2, A>>
export function orElse_<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, Either<E2, A>>) => (ma: HKT<M, Either<E1, A>>) => HKT<M, Either<E2, A>> {
  return (onLeft) => (ma) => M.chain(ma, (e) => (E.isLeft(e) ? onLeft(e.left) : M.of(e)))
}

/**
 * @since 2.10.0
 */
export function swap_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<A, E>>
export function swap_<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, Either<E, A>>) => Kind<F, Either<A, E>>
export function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>>
export function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>> {
  return (ma) => F.map(ma, E.swap)
}

/**
 * @since 2.10.0
 */
export function altValidation_<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <R, A>(second: Lazy<Kind2<M, R, Either<E, A>>>) => (first: Kind2<M, R, Either<E, A>>) => Kind2<M, R, Either<E, A>>
export function altValidation_<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export function altValidation_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
export function altValidation_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>> {
  return (second) => (first) =>
    M.chain(
      first,
      E.fold(
        (e1) =>
          M.map(
            second(),
            E.mapLeft((e2) => S.concat(e1, e2))
          ),
        right_(M)
      )
    )
}

/**
 * @since 2.10.0
 */
export function toUnion_<F extends URIS2>(
  F: Functor2<F>
): <R, E, A>(fa: Kind2<F, R, Either<E, A>>) => Kind2<F, R, E | A>
export function toUnion_<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, Either<E, A>>) => Kind<F, E | A>
export function toUnion_<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A>
export function toUnion_<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A> {
  return (fa) => F.map(fa, E.toUnion)
}

// -------------------------------------------------------------------------------------
// unused
// -------------------------------------------------------------------------------------

import URI = E.URI

/**
 * @category model
 * @since 2.0.0
 */
export interface EitherT<M, E, A> extends HKT<M, Either<E, A>> {}

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface EitherM<M> extends ApplicativeCompositionHKT2<M, URI> {
  readonly chain: <E, A, B>(ma: EitherT<M, E, A>, f: (a: A) => EitherT<M, E, B>) => EitherT<M, E, B>
  readonly alt: <E, A>(fa: EitherT<M, E, A>, that: Lazy<EitherT<M, E, A>>) => EitherT<M, E, A>
  readonly bimap: <E, A, N, B>(ma: EitherT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT<M, E, A>, f: (e: E) => N) => EitherT<M, N, A>
  readonly fold: <E, A, R>(ma: EitherT<M, E, A>, onLeft: (e: E) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <E, A>(ma: EitherT<M, E, A>, onLeft: (e: E) => HKT<M, A>) => HKT<M, A>
  readonly orElse: <E, A, N>(ma: EitherT<M, E, A>, onLeft: (e: E) => EitherT<M, N, A>) => EitherT<M, N, A>
  readonly swap: <E, A>(ma: EitherT<M, E, A>) => EitherT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => EitherT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => EitherT<M, E, A>
  readonly left: <E, A>(e: E) => EitherT<M, E, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type EitherT1<M extends URIS, E, A> = Kind<M, Either<E, A>>

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, URI> {
  readonly chain: <E, A, B>(ma: EitherT1<M, E, A>, f: (a: A) => EitherT1<M, E, B>) => EitherT1<M, E, B>
  readonly alt: <E, A>(fa: EitherT1<M, E, A>, that: Lazy<EitherT1<M, E, A>>) => EitherT1<M, E, A>
  readonly bimap: <E, A, N, B>(ma: EitherT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT1<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT1<M, E, A>, f: (e: E) => N) => EitherT1<M, N, A>
  readonly fold: <E, A, R>(
    ma: EitherT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly getOrElse: <E, A>(ma: EitherT1<M, E, A>, onLeft: (e: E) => Kind<M, A>) => Kind<M, A>
  readonly orElse: <E, A, N>(ma: EitherT1<M, E, A>, onLeft: (e: E) => EitherT1<M, N, A>) => EitherT1<M, N, A>
  readonly swap: <E, A>(ma: EitherT1<M, E, A>) => EitherT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => EitherT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => EitherT1<M, E, A>
  readonly left: <E, A>(e: E) => EitherT1<M, E, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type EitherT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, URI> {
  readonly chain: <R, E, A, B>(ma: EitherT2<M, R, E, A>, f: (a: A) => EitherT2<M, R, E, B>) => EitherT2<M, R, E, B>
  readonly alt: <R, E, A>(fa: EitherT2<M, R, E, A>, that: Lazy<EitherT2<M, R, E, A>>) => EitherT2<M, R, E, A>
  readonly bimap: <R, E, A, N, B>(ma: EitherT2<M, R, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(ma: EitherT2<M, R, E, A>, f: (e: E) => N) => EitherT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly getOrElse: <R, E, A>(ma: EitherT2<M, R, E, A>, onLeft: (e: E) => Kind2<M, R, A>) => Kind2<M, R, A>
  readonly orElse: <R, E, A, F>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => EitherT2<M, R, F, A>
  ) => EitherT2<M, R, F, A>
  readonly swap: <R, E, A>(ma: EitherT2<M, R, E, A>) => EitherT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => EitherT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => EitherT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => EitherT2<M, R, E, A>
}

/**
 * @since 2.0.0
 */
export function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M>
/* istanbul ignore next */
export function getEitherM<M>(M: Monad<M>): EitherM<M> {
  const ap = <E, A>(fga: HKT<M, E.Either<E, A>>) => <B>(
    fgab: HKT<M, E.Either<E, (a: A) => B>>
  ): HKT<M, E.Either<E, B>> =>
    M.ap(
      M.map(fgab, (h) => (ga: E.Either<E, A>) => pipe(h, E.ap(ga))),
      fga
    )
  const of = flow(E.right, M.of)

  return {
    map: (fa, f) => M.map(fa, E.map(f)),
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of,
    chain: (ma, f) => M.chain(ma, (e) => (E.isLeft(e) ? M.of(E.left(e.left)) : f(e.right))),
    alt: (fa, that) => M.chain(fa, (e) => (E.isLeft(e) ? that() : of(e.right))),
    bimap: (ma, f, g) => M.map(ma, (e) => pipe(e, E.bimap(f, g))),
    mapLeft: (ma, f) => M.map(ma, (e) => pipe(e, E.mapLeft(f))),
    fold: (ma, onLeft, onRight) => M.chain(ma, E.fold(onLeft, onRight)),
    getOrElse: (ma, onLeft) => M.chain(ma, E.fold(onLeft, M.of)),
    orElse: (ma, f) =>
      M.chain(
        ma,
        E.fold(f, (a) => of(a))
      ),
    swap: (ma) => M.map(ma, E.swap),
    rightM: (ma) => M.map(ma, E.right),
    leftM: (ml) => M.map(ml, E.left),
    left: (e) => M.of(E.left(e))
  }
}
