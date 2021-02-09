/**
 * @since 2.4.0
 */
import { Apply, Apply1, Apply2, ap as ap_ } from './Apply'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, map as map_ } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Pointed, Pointed1, Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'
import * as T from './These'

import These = T.These

/**
 * @since 2.10.0
 */
export function right<F extends URIS2>(F: Pointed2<F>): <A, FE, E = never>(a: A) => Kind2<F, FE, These<E, A>>
export function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, These<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>> {
  return flow(T.right, F.of)
}

/**
 * @since 2.10.0
 */
export function left<F extends URIS2>(F: Pointed2<F>): <E, FE, A = never>(e: E) => Kind2<F, FE, These<E, A>>
export function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, These<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>> {
  return flow(T.left, F.of)
}

/**
 * @since 2.10.0
 */
export function both<F extends URIS2>(F: Pointed2<F>): <E, FE, A>(e: E, a: A) => Kind2<F, FE, These<E, A>>
export function both<F extends URIS>(F: Pointed1<F>): <E, A>(e: E, a: A) => Kind<F, These<E, A>>
export function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>>
export function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>> {
  return flow(T.both, F.of)
}

/**
 * @since 2.10.0
 */
export function rightF<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, These<E, A>>
export function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>> {
  return (fa) => F.map(fa, T.right)
}

/**
 * @since 2.10.0
 */
export function leftF<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, These<E, A>>
export function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>> {
  return (fe) => F.map(fe, T.left)
}

/**
 * @since 2.10.0
 */
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<E, B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, These<E, A>>) => Kind<F, These<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>> {
  return map_(F, T.Functor)
}

/**
 * @since 2.10.0
 */
export function ap<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <FE, A>(fa: Kind2<F, FE, These<E, A>>) => <B>(fab: Kind2<F, FE, These<E, (a: A) => B>>) => Kind2<F, FE, These<E, B>>
export function ap<F extends URIS, E>(
  F: Apply1<F>,
  S: Semigroup<E>
): <A>(fa: Kind<F, These<E, A>>) => <B>(fab: Kind<F, These<E, (a: A) => B>>) => Kind<F, These<E, B>>
export function ap<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>>
export function ap<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>> {
  return ap_(F, T.getApply(S))
}

/**
 * @since 2.10.0
 */
export function chain<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, ME, B>(f: (a: A) => Kind2<M, ME, These<E, B>>) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, These<E, B>>
export function chain<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind<M, These<E, B>>) => (ma: Kind<M, These<E, A>>) => Kind<M, These<E, B>>
export function chain<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>>
export function chain<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>> {
  const _left = left(M)
  return (f) => (ma) =>
    M.chain(
      ma,
      T.fold(_left, f, (e1, a) =>
        M.map(
          f(a),
          T.fold(
            (e2) => T.left(S.concat(e1, e2)),
            (b) => T.both(e1, b),
            (e2, b) => T.both(S.concat(e1, e2), b)
          )
        )
      )
    )
}

/**
 * @since 2.10.0
 */
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, B>>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, These<E, A>>) => Kind<F, These<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>> {
  return (f, g) => (fea) => F.map(fea, T.bimap(f, g))
}

/**
 * @since 2.10.0
 */
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, These<E, A>>) => Kind<F, These<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>> {
  return (f) => (fea) => F.map(fea, T.mapLeft(f))
}

/**
 * @since 2.10.0
 */
export function match<M extends URIS2>(
  M: Monad2<M>
): <E, ME, R, A>(
  onLeft: (e: E) => Kind2<M, ME, R>,
  onRight: (a: A) => Kind2<M, ME, R>,
  onBoth: (e: E, a: A) => Kind2<M, ME, R>
) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, R>
export function match<M extends URIS>(
  M: Monad1<M>
): <E, R, A>(
  onLeft: (e: E) => Kind<M, R>,
  onRight: (a: A) => Kind<M, R>,
  onBoth: (e: E, a: A) => Kind<M, R>
) => (ma: Kind<M, These<E, A>>) => Kind<M, R>
export function match<M>(
  M: Monad<M>
): <E, R, A>(
  onLeft: (e: E) => HKT<M, R>,
  onRight: (a: A) => HKT<M, R>,
  onBoth: (e: E, a: A) => HKT<M, R>
) => (ma: HKT<M, These<E, A>>) => HKT<M, R>
export function match<M>(
  M: Monad<M>
): <E, R, A>(
  onLeft: (e: E) => HKT<M, R>,
  onRight: (a: A) => HKT<M, R>,
  onBoth: (e: E, a: A) => HKT<M, R>
) => (ma: HKT<M, These<E, A>>) => HKT<M, R> {
  return (onLeft, onRight, onBoth) => (ma) => M.chain(ma, T.fold(onLeft, onRight, onBoth))
}

/**
 * @since 2.10.0
 */
export function swap<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<A, E>>
export function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>> {
  return (ma) => F.map(ma, T.swap)
}

/**
 * @since 2.10.0
 */
export function toTuple2<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <FE>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, readonly [E, A]>
export function toTuple2<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
export function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]> {
  return (e, a) => (fa) => F.map(fa, T.toTuple2(e, a))
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * @category model
 * @since 2.4.0
 * @deprecated
 */
export interface TheseT<M, E, A> extends HKT<M, These<E, A>> {}

/**
 * @since 2.4.0
 * @deprecated
 */
export interface TheseM<M> {
  readonly map: <E, A, B>(fa: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT<M, E, A>, f: (e: E) => N) => TheseT<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT<M, E, A>,
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>,
    onBoth: (e: E, a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly swap: <E, A>(fa: TheseT<M, E, A>) => TheseT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => TheseT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => TheseT<M, E, A>
  readonly left: <E, A>(e: E) => TheseT<M, E, A>
  readonly right: <E, A>(a: A) => TheseT<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT<M, E, A>, e: E, a: A) => HKT<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
    readonly of: <A>(a: A) => TheseT<M, E, A>
    readonly ap: <A, B>(mab: TheseT<M, E, (a: A) => B>, ma: TheseT<M, E, A>) => TheseT<M, E, B>
    readonly chain: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => TheseT<M, E, B>) => TheseT<M, E, B>
  }
}

/**
 * @category model
 * @since 2.4.0
 * @deprecated
 */
export type TheseT1<M extends URIS, E, A> = Kind<M, These<E, A>>

/**
 * @since 2.4.0
 * @deprecated
 */
export interface TheseM1<M extends URIS> {
  readonly map: <E, A, B>(fa: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT1<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT1<M, E, A>, f: (e: E) => N) => TheseT1<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>,
    onBoth: (e: E, a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly swap: <E, A>(fa: TheseT1<M, E, A>) => TheseT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => TheseT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => TheseT1<M, E, A>
  readonly left: <E, A>(e: E) => TheseT1<M, E, A>
  readonly right: <E, A>(a: A) => TheseT1<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT1<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT1<M, E, A>, e: E, a: A) => Kind<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
    readonly of: <A>(a: A) => TheseT1<M, E, A>
    readonly ap: <A, B>(mab: TheseT1<M, E, (a: A) => B>, ma: TheseT1<M, E, A>) => TheseT1<M, E, B>
    readonly chain: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => TheseT1<M, E, B>) => TheseT1<M, E, B>
  }
}

/**
 * @category model
 * @since 2.4.0
 * @deprecated
 */
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, These<E, A>>

/**
 * @since 2.4.0
 * @deprecated
 */
export interface TheseM2<M extends URIS2> {
  readonly map: <R, E, A, B>(fa: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
  readonly bimap: <R, E, A, N, B>(fa: TheseT2<M, R, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(fa: TheseT2<M, R, E, A>, f: (e: E) => N) => TheseT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    fa: TheseT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>,
    onBoth: (e: E, a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly swap: <R, E, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => TheseT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => TheseT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => TheseT2<M, R, E, A>
  readonly right: <R, E, A>(a: A) => TheseT2<M, R, E, A>
  readonly both: <R, E, A>(e: E, a: A) => TheseT2<M, R, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <R, E, A>(fa: TheseT2<M, R, E, A>, e: E, a: A) => Kind2<M, R, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
    readonly of: <R, A>(a: A) => TheseT2<M, R, E, A>
    readonly ap: <R, A, B>(mab: TheseT2<M, R, E, (a: A) => B>, ma: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
    readonly chain: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => TheseT2<M, R, E, B>) => TheseT2<M, R, E, B>
  }
}

/**
 * @since 2.4.0
 * @deprecated
 */
export function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
/** @deprecated */
export function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
/** @deprecated */
export function getTheseM<M>(M: Monad<M>): TheseM<M>
/** @deprecated */
/* istanbul ignore next */
export function getTheseM<M>(M: Monad<M>): TheseM<M> {
  const _map = map(M)
  const _bimap = bimap(M)
  const _mapLeft = mapLeft(M)
  const _fold = match(M)
  const _toTuple2: <E, A>(
    e: Lazy<E>,
    a: Lazy<A>
    // tslint:disable-next-line: readonly-array
  ) => (fa: HKT<M, T.These<E, A>>) => HKT<M, [E, A]> = toTuple2(M) as any
  const of = right(M)

  const mapT = <E, A, B>(fa: TheseT<M, E, A>, f: (a: A) => B): TheseT<M, E, B> => pipe(fa, _map(f))

  return {
    map: mapT,
    bimap: (fea, f, g) => pipe(fea, _bimap(f, g)),
    mapLeft: (fea, f) => pipe(fea, _mapLeft(f)),
    fold: (fa, onLeft, onRight, onBoth) => pipe(fa, _fold(onLeft, onRight, onBoth)),
    swap: swap(M),
    rightM: rightF(M),
    leftM: leftF(M),
    left: left(M),
    right: right(M),
    both: both(M),
    toTuple: (fa, e, a) =>
      pipe(
        fa,
        _toTuple2(
          () => e,
          () => a
        )
      ),
    getMonad: (S) => {
      const _ap = ap(M, S)
      const _chain = chain(M, S)
      return {
        _E: undefined as any,
        map: mapT,
        of,
        ap: (fab, fa) => pipe(fab, _ap(fa)),
        chain: (ma, f) => pipe(ma, _chain(f))
      }
    }
  }
}
