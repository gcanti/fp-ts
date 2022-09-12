/**
 * @since 3.0.0
 */
import { ap as ap_, Apply } from './Apply'
import type { Chain } from './Chain'
import { flow, Lazy, pipe } from './function'
import { Functor, map as map_ } from './Functor'
import type { HKT, Kind } from './HKT'
import type { Monad } from './Monad'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'
import * as T from './These'

import These = T.These

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function right<F extends HKT>(
  F: Pointed<F>
): <A, S, R, W, FE, E = never>(a: A) => Kind<F, S, R, W, FE, These<E, A>> {
  return flow(T.right, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function left<F extends HKT>(
  F: Pointed<F>
): <E, S, R, W, FE, A = never>(e: E) => Kind<F, S, R, W, FE, These<E, A>> {
  return flow(T.left, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function both<F extends HKT>(
  F: Pointed<F>
): <E, A, S, R, W, FE>(e: E, a: A) => Kind<F, S, R, W, FE, These<E, A>> {
  return flow(T.both, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, A, E = never>(fa: Kind<F, S, R, W, FE, A>) => Kind<F, S, R, W, FE, These<E, A>> {
  return F.map(T.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A = never>(fe: Kind<F, S, R, W, FE, E>) => Kind<F, S, R, W, FE, These<E, A>> {
  return F.map(T.left)
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, W, FE, E>(fa: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<E, B>> {
  return map_(F, T.Functor) as any // TODO
}

/**
 * @since 3.0.0
 */
export function ap<F extends HKT, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <S, R, W, FE, A>(
  fa: Kind<F, S, R, W, FE, These<E, A>>
) => <B>(fab: Kind<F, S, R, W, FE, These<E, (a: A) => B>>) => Kind<F, S, R, W, FE, These<E, B>> {
  return ap_(F, T.getApply(S)) as any // TODO
}

/**
 * @since 3.0.0
 */
export function chain<M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, S, R, W, FE, B>(
  f: (a: A) => Kind<M, S, R, W, FE, These<E, B>>
) => (ma: Kind<M, S, R, W, FE, These<E, A>>) => Kind<M, S, R, W, FE, These<E, B>> {
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
export function bimap<F extends HKT>(
  F: Functor<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, W, FE>(fea: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, B>> {
  return flow(T.bimap, F.map) as any // TODO
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(
  f: (e: E) => G
) => <S, R, W, FE, A>(fea: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, A>> {
  return (f) => F.map(T.mapLeft(f))
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S, R, W, FE>(ma: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, B> {
  return flow(T.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT>(
  M: Chain<M>
): <E, S, R, W, FE, B, A>(
  onLeft: (e: E) => Kind<M, S, R, W, FE, B>,
  onRight: (a: A) => Kind<M, S, R, W, FE, B>,
  onBoth: (e: E, a: A) => Kind<M, S, R, W, FE, B>
) => (ma: Kind<M, S, R, W, FE, These<E, A>>) => Kind<M, S, R, W, FE, B> {
  return flow(T.match, M.chain)
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(ma: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<A, E>> {
  return F.map(T.swap)
}

/**
 * @since 3.0.0
 */
export function toTuple2<F extends HKT>(
  F: Functor<F>
): <E, A>(
  e: Lazy<E>,
  a: Lazy<A>
) => <S, R, W, FE>(fa: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, readonly [E, A]> {
  return flow(T.toTuple2, F.map)
}
