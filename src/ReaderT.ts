/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import type { Chain } from './Chain'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'
import type { NaturalTransformation } from './NaturalTransformation'
import type { Pointed } from './Pointed'
import type { Reader } from './Reader'

/**
 * @since 3.0.0
 */
export function of<F extends HKT>(F: Pointed<F>): <A, R, S, FR, E>(a: A) => Reader<R, Kind<F, S, FR, E, A>> {
  return (a) => () => F.of(a)
}

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R, S, FR, E>(fa: Reader<R, Kind<F, S, FR, E, A>>) => Reader<R, Kind<F, S, FR, E, B>> {
  return (f) => (fa) => flow(fa, F.map(f))
}

/**
 * @since 3.0.0
 */
export function ap<F extends HKT>(
  F: Apply<F>
): <R, S, FR, E, A>(
  fa: Reader<R, Kind<F, S, FR, E, A>>
) => <B>(fab: Reader<R, Kind<F, S, FR, E, (a: A) => B>>) => Reader<R, Kind<F, S, FR, E, B>> {
  return (fa) => (fab) => (r) => F.ap(fa(r))(fab(r))
}

/**
 * @since 3.0.0
 */
export function chain<M extends HKT>(
  M: Chain<M>
): <A, R, S, FR, E, B>(
  f: (a: A) => Reader<R, Kind<M, S, FR, E, B>>
) => (ma: Reader<R, Kind<M, S, FR, E, A>>) => Reader<R, Kind<M, S, FR, E, B>> {
  return (f) => (ma) => (r) =>
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
export function fromReader<F extends HKT>(
  F: Pointed<F>
): <R, A, S, FR, E>(ma: Reader<R, A>) => Reader<R, Kind<F, S, FR, E, A>> {
  return (ma) => flow(ma, F.of) as any // TODO
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function fromNaturalTransformation<F extends HKT, G extends HKT>(
  nt: NaturalTransformation<F, G>
): <R, S, FR, E, A>(f: (r: R) => Kind<F, S, FR, E, A>) => Reader<R, Kind<G, S, FR, E, A>> {
  return (f) => flow(f, nt)
}
