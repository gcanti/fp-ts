/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import type { State } from '@fp-ts/core/State'
import * as state from '@fp-ts/core/State'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromState<F extends TypeLambda> extends TypeClass<F> {
  readonly fromState: <S, A>(fa: State<S, A>) => Kind<F, S, unknown, never, never, A>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function get<F extends TypeLambda>(F: FromState<F>): <S>() => Kind<F, S, unknown, never, never, S> {
  return () => F.fromState(state.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends TypeLambda>(F: FromState<F>): <S>(s: S) => Kind<F, S, unknown, never, never, void> {
  return (s) => F.fromState(state.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const modify = <F extends TypeLambda>(F: FromState<F>) =>
  <S>(f: Endomorphism<S>): Kind<F, S, unknown, never, never, void> => F.fromState(state.modify(f))

/**
 * @category constructors
 * @since 3.0.0
 */
export const gets = <F extends TypeLambda>(F: FromState<F>) =>
  <S, A>(f: (s: S) => A): Kind<F, S, unknown, never, never, A> => F.fromState(state.gets(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftState = <F extends TypeLambda>(F: FromState<F>) =>
  <A extends ReadonlyArray<unknown>, S, B>(f: (...a: A) => State<S, B>) =>
    (...a: A): Kind<F, S, unknown, never, never, B> => F.fromState(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapState = <M extends TypeLambda>(
  F: FromState<M>,
  M: Flattenable<M>
): (<A, S, B>(f: (a: A) => State<S, B>) => <R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>) => {
  return (f) => M.flatMap((a) => F.fromState(f(a)))
}
