/**
 * @since 3.0.0
 */
import { ap as ap_, Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C } from './Apply'
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C } from './Chain'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, map as map_ } from './Functor'
import type { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import type { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C } from './Pointed'
import type { Semigroup } from './Semigroup'
import * as T from './These'

import These = T.These

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function right<F extends URIS3>(F: Pointed3<F>): <A, S, R, E = never>(a: A) => Kind3<F, S, R, These<E, A>>
export function right<F extends URIS3, R>(F: Pointed3C<F, R>): <A, S, E = never>(a: A) => Kind3<F, S, R, These<E, A>>
export function right<F extends URIS2>(F: Pointed2<F>): <A, R, E = never>(a: A) => Kind2<F, R, These<E, A>>
export function right<F extends URIS2, R>(F: Pointed2C<F, R>): <A, E = never>(a: A) => Kind2<F, R, These<E, A>>
export function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, These<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>> {
  return flow(T.right, F.of)
}

/**
 * @since 3.0.0
 */
export function left<F extends URIS3>(F: Pointed3<F>): <E, S, R, A = never>(e: E) => Kind3<F, S, R, These<E, A>>
export function left<F extends URIS3, R>(F: Pointed3C<F, R>): <E, S, A = never>(e: E) => Kind3<F, S, R, These<E, A>>
export function left<F extends URIS2>(F: Pointed2<F>): <E, R, A = never>(e: E) => Kind2<F, R, These<E, A>>
export function left<F extends URIS2, R>(F: Pointed2C<F, R>): <E, A = never>(e: E) => Kind2<F, R, These<E, A>>
export function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, These<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>> {
  return flow(T.left, F.of)
}

/**
 * @since 3.0.0
 */
export function both<F extends URIS3>(F: Pointed3<F>): <E, A, S, R>(e: E, a: A) => Kind3<F, S, R, These<E, A>>
export function both<F extends URIS3, R>(F: Pointed3C<F, R>): <E, A>(e: E, a: A) => Kind3<F, R, R, These<E, A>>
export function both<F extends URIS2>(F: Pointed2<F>): <E, A, R>(e: E, a: A) => Kind2<F, R, These<E, A>>
export function both<F extends URIS2, R>(F: Pointed2C<F, R>): <E, A>(e: E, a: A) => Kind2<F, R, These<E, A>>
export function both<F extends URIS>(F: Pointed1<F>): <E, A>(e: E, a: A) => Kind<F, These<E, A>>
export function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>>
export function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>> {
  return flow(T.both, F.of)
}

/**
 * @since 3.0.0
 */
export function rightF<F extends URIS3>(
  F: Functor3<F>
): <S, R, A, E = never>(fa: Kind3<F, S, R, A>) => Kind3<F, S, R, These<E, A>>
export function rightF<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, A, E = never>(fa: Kind3<F, S, R, A>) => Kind3<F, S, R, These<E, A>>
export function rightF<F extends URIS2>(
  F: Functor2<F>
): <R, A, E = never>(fa: Kind2<F, R, A>) => Kind2<F, R, These<E, A>>
export function rightF<F extends URIS2, R>(
  F: Functor2C<F, R>
): <A, E = never>(fa: Kind2<F, R, A>) => Kind2<F, R, These<E, A>>
export function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>> {
  return F.map(T.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A = never>(fe: Kind3<F, S, R, E>) => Kind3<F, S, R, These<E, A>>
export function leftF<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, E, A = never>(fe: Kind3<F, S, R, E>) => Kind3<F, S, R, These<E, A>>
export function leftF<F extends URIS2>(
  F: Functor2<F>
): <R, E, A = never>(fe: Kind2<F, R, E>) => Kind2<F, R, These<E, A>>
export function leftF<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A = never>(fe: Kind2<F, R, E>) => Kind2<F, R, These<E, A>>
export function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>> {
  return F.map(T.left)
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<E, B>>
export function map<F extends URIS3, R>(
  F: Functor3C<F, R>
): <A, B>(f: (a: A) => B) => <S, E>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<E, B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<E, B>>
export function map<F extends URIS2, R>(
  F: Functor2C<F, R>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<E, B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, These<E, A>>) => Kind<F, These<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>> {
  return map_(F, T.Functor)
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS3, E>(
  F: Apply3<F>,
  S: Semigroup<E>
): <S, R, A>(
  fa: Kind3<F, S, R, These<E, A>>
) => <B>(fab: Kind3<F, S, R, These<E, (a: A) => B>>) => Kind3<F, S, R, These<E, B>>
export function ap<F extends URIS3, R, E>(
  F: Apply3C<F, R>,
  S: Semigroup<E>
): <S, A>(
  fa: Kind3<F, S, R, These<E, A>>
) => <B>(fab: Kind3<F, S, R, These<E, (a: A) => B>>) => Kind3<F, S, R, These<E, B>>
export function ap<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <R, A>(fa: Kind2<F, R, These<E, A>>) => <B>(fab: Kind2<F, R, These<E, (a: A) => B>>) => Kind2<F, R, These<E, B>>
export function ap<F extends URIS2, R, E>(
  F: Apply2C<F, R>,
  S: Semigroup<E>
): <A>(fa: Kind2<F, R, These<E, A>>) => <B>(fab: Kind2<F, R, These<E, (a: A) => B>>) => Kind2<F, R, These<E, B>>
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
 * @since 3.0.0
 */
export function chain<M extends URIS3, E>(
  M: Monad3<M>,
  S: Semigroup<E>
): <A, S, R, B>(
  f: (a: A) => Kind3<M, S, R, These<E, B>>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, These<E, B>>
export function chain<M extends URIS3, R, E>(
  M: Monad3C<M, R>,
  S: Semigroup<E>
): <A, S, B>(
  f: (a: A) => Kind3<M, S, R, These<E, B>>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, These<E, B>>
export function chain<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, R, B>(f: (a: A) => Kind2<M, R, These<E, B>>) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, These<E, B>>
export function chain<M extends URIS2, R, E>(
  M: Monad2C<M, R>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind2<M, R, These<E, B>>) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, These<E, B>>
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
    pipe(
      ma,
      M.chain(
        T.match(_left, f, (e1, a) =>
          pipe(
            f(a),
            M.map(
              T.match(
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
export function bimap<F extends URIS3>(
  F: Functor3<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, B>>
export function bimap<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, B>>
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, B>>
export function bimap<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, B>>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, These<E, A>>) => Kind<F, These<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>> {
  return flow(T.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends URIS3>(
  F: Functor3<F>
): <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, A>>
export function mapLeft<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, G>(f: (e: E) => G) => <S, A>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, A>>
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <R, A>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, A>>
export function mapLeft<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, These<E, A>>) => Kind<F, These<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>> {
  return (f) => F.map(T.mapLeft(f))
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends URIS3>(
  F: Functor3<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S, R>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, B>
export function match<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, B>
export function match<F extends URIS2>(
  F: Functor2<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <R>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, B>
export function match<M extends URIS2, R>(
  F: Functor2C<M, R>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export function match<F extends URIS>(
  F: Functor1<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: Kind<F, These<E, A>>) => Kind<F, B>
export function match<F>(
  F: Functor<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: HKT<F, These<E, A>>) => HKT<F, B>
export function match<F>(
  F: Functor<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: HKT<F, These<E, A>>) => HKT<F, B> {
  return flow(T.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends URIS3>(
  M: Chain3<M>
): <E, S, R, B, A>(
  onLeft: (e: E) => Kind3<M, S, R, B>,
  onRight: (a: A) => Kind3<M, S, R, B>,
  onBoth: (e: E, a: A) => Kind3<M, S, R, B>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, B>
export function matchE<M extends URIS3, R>(
  M: Chain3C<M, R>
): <E, S, B, A>(
  onLeft: (e: E) => Kind3<M, S, R, B>,
  onRight: (a: A) => Kind3<M, S, R, B>,
  onBoth: (e: E, a: A) => Kind3<M, S, R, B>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, B>
export function matchE<M extends URIS2>(
  M: Chain2<M>
): <E, R, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>,
  onBoth: (e: E, a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export function matchE<M extends URIS2, R>(
  M: Chain2C<M, R>
): <E, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>,
  onBoth: (e: E, a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export function matchE<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(
  onLeft: (e: E) => Kind<M, B>,
  onRight: (a: A) => Kind<M, B>,
  onBoth: (e: E, a: A) => Kind<M, B>
) => (ma: Kind<M, These<E, A>>) => Kind<M, B>
export function matchE<M>(
  M: Chain<M>
): <E, B, A>(
  onLeft: (e: E) => HKT<M, B>,
  onRight: (a: A) => HKT<M, B>,
  onBoth: (e: E, a: A) => HKT<M, B>
) => (ma: HKT<M, These<E, A>>) => HKT<M, B>
export function matchE<M>(
  M: Chain<M>
): <E, B, A>(
  onLeft: (e: E) => HKT<M, B>,
  onRight: (a: A) => HKT<M, B>,
  onBoth: (e: E, a: A) => HKT<M, B>
) => (ma: HKT<M, These<E, A>>) => HKT<M, B> {
  return flow(T.match, M.chain)
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<A, E>>
export function swap<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, E, A>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<A, E>>
export function swap<F extends URIS2>(
  F: Functor2<F>
): <R, E, A>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<A, E>>
export function swap<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<A, E>>
export function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>> {
  return F.map(T.swap)
}

/**
 * @since 3.0.0
 */
export function toTuple2<F extends URIS3>(
  F: Functor3<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <S, R>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, readonly [E, A]>
export function toTuple2<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <S>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, readonly [E, A]>
export function toTuple2<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <R>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, readonly [E, A]>
export function toTuple2<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, readonly [E, A]>
export function toTuple2<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
export function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]> {
  return flow(T.toTuple2, F.map)
}
