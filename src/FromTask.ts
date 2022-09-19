/**
 * Lift a computation from the `Task` monad.
 *
 * @since 3.0.0
 */
import * as ChainModule from './Chain'
import type { FromIO } from './FromIO'
import type { HKT, Kind } from './HKT'
import type { Task } from './Task'

import Chain = ChainModule.Chain

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
export const chainTaskK = <M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): (<A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>) => {
  return (f) => M.chain((a) => F.fromTask(f(a)))
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK = <M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): (<A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>) => {
  const chainFirstM = ChainModule.chainFirst(M)
  return (f) => chainFirstM((a) => F.fromTask(f(a)))
}
