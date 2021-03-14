/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import { Endomorphism } from './Endomorphism'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import * as S from './State'

import State = S.State

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState<F> {
  readonly URI?: F
  readonly fromState: <S, A>(fa: State<S, A>) => HKT2<F, S, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState2<F extends URIS2> {
  readonly URI?: F
  readonly fromState: <S, A>(fa: State<S, A>) => Kind2<F, S, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState3<F extends URIS3> {
  readonly URI?: F
  readonly fromState: <S, A, E>(fa: State<S, A>) => Kind3<F, S, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromState: <S, A>(fa: State<S, A>) => Kind3<F, S, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState4<F extends URIS4> {
  readonly URI?: F
  readonly fromState: <S, A, R, E>(fa: State<S, A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function get<F extends URIS4>(F: FromState4<F>): <S, R, E>() => Kind4<F, S, R, E, S>
export function get<F extends URIS3>(F: FromState3<F>): <S, E>() => Kind3<F, S, E, S>
export function get<F extends URIS3, E>(F: FromState3C<F, E>): <S>() => Kind3<F, S, E, S>
export function get<F extends URIS2>(F: FromState2<F>): <S>() => Kind2<F, S, S>
export function get<F>(F: FromState<F>): <S>() => HKT2<F, S, S>
export function get<F>(F: FromState<F>): <S>() => HKT2<F, S, S> {
  return () => F.fromState(S.get())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function put<F extends URIS4>(F: FromState4<F>): <S, R, E>(s: S) => Kind4<F, S, R, E, void>
export function put<F extends URIS3>(F: FromState3<F>): <S, E>(s: S) => Kind3<F, S, E, void>
export function put<F extends URIS3, E>(F: FromState3C<F, E>): <S>(s: S) => Kind3<F, S, E, void>
export function put<F extends URIS2>(F: FromState2<F>): <S>(s: S) => Kind2<F, S, void>
export function put<F>(F: FromState<F>): <S>(s: S) => HKT2<F, S, void>
export function put<F>(F: FromState<F>): <S>(s: S) => HKT2<F, S, void> {
  return (s) => F.fromState(S.put(s))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function modify<F extends URIS4>(F: FromState4<F>): <S, R, E>(f: Endomorphism<S>) => Kind4<F, S, R, E, void>
export function modify<F extends URIS3>(F: FromState3<F>): <S, E>(f: Endomorphism<S>) => Kind3<F, S, E, void>
export function modify<F extends URIS3, E>(F: FromState3C<F, E>): <S>(f: Endomorphism<S>) => Kind3<F, S, E, void>
export function modify<F extends URIS2>(F: FromState2<F>): <S>(f: Endomorphism<S>) => Kind2<F, S, void>
export function modify<F>(F: FromState<F>): <S>(f: Endomorphism<S>) => HKT2<F, S, void>
export function modify<F>(F: FromState<F>): <S>(f: Endomorphism<S>) => HKT2<F, S, void> {
  return (f) => F.fromState(S.modify(f))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function gets<F extends URIS4>(F: FromState4<F>): <S, R, E, A>(f: (s: S) => A) => Kind4<F, S, R, E, A>
export function gets<F extends URIS3>(F: FromState3<F>): <S, E, A>(f: (s: S) => A) => Kind3<F, S, E, A>
export function gets<F extends URIS3, E>(F: FromState3C<F, E>): <S, A>(f: (s: S) => A) => Kind3<F, S, E, A>
export function gets<F extends URIS2>(F: FromState2<F>): <S, A>(f: (s: S) => A) => Kind2<F, S, A>
export function gets<F>(F: FromState<F>): <S, A>(f: (s: S) => A) => HKT2<F, S, A>
export function gets<F>(F: FromState<F>): <S, A>(f: (s: S) => A) => HKT2<F, S, A> {
  return (f) => F.fromState(S.gets(f))
}
