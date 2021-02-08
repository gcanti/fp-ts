/**
 * @since 3.0.0
 */
import { Apply, Apply1, Apply2, ap as ap_ } from './Apply'
import * as E from './Either'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, map as map_ } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Pointed, Pointed1, Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'

import Either = E.Either

/**
 * @since 3.0.0
 */
export function right<F extends URIS2>(F: Pointed2<F>): <A, FE, E = never>(a: A) => Kind2<F, FE, Either<E, A>>
export function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, Either<E, A>> {
  return flow(E.right, F.of)
}

/**
 * @since 3.0.0
 */
export function left<F extends URIS2>(F: Pointed2<F>): <E, FE, A = never>(e: E) => Kind2<F, FE, Either<E, A>>
export function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, Either<E, A>> {
  return flow(E.left, F.of)
}

/**
 * @since 3.0.0
 */
export function rightF<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>> {
  return F.map(E.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>> {
  return F.map(E.left)
}

/**
 * @since 3.0.0
 */
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<E, B>>
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
export function ap<F extends URIS2>(
  F: Apply2<F>
): <FE, E, A>(
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
export function chain<M extends URIS2>(
  M: Monad2<M>
): <A, ME, E, B>(
  f: (a: A) => Kind2<M, ME, Either<E, B>>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, B>>
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, E, B>(f: (a: A) => Kind<M, Either<E, B>>) => (ma: Kind<M, Either<E, A>>) => Kind<M, Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>> {
  return (f) => M.chain((e) => (E.isLeft(e) ? M.of(e) : f(e.right)))
}

/**
 * @since 3.0.0
 */
export function alt<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A>(
  second: Lazy<Kind2<M, ME, Either<E, A>>>
) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export function alt<M extends URIS>(
  M: Monad1<M>
): <E, A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>> {
  return (second) => M.chain((e) => (E.isLeft(e) ? second() : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, B>>
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
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, A>>
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
export function match<M extends URIS2>(
  M: Monad2<M>
): <E, R, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, Either<E, A>>) => Kind2<M, R, B>
export function match<M extends URIS>(
  M: Monad1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: Kind<M, Either<E, A>>) => Kind<M, B>
export function match<M>(
  M: Monad<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, Either<E, A>>) => HKT<M, B>
export function match<M>(
  M: Monad<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, Either<E, A>>) => HKT<M, B> {
  return (onLeft, onRight) => M.chain(E.match(onLeft, onRight))
}

/**
 * @since 3.0.0
 */
export function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, ME, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, A>
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
export function orElse<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2, A>(
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
  return (onLeft) => M.chain((e) => (E.isLeft(e) ? onLeft(e.left) : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function swap<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<A, E>>
export function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, Either<E, A>>) => Kind<F, Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>> {
  return F.map(E.swap)
}

/**
 * @since 3.0.0
 */
export function altValidation<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <R, A>(second: Lazy<Kind2<M, R, Either<E, A>>>) => (first: Kind2<M, R, Either<E, A>>) => Kind2<M, R, Either<E, A>>
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
export function toUnion<F extends URIS2>(F: Functor2<F>): <R, E, A>(fa: Kind2<F, R, Either<E, A>>) => Kind2<F, R, E | A>
export function toUnion<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, Either<E, A>>) => Kind<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A> {
  return F.map(E.toUnion)
}
