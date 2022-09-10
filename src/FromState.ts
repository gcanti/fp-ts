/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import type { Chain } from './Chain'
import type { Endomorphism } from './Endomorphism'
import { flow } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import { NaturalTransformation } from './NaturalTransformation'
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
  readonly fromState: NaturalTransformation<S.StateF, F>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function get<F extends HKT>(F: FromState<F>): <S, R, E>() => Kind<F, S, R, E, S> {
  return () => F.fromState(S.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends HKT>(F: FromState<F>): <S, R, E>(s: S) => Kind<F, S, R, E, void> {
  return (s) => F.fromState(S.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function modify<F extends HKT>(F: FromState<F>): <S, R, E>(f: Endomorphism<S>) => Kind<F, S, R, E, void> {
  // TODO
  return flow(S.modify, F.fromState) as any
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function gets<F extends HKT>(F: FromState<F>): <S, A, R, E>(f: (s: S) => A) => Kind<F, S, R, E, A> {
  // TODO
  return flow(S.gets, F.fromState) as any
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromStateK<F extends HKT>(
  F: FromState<F>
): <A extends ReadonlyArray<unknown>, S, B>(f: (...a: A) => State<S, B>) => <R, E>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromState) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainStateK<M extends HKT>(
  F: FromState<M>,
  M: Chain<M>
): <A, S, B>(f: (a: A) => State<S, B>) => <R, E>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B> {
  // TODO
  return flow(fromStateK(F) as any, M.chain) as any
}
