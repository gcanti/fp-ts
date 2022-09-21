/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import type { Chainable } from './Chainable'
import type { Endomorphism } from './Endomorphism'
import type { HKT, Kind, Typeclass } from './HKT'
import * as state from './State'
import type { State } from './State'

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
export function get<F extends HKT>(
  F: FromState<F>
): <S, R = unknown, W = never, E = never>() => Kind<F, S, R, W, E, S> {
  return () => F.fromState(state.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends HKT>(
  F: FromState<F>
): <S, R = unknown, W = never, E = never>(s: S) => Kind<F, S, R, W, E, void> {
  return (s) => F.fromState(state.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const modify =
  <F extends HKT>(F: FromState<F>) =>
  <S, R = unknown, W = never, E = never>(f: Endomorphism<S>): Kind<F, S, R, W, E, void> =>
    F.fromState(state.modify(f))

/**
 * @category constructors
 * @since 3.0.0
 */
export const gets =
  <F extends HKT>(F: FromState<F>) =>
  <S, A, R = unknown, W = never, E = never>(f: (s: S) => A): Kind<F, S, R, W, E, A> =>
    F.fromState(state.gets(f))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromStateK =
  <F extends HKT>(F: FromState<F>) =>
  <A extends ReadonlyArray<unknown>, S, B>(f: (...a: A) => State<S, B>) =>
  <R = unknown, W = never, E = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromState(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainStateK = <M extends HKT>(
  F: FromState<M>,
  M: Chainable<M>
): (<A, S, B>(f: (a: A) => State<S, B>) => <R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>) => {
  return (f) => M.chain((a) => F.fromState(f(a)))
}
