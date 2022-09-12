/**
 * Lift a computation from the `Task` monad.
 *
 * @since 3.0.0
 */
import { Chain, chainFirst } from './Chain'
import type { FromIO } from './FromIO'
import { flow } from './function'
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
  readonly fromTask: <A, S, R, W, E>(fa: Task<A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromTaskK<F extends HKT>(
  F: FromTask<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <S, R, W, E>(...a: A) => Kind<F, S, R, W, E, B> {
  // TODO
  return (f) => flow(f, F.fromTask) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainTaskK<M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B> {
  // TODO
  return (f) => M.chain(flow(f, F.fromTask)) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainFirstTaskK<M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A> {
  const chainFirstM = chainFirst(M)
  // TODO
  return (f) => chainFirstM(flow(f, F.fromTask)) as any
}
