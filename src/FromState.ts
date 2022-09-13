/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import type { Chain } from './Chain'
import type { Endomorphism } from './Endomorphism'
import type { HKT, Kind, Typeclass } from './HKT'
import * as S from './State'

import State = S.State

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState<F extends HKT> extends Typeclass<F> {
  readonly fromState: <S, A, R = unknown, W = never, E = never>(fa: State<S, A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function get<F extends HKT>(F: FromState<F>): <S, R, W, E>() => Kind<F, S, R, W, E, S> {
  return () => F.fromState(S.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends HKT>(F: FromState<F>): <S, R, W, E>(s: S) => Kind<F, S, R, W, E, void> {
  return (s) => F.fromState(S.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const modify = <F extends HKT>(F: FromState<F>) => <S, R, W, E>(f: Endomorphism<S>): Kind<F, S, R, W, E, void> =>
  F.fromState(S.modify(f))

/**
 * @category constructors
 * @since 3.0.0
 */
export const gets = <F extends HKT>(F: FromState<F>) => <S, A, R, W, E>(f: (s: S) => A): Kind<F, S, R, W, E, A> =>
  F.fromState(S.gets(f))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromStateK = <F extends HKT>(F: FromState<F>) => <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => <R, W, E>(...a: A): Kind<F, S, R, W, E, B> => F.fromState(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainStateK = <M extends HKT>(
  F: FromState<M>,
  M: Chain<M>
): (<A, S, B>(f: (a: A) => State<S, B>) => <R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>) => {
  return (f) => M.chain((a) => F.fromState(f(a)))
}
