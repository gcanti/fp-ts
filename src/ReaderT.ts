/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import type { Chainable } from './Chainable'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'
import type { Pointed } from './Pointed'
import type { Reader } from './Reader'

/**
 * @since 3.0.0
 */
export function of<F extends HKT>(F: Pointed<F>): <A, R, S, FR, W, E>(a: A) => Reader<R, Kind<F, S, FR, W, E, A>> {
  return (a) => () => F.of(a)
}

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <R, S, FR, W, E>(fa: Reader<R, Kind<F, S, FR, W, E, A>>) => Reader<R, Kind<F, S, FR, W, E, B>> {
  return (f) => (fa) => flow(fa, F.map(f))
}

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT>(
  F: Apply<F>
): (<R2, S, FR2, W2, E2, A>(
  fa: Reader<R2, Kind<F, S, FR2, W2, E2, A>>
) => <R1, FR1, W1, E1, B>(
  fab: Reader<R1, Kind<F, S, FR1, W1, E1, (a: A) => B>>
) => Reader<R1 & R2, Kind<F, S, FR1 & FR2, W1 | W2, E1 | E2, B>>) => {
  return (fa) => (fab) => (r) => F.ap(fa(r))(fab(r))
}

/**
 * @since 3.0.0
 */
export const chain =
  <M extends HKT>(M: Chainable<M>) =>
  <A, R2, S, FR2, W2, E2, B>(f: (a: A) => Reader<R2, Kind<M, S, FR2, W2, E2, B>>) =>
  <R1, FR1, W1, E1>(
    ma: Reader<R1, Kind<M, S, FR1, W1, E1, A>>
  ): Reader<R1 & R2, Kind<M, S, FR1 & FR2, W1 | W2, E1 | E2, B>> => {
    return (r) =>
      pipe(
        ma(r),
        M.chain((a) => f(a)(r))
      )
  }

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader =
  <F extends HKT>(F: Pointed<F>) =>
  <R, A, S, FR = unknown, W = never, E = never>(ma: Reader<R, A>): Reader<R, Kind<F, S, FR, W, E, A>> => {
    return (r) => F.of(ma(r))
  }
