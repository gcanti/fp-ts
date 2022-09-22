/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import { ap as ap_ } from './Apply'
import type { Flattenable } from './Flattenable'
import type { LazyArg } from './function'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import { map as map_ } from './Functor'
import type { HKT, Kind } from './HKT'
import type { Monad } from './Monad'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'
import * as T from './These'
import type { These } from './These'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const right =
  <F extends HKT>(F: Pointed<F>) =>
  <A, S, R = unknown, W = never, FE = never, E = never>(a: A): Kind<F, S, R, W, FE, These<E, A>> =>
    F.of(T.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends HKT>(F: Pointed<F>) =>
  <E, S, R = unknown, W = never, FE = never, A = never>(e: E): Kind<F, S, R, W, FE, These<E, A>> =>
    F.of(T.left(e))

/**
 * @since 3.0.0
 */
export const both =
  <F extends HKT>(F: Pointed<F>) =>
  <E, A, S, R = unknown, W = never, FE = never>(e: E, a: A): Kind<F, S, R, W, FE, These<E, A>> =>
    F.of(T.both(e, a))

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
  return map_(F, T.Functor)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT, E>(
  F: Apply<F>,
  S: Semigroup<E>
): (<S, R2, W2, FE2, A>(
  fa: Kind<F, S, R2, W2, FE2, These<E, A>>
) => <R1, W1, FE1, B>(
  fab: Kind<F, S, R1, W1, FE1, These<E, (a: A) => B>>
) => Kind<F, S, R1 & R2, W1 | W2, FE1 | FE2, These<E, B>>) => {
  return ap_(F, T.getApply(S))
}

/**
 * @since 3.0.0
 */
export const flatMap = <M extends HKT, E>(M: Monad<M>, S: Semigroup<E>) => {
  const _left = left(M)
  return <A, S, R2, W2, FE2, B>(f: (a: A) => Kind<M, S, R2, W2, FE2, These<E, B>>) =>
    <R1, W1, FE1>(ma: Kind<M, S, R1, W1, FE1, These<E, A>>): Kind<M, S, R1 & R2, W1 | W2, FE1 | FE2, These<E, B>> => {
      return pipe(
        ma,
        M.flatMap(
          T.match<E, Kind<M, S, R2, W2, FE2, T.These<E, B>>, A>(_left, f, (e1, a) =>
            pipe(
              f(a),
              M.map(
                T.match(
                  (e2) => T.left(S.combine(e2)(e1)),
                  (b) => T.both(e1, b),
                  (e2, b) => T.both(S.combine(e2)(e1), b)
                )
              )
            )
          )
        )
      )
    }
}

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const mapBoth = <F extends HKT>(
  F: Functor<F>
): (<E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, W, FE>(self: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, B>>) => {
  return flow(T.mapBoth, F.map)
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft =
  <F extends HKT>(F: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, W, FE, A>(self: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, A>>) => {
    return F.map(T.mapError(f))
  }

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, W, FE>(ma: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, B | C | D> {
  return flow(T.match, F.map)
}

/**
 * @since 3.0.0
 */
export const matchE =
  <M extends HKT>(M: Flattenable<M>) =>
  <E, S, R2, W2, FE2, B, A, R3, W3, FE3, R4, W4, FE4, C = B, D = B>(
    onError: (e: E) => Kind<M, S, R2, W2, FE2, B>,
    onSuccess: (a: A) => Kind<M, S, R3, W3, FE3, C>,
    onBoth: (e: E, a: A) => Kind<M, S, R4, W4, FE4, D>
  ): (<R1, W1, FE1>(
    ma: Kind<M, S, R1, W1, FE1, These<E, A>>
  ) => Kind<M, S, R1 & R2 & R3 & R4, W1 | W2 | W3 | W4, FE1 | FE2 | FE3 | FE4, B | C | D>) => {
    return M.flatMap(
      T.match<E, Kind<M, S, R2 & R3 & R4, W2 | W3 | W4, FE2 | FE3 | FE4, B | C | D>, A>(onError, onSuccess, onBoth)
    )
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
  e: LazyArg<E>,
  a: LazyArg<A>
) => <S, R, W, FE>(fa: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, readonly [E, A]> {
  return flow(T.toTuple2, F.map)
}
