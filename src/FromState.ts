/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
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
  readonly fromState: <S, A>(fa: State<S, A>) => Kind<F, S, unknown, never, never, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function get<F extends HKT>(F: FromState<F>): <S>() => Kind<F, S, unknown, never, never, S> {
  return () => F.fromState(state.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends HKT>(F: FromState<F>): <S>(s: S) => Kind<F, S, unknown, never, never, void> {
  return (s) => F.fromState(state.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const modify =
  <F extends HKT>(F: FromState<F>) =>
  <S>(f: Endomorphism<S>): Kind<F, S, unknown, never, never, void> =>
    F.fromState(state.modify(f))

/**
 * @category constructors
 * @since 3.0.0
 */
export const gets =
  <F extends HKT>(F: FromState<F>) =>
  <S, A>(f: (s: S) => A): Kind<F, S, unknown, never, never, A> =>
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
  (...a: A): Kind<F, S, unknown, never, never, B> =>
    F.fromState(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapStateK = <M extends HKT>(
  F: FromState<M>,
  M: Flattenable<M>
): (<A, S, B>(f: (a: A) => State<S, B>) => <R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>) => {
  return (f) => M.flatMap((a) => F.fromState(f(a)))
}
