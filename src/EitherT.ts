/**
 * @since 3.0.0
 */
import { ap as ap_, Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import * as E from './Either'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4, map as map_ } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'
import { Semigroup } from './Semigroup'

import Either = E.Either

/**
 * @since 3.0.0
 */
export function right<F extends URIS4>(
  F: Pointed4<F>
): <A, S, R, FE, E = never>(a: A) => Kind4<F, S, R, FE, Either<E, A>>
export function right<F extends URIS3>(F: Pointed3<F>): <A, R, FE, E = never>(a: A) => Kind3<F, R, FE, Either<E, A>>
export function right<F extends URIS3, FE>(
  F: Pointed3C<F, FE>
): <A, R, E = never>(a: A) => Kind3<F, R, FE, Either<E, A>>
export function right<F extends URIS2>(F: Pointed2<F>): <A, FE, E = never>(a: A) => Kind2<F, FE, Either<E, A>>
export function right<F extends URIS2, FE>(F: Pointed2C<F, FE>): <A, E = never>(a: A) => Kind2<F, FE, Either<E, A>>
export function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, Either<E, A>> {
  return flow(_.right, F.of)
}

/**
 * @since 3.0.0
 */
export function left<F extends URIS4>(
  F: Pointed4<F>
): <E, S, R, FE, A = never>(e: E) => Kind4<F, S, R, FE, Either<E, A>>
export function left<F extends URIS3>(F: Pointed3<F>): <E, R, FE, A = never>(e: E) => Kind3<F, R, FE, Either<E, A>>
export function left<F extends URIS3, FE>(F: Pointed3C<F, FE>): <E, R, A = never>(e: E) => Kind3<F, R, FE, Either<E, A>>
export function left<F extends URIS2>(F: Pointed2<F>): <E, FE, A = never>(e: E) => Kind2<F, FE, Either<E, A>>
export function left<F extends URIS2, FE>(F: Pointed2C<F, FE>): <E, A = never>(e: E) => Kind2<F, FE, Either<E, A>>
export function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, Either<E, A>> {
  return flow(_.left, F.of)
}

/**
 * @since 3.0.0
 */
export function rightF<F extends URIS4>(
  F: Functor4<F>
): <S, R, FE, A, E = never>(fa: Kind4<F, S, R, FE, A>) => Kind4<F, S, R, FE, Either<E, A>>
export function rightF<F extends URIS3>(
  F: Functor3<F>
): <R, FE, A, E = never>(fa: Kind3<F, R, FE, A>) => Kind3<F, R, FE, Either<E, A>>
export function rightF<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, A, E = never>(fa: Kind3<F, R, FE, A>) => Kind3<F, R, FE, Either<E, A>>
export function rightF<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export function rightF<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>> {
  return F.map(_.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends URIS4>(
  F: Functor4<F>
): <S, R, FE, E, A = never>(fe: Kind4<F, S, R, FE, E>) => Kind4<F, S, R, FE, Either<E, A>>
export function leftF<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A = never>(fe: Kind3<F, R, FE, E>) => Kind3<F, R, FE, Either<E, A>>
export function leftF<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A = never>(fe: Kind3<F, R, FE, E>) => Kind3<F, R, FE, Either<E, A>>
export function leftF<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export function leftF<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>> {
  return F.map(_.left)
}

/**
 * @since 3.0.0
 */
export function map<F extends URIS4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <S, R, FE, E>(fa: Kind4<F, S, R, FE, Either<E, A>>) => Kind4<F, S, R, FE, Either<E, B>>
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, FE, E>(fa: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<E, B>>
export function map<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<E, B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<E, B>>
export function map<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<E, B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Either<E, A>>) => Kind<F, Either<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Either<E, A>>) => HKT<F, Either<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Either<E, A>>) => HKT<F, Either<E, B>> {
  return map_(F, E.Functor)
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS4>(
  F: Apply4<F>
): <S, R, FE, E, A>(
  fa: Kind4<F, S, R, FE, Either<E, A>>
) => <B>(fab: Kind4<F, S, R, FE, Either<E, (a: A) => B>>) => Kind4<F, S, R, FE, Either<E, B>>
export function ap<F extends URIS3>(
  F: Apply3<F>
): <R, FE, E, A>(
  fa: Kind3<F, R, FE, Either<E, A>>
) => <B>(fab: Kind3<F, R, FE, Either<E, (a: A) => B>>) => Kind3<F, R, FE, Either<E, B>>
export function ap<F extends URIS3, FE>(
  F: Apply3C<F, FE>
): <R, E, A>(
  fa: Kind3<F, R, FE, Either<E, A>>
) => <B>(fab: Kind3<F, R, FE, Either<E, (a: A) => B>>) => Kind3<F, R, FE, Either<E, B>>
export function ap<F extends URIS2>(
  F: Apply2<F>
): <FE, E, A>(
  fa: Kind2<F, FE, Either<E, A>>
) => <B>(fab: Kind2<F, FE, Either<E, (a: A) => B>>) => Kind2<F, FE, Either<E, B>>
export function ap<F extends URIS2, FE>(
  F: Apply2C<F, FE>
): <E, A>(
  fa: Kind2<F, FE, Either<E, A>>
) => <B>(fab: Kind2<F, FE, Either<E, (a: A) => B>>) => Kind2<F, FE, Either<E, B>>
export function ap<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: Kind<F, Either<E, A>>) => <B>(fab: Kind<F, Either<E, (a: A) => B>>) => Kind<F, Either<E, B>>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, Either<E, A>>) => <B>(fab: HKT<F, Either<E, (a: A) => B>>) => HKT<F, Either<E, B>>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, Either<E, A>>) => <B>(fab: HKT<F, Either<E, (a: A) => B>>) => HKT<F, Either<E, B>> {
  return ap_(F, E.Apply)
}

/**
 * @since 3.0.0
 */
export function chain<M extends URIS4>(
  M: Monad4<M>
): <A, S, R, ME, E, B>(
  f: (a: A) => Kind4<M, S, R, ME, Either<E, B>>
) => (ma: Kind4<M, S, R, ME, Either<E, A>>) => Kind4<M, S, R, ME, Either<E, B>>
export function chain<M extends URIS3>(
  M: Monad3<M>
): <A, R, ME, E, B>(
  f: (a: A) => Kind3<M, R, ME, Either<E, B>>
) => (ma: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, B>>
export function chain<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <A, R, E, B>(
  f: (a: A) => Kind3<M, R, ME, Either<E, B>>
) => (ma: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, B>>
export function chain<M extends URIS2>(
  M: Monad2<M>
): <A, ME, E, B>(
  f: (a: A) => Kind2<M, ME, Either<E, B>>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, B>>
export function chain<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <A, E, B>(f: (a: A) => Kind2<M, ME, Either<E, B>>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, B>>
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, E, B>(f: (a: A) => Kind<M, Either<E, B>>) => (ma: Kind<M, Either<E, A>>) => Kind<M, Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>> {
  return (f) => M.chain((e) => (_.isLeft(e) ? M.of(e) : f(e.right)))
}

/**
 * @since 3.0.0
 */
export function alt<M extends URIS4>(
  M: Monad4<M>
): <S, R, ME, E, A>(
  second: Lazy<Kind4<M, S, R, ME, Either<E, A>>>
) => (first: Kind4<M, S, R, ME, Either<E, A>>) => Kind4<M, S, R, ME, Either<E, A>>
export function alt<M extends URIS3>(
  M: Monad3<M>
): <R, ME, E, A>(
  second: Lazy<Kind3<M, R, ME, Either<E, A>>>
) => (first: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, A>>
export function alt<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <R, E, A>(
  second: Lazy<Kind3<M, R, ME, Either<E, A>>>
) => (first: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, A>>
export function alt<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A>(
  second: Lazy<Kind2<M, ME, Either<E, A>>>
) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function alt<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A>(second: Lazy<Kind2<M, ME, Either<E, A>>>) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function alt<M extends URIS>(
  M: Monad1<M>
): <E, A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>> {
  return (second) => M.chain((e) => (_.isLeft(e) ? second() : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function bimap<F extends URIS4>(
  F: Functor4<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, FE>(fea: Kind4<F, S, R, FE, Either<E, A>>) => Kind4<F, S, R, FE, Either<G, B>>
export function bimap<F extends URIS3>(
  F: Functor3<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R, FE>(fea: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<G, B>>
export function bimap<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<G, B>>
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, B>>
export function bimap<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, B>>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, B>> {
  return flow(E.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends URIS4>(
  F: Functor4<F>
): <E, G>(f: (e: E) => G) => <S, R, FE, A>(fea: Kind4<F, S, R, FE, Either<E, A>>) => Kind4<F, S, R, FE, Either<G, A>>
export function mapLeft<F extends URIS3>(
  F: Functor3<F>
): <E, G>(f: (e: E) => G) => <R, FE, A>(fea: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<G, A>>
export function mapLeft<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<G, A>>
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, A>>
export function mapLeft<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, A>> {
  return (f) => F.map(E.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export function match<M extends URIS4>(
  M: Chain4<M>
): <E, S, R, FE, B, A>(
  onLeft: (e: E) => Kind4<M, S, R, FE, B>,
  onRight: (a: A) => Kind4<M, S, R, FE, B>
) => (ma: Kind4<M, S, R, FE, Either<E, A>>) => Kind4<M, S, R, FE, B>
export function match<M extends URIS3>(
  M: Chain3<M>
): <E, R, FE, B, A>(
  onLeft: (e: E) => Kind3<M, R, FE, B>,
  onRight: (a: A) => Kind3<M, R, FE, B>
) => (ma: Kind3<M, R, FE, Either<E, A>>) => Kind3<M, R, FE, B>
export function match<M extends URIS3, FE>(
  M: Chain3C<M, FE>
): <E, R, B, A>(
  onLeft: (e: E) => Kind3<M, R, FE, B>,
  onRight: (a: A) => Kind3<M, R, FE, B>
) => (ma: Kind3<M, R, FE, Either<E, A>>) => Kind3<M, R, FE, B>
export function match<M extends URIS2>(
  M: Chain2<M>
): <E, FE, B, A>(
  onLeft: (e: E) => Kind2<M, FE, B>,
  onRight: (a: A) => Kind2<M, FE, B>
) => (ma: Kind2<M, FE, Either<E, A>>) => Kind2<M, FE, B>
export function match<M extends URIS2, FE>(
  M: Chain2C<M, FE>
): <E, B, A>(
  onLeft: (e: E) => Kind2<M, FE, B>,
  onRight: (a: A) => Kind2<M, FE, B>
) => (ma: Kind2<M, FE, Either<E, A>>) => Kind2<M, FE, B>
export function match<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: Kind<M, Either<E, A>>) => Kind<M, B>
export function match<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, Either<E, A>>) => HKT<M, B>
export function match<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, Either<E, A>>) => HKT<M, B> {
  return flow(E.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<M extends URIS4>(
  M: Monad4<M>
): <E, S, R, ME, A>(
  onLeft: (e: E) => Kind4<M, S, R, ME, A>
) => (ma: Kind4<M, S, R, ME, Either<E, A>>) => Kind4<M, S, R, ME, A>
export function getOrElse<M extends URIS3>(
  M: Monad3<M>
): <E, R, ME, A>(onLeft: (e: E) => Kind3<M, R, ME, A>) => (ma: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, A>
export function getOrElse<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E, R, A>(onLeft: (e: E) => Kind3<M, R, ME, A>) => (ma: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, A>
export function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, ME, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, A>
export function getOrElse<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, A>
export function getOrElse<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: Kind<M, Either<E, A>>) => Kind<M, A>
export function getOrElse<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, Either<E, A>>) => HKT<M, A>
export function getOrElse<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, Either<E, A>>) => HKT<M, A> {
  return (onLeft) => M.chain(E.match(onLeft, M.of))
}

/**
 * @since 3.0.0
 */
export function orElse<M extends URIS4>(
  M: Monad4<M>
): <E1, S, R, ME, E2, A>(
  onLeft: (e: E1) => Kind4<M, S, R, ME, Either<E2, A>>
) => (ma: Kind4<M, S, R, ME, Either<E1, A>>) => Kind4<M, S, R, ME, Either<E2, A>>
export function orElse<M extends URIS3>(
  M: Monad3<M>
): <E1, R, ME, E2, A>(
  onLeft: (e: E1) => Kind3<M, R, ME, Either<E2, A>>
) => (ma: Kind3<M, R, ME, Either<E1, A>>) => Kind3<M, R, ME, Either<E2, A>>
export function orElse<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E1, R, E2, A>(
  onLeft: (e: E1) => Kind3<M, R, ME, Either<E2, A>>
) => (ma: Kind3<M, R, ME, Either<E1, A>>) => Kind3<M, R, ME, Either<E2, A>>
export function orElse<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, Either<E2, A>>
) => (ma: Kind2<M, ME, Either<E1, A>>) => Kind2<M, ME, Either<E2, A>>
export function orElse<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E1, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, Either<E2, A>>
) => (ma: Kind2<M, ME, Either<E1, A>>) => Kind2<M, ME, Either<E2, A>>
export function orElse<M extends URIS>(
  M: Monad1<M>
): <E1, E2, A>(onLeft: (e: E1) => Kind<M, Either<E2, A>>) => (ma: Kind<M, Either<E1, A>>) => Kind<M, Either<E2, A>>
export function orElse<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, Either<E2, A>>) => (ma: HKT<M, Either<E1, A>>) => HKT<M, Either<E2, A>>
export function orElse<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, Either<E2, A>>) => (ma: HKT<M, Either<E1, A>>) => HKT<M, Either<E2, A>> {
  return (onLeft) => M.chain((e) => (_.isLeft(e) ? onLeft(e.left) : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function swap<F extends URIS4>(
  F: Functor4<F>
): <S, R, FE, E, A>(ma: Kind4<F, S, R, FE, Either<E, A>>) => Kind4<F, S, R, FE, Either<A, E>>
export function swap<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A>(ma: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<A, E>>
export function swap<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A>(ma: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, Either<A, E>>
export function swap<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<A, E>>
export function swap<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A>(ma: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<A, E>>
export function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, Either<E, A>>) => Kind<F, Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>> {
  return F.map(E.swap)
}

/**
 * @since 3.0.0
 */
export function altValidation<M extends URIS4, E>(
  M: Monad4<M>,
  S: Semigroup<E>
): <S, R, ME, A>(
  second: Lazy<Kind4<M, S, R, ME, Either<E, A>>>
) => (first: Kind4<M, S, R, ME, Either<E, A>>) => Kind4<M, S, R, ME, Either<E, A>>
export function altValidation<M extends URIS3, E>(
  M: Monad3<M>,
  S: Semigroup<E>
): <R, ME, A>(
  second: Lazy<Kind3<M, R, ME, Either<E, A>>>
) => (first: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, A>>
export function altValidation<M extends URIS3, ME, E>(
  M: Monad3C<M, ME>,
  S: Semigroup<E>
): <R, A>(
  second: Lazy<Kind3<M, R, ME, Either<E, A>>>
) => (first: Kind3<M, R, ME, Either<E, A>>) => Kind3<M, R, ME, Either<E, A>>
export function altValidation<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <ME, A>(
  second: Lazy<Kind2<M, ME, Either<E, A>>>
) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function altValidation<M extends URIS2, ME, E>(
  M: Monad2C<M, ME>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind2<M, ME, Either<E, A>>>) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function altValidation<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export function altValidation<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
export function altValidation<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>> {
  return (second) => (first) =>
    pipe(first, M.chain(E.match((e1) => pipe(second(), M.map(E.mapLeft((e2) => S.concat(e2)(e1)))), right(M))))
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends URIS4>(
  F: Functor4<F>
): <S, R, FE, E, A>(fa: Kind4<F, S, R, FE, Either<E, A>>) => Kind4<F, S, R, FE, E | A>
export function toUnion<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A>(fa: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, E | A>
export function toUnion<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A>(fa: Kind3<F, R, FE, Either<E, A>>) => Kind3<F, R, FE, E | A>
export function toUnion<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, E | A>
export function toUnion<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, E | A>
export function toUnion<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, Either<E, A>>) => Kind<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A> {
  return F.map(E.toUnion)
}

/**
 * @since 3.0.0
 */
export function bracket<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A, B>(
  acquire: Kind2<M, ME, Either<E, A>>,
  use: (a: A) => Kind2<M, ME, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind2<M, ME, Either<E, void>>
) => Kind2<M, ME, Either<E, B>>
export function bracket<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A, B>(
  acquire: Kind2<M, ME, Either<E, A>>,
  use: (a: A) => Kind2<M, ME, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind2<M, ME, Either<E, void>>
) => Kind2<M, ME, Either<E, B>>
export function bracket<M extends URIS>(
  M: Monad1<M>
): <E, A, B>(
  acquire: Kind<M, Either<E, A>>,
  use: (a: A) => Kind<M, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind<M, Either<E, void>>
) => Kind<M, Either<E, B>>
export function bracket<M>(
  M: Monad<M>
): <E, A, B>(
  acquire: HKT<M, Either<E, A>>,
  use: (a: A) => HKT<M, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => HKT<M, Either<E, void>>
) => HKT<M, Either<E, B>>
export function bracket<M>(
  M: Monad<M>
): <E, A, B>(
  acquire: HKT<M, Either<E, A>>,
  use: (a: A) => HKT<M, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => HKT<M, Either<E, void>>
) => HKT<M, Either<E, B>> {
  const leftM = left(M)
  return (acquire, use, release) =>
    pipe(
      acquire,
      M.chain(
        E.match(leftM, (a) =>
          pipe(
            use(a),
            M.chain((e) => pipe(release(a, e), M.chain(E.match(leftM, () => M.of(e)))))
          )
        )
      )
    )
}
