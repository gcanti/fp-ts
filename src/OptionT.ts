/**
 * @since 3.0.0
 */
import * as apply from './Apply'
import type { Flat } from './Flat'
import type { Either } from './Either'
import type { Lazy } from './function'
import { constant, flow, pipe } from './function'
import * as functor from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import * as option from './Option'
import type { Pointed } from './Pointed'
import type { Option } from './Option'
import type { Functor } from './Functor'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const some =
  <F extends HKT>(F: Pointed<F>) =>
  <A, S, R, W, E>(a: A): Kind<F, S, R, W, E, Option<A>> =>
    F.of(_.some(a))

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export function fromF<F extends HKT>(
  F: Functor<F>
): <S, R, W, E, A>(ma: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, Option<A>> {
  return F.map(_.some)
}

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither =
  <F extends HKT>(F: Pointed<F>) =>
  <A, S, R, W, E>(e: Either<unknown, A>): Kind<F, S, R, W, E, Option<A>> =>
    F.of(option.fromEither(e))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <B, A, C = B>(
  onNone: () => B,
  onSome: (a: A) => C
) => <S, R, W, E>(ma: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, B | C> {
  return flow(option.match, F.map)
}

/**
 * @since 3.0.0
 */
export const matchE =
  <M extends HKT>(M: Flat<M>) =>
  <S, R2, W2, E2, B, A, R3, W3, E3, C = B>(
    onNone: () => Kind<M, S, R2, W2, E2, B>,
    onSome: (a: A) => Kind<M, S, R3, W3, E3, C>
  ): (<R1, W1, E1>(
    ma: Kind<M, S, R1, W1, E1, Option<A>>
  ) => Kind<M, S, R1 & R2 & R3, W1 | W2 | W3, E1 | E2 | E3, B | C>) => {
    return M.flatMap(option.match<Kind<M, S, R2 & R3, W2 | W3, E2 | E3, B | C>, A>(onNone, onSome))
  }

/**
 * @since 3.0.0
 */
export const getOrElse =
  <F extends HKT>(F: Functor<F>) =>
  <B>(onNone: Lazy<B>): (<S, R, W, E, A>(fa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A | B>) => {
    return F.map(option.getOrElse(onNone))
  }

/**
 * @since 3.0.0
 */
export const getOrElseE =
  <M extends HKT>(M: Monad<M>) =>
  <S, R2, W2, E2, B>(onNone: Lazy<Kind<M, S, R2, W2, E2, B>>) =>
  <R1, W1, E1, A>(ma: Kind<M, S, R1, W1, E1, Option<A>>): Kind<M, S, R1 & R2, W1 | W2, E1 | E2, A | B> => {
    return pipe(ma, M.flatMap(option.match<Kind<M, S, R2, W2, E2, A | B>, A>(onNone, M.of)))
  }

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, Option<B>> {
  return functor.map(F, option.Functor)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT>(
  F: apply.Apply<F>
): (<S, R2, W2, E2, A>(
  fa: Kind<F, S, R2, W2, E2, Option<A>>
) => <R1, W1, E1, B>(
  fab: Kind<F, S, R1, W1, E1, Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, Option<B>>) => {
  return apply.ap(F, option.Apply)
}

/**
 * @since 3.0.0
 */
export const flatMap =
  <M extends HKT>(M: Monad<M>) =>
  <A, S, R, W, E, B>(f: (a: A) => Kind<M, S, R, W, E, Option<B>>) =>
  (ma: Kind<M, S, R, W, E, Option<A>>): Kind<M, S, R, W, E, Option<B>> => {
    return pipe(ma, M.flatMap<option.Option<A>, S, R, W, E, option.Option<B>>(option.match(() => emptyK(M)(), f)))
  }

/**
 * @since 3.0.0
 */
export const combineK =
  <M extends HKT>(M: Monad<M>) =>
  <S, R2, W2, E2, B>(second: Lazy<Kind<M, S, R2, W2, E2, Option<B>>>) =>
  <R1, W1, E1, A>(first: Kind<M, S, R1, W1, E1, Option<A>>): Kind<M, S, R1 & R2, W1 | W2, E1 | E2, Option<A | B>> => {
    return pipe(first, M.flatMap(option.match<Kind<M, S, R2, W2, E2, option.Option<A | B>>, A | B>(second, some(M))))
  }

/**
 * @since 3.0.0
 */
export function emptyK<F extends HKT>(F: Pointed<F>): <S, R, W, E, A>() => Kind<F, S, R, W, E, Option<A>> {
  return constant(F.of(_.none))
}
