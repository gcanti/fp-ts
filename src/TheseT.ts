/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import { getApComposition as ap_ } from './Apply'
import type { Flattenable } from './Flattenable'
import type { LazyArg } from './Function'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import { getMapComposition as map_ } from './Functor'
import type { TypeLambda, Kind } from './HKT'
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
  <F extends TypeLambda>(F: Pointed<F>) =>
  <A, S>(a: A): Kind<F, S, unknown, never, never, These<never, A>> =>
    F.of(T.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends TypeLambda>(F: Pointed<F>) =>
  <E, S>(e: E): Kind<F, S, unknown, never, never, These<E, never>> =>
    F.of(T.left(e))

/**
 * @since 3.0.0
 */
export const both =
  <F extends TypeLambda>(F: Pointed<F>) =>
  <E, A, S>(e: E, a: A): Kind<F, S, unknown, never, never, These<E, A>> =>
    F.of(T.both(e, a))

/**
 * @since 3.0.0
 */
export function rightKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, These<never, A>> {
  return F.map(T.right)
}

/**
 * @since 3.0.0
 */
export function leftKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, L>(fl: Kind<F, S, R, O, E, L>) => Kind<F, S, R, O, E, These<L, never>> {
  return F.map(T.left)
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<E, B>> {
  return map_(F, T.Functor)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda, E>(
  F: Apply<F>,
  S: Semigroup<E>
): (<S, R2, O2, FE2, A>(
  fa: Kind<F, S, R2, O2, FE2, These<E, A>>
) => <R1, O1, FE1, B>(
  self: Kind<F, S, R1, O1, FE1, These<E, (a: A) => B>>
) => Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, These<E, B>>) => {
  return ap_(F, T.getApply(S))
}

/**
 * @since 3.0.0
 */
export const flatMap = <M extends TypeLambda, E>(M: Monad<M>, S: Semigroup<E>) => {
  const _left = left(M)
  return <A, S, R2, O2, FE2, B>(f: (a: A) => Kind<M, S, R2, O2, FE2, These<E, B>>) =>
    <R1, O1, FE1>(self: Kind<M, S, R1, O1, FE1, These<E, A>>): Kind<M, S, R1 & R2, O1 | O2, FE1 | FE2, These<E, B>> => {
      return pipe(
        self,
        M.flatMap(
          T.match<E, Kind<M, S, R2, O2, FE2, T.These<E, B>>, A>(_left, f, (e1, a) =>
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
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth = <F extends TypeLambda>(
  F: Functor<F>
): (<E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<G, B>>) => {
  return flow(T.mapBoth, F.map)
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft =
  <F extends TypeLambda>(F: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, O, FE, A>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<G, A>>) => {
    return F.map(T.mapError(f))
  }

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends TypeLambda>(
  F: Functor<F>
): <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, B | C | D> {
  return flow(T.match, F.map)
}

/**
 * @since 3.0.0
 */
export const matchKind =
  <M extends TypeLambda>(M: Flattenable<M>) =>
  <E, S, R2, O2, FE2, B, A, R3, W3, FE3, R4, W4, FE4, C = B, D = B>(
    onError: (e: E) => Kind<M, S, R2, O2, FE2, B>,
    onSuccess: (a: A) => Kind<M, S, R3, W3, FE3, C>,
    onBoth: (e: E, a: A) => Kind<M, S, R4, W4, FE4, D>
  ): (<R1, O1, FE1>(
    self: Kind<M, S, R1, O1, FE1, These<E, A>>
  ) => Kind<M, S, R1 & R2 & R3 & R4, O1 | O2 | W3 | W4, FE1 | FE2 | FE3 | FE4, B | C | D>) => {
    return M.flatMap(
      T.match<E, Kind<M, S, R2 & R3 & R4, O2 | W3 | W4, FE2 | FE3 | FE4, B | C | D>, A>(onError, onSuccess, onBoth)
    )
  }

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<A, E>> {
  return F.map(T.swap)
}

/**
 * @since 3.0.0
 */
export function toTuple2<F extends TypeLambda>(
  F: Functor<F>
): <E, A>(
  e: LazyArg<E>,
  a: LazyArg<A>
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, readonly [E, A]> {
  return flow(T.toTuple2, F.map)
}
