/**
 * Lift a computation from the `Task` monad.
 *
 * @since 3.0.0
 */
import * as flat from './Flat'
import type { Flat } from './Flat'
import type { FromIO } from './FromIO'
import type { HKT, Kind } from './HKT'
import type { Task } from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromTask<F extends HKT> extends FromIO<F> {
  readonly fromTask: <A, S, R = unknown, W = never, E = never>(fa: Task<A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK =
  <F extends HKT>(F: FromTask<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) =>
  <S, R = unknown, W = never, E = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromTask(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskK = <M extends HKT>(
  F: FromTask<M>,
  M: Flat<M>
): (<A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>) => {
  return (f) => M.flatMap((a) => F.fromTask(f(a)))
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const tapTaskK = <M extends HKT>(
  F: FromTask<M>,
  M: Flat<M>
): (<A, _>(f: (a: A) => Task<_>) => <S, R, W, E>(self: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>) => {
  const tapM = flat.tap(M)
  return (f) => tapM((a) => F.fromTask(f(a)))
}
