/**
 * Lift a computation from the `IO` monad.
 *
 * @since 3.0.0
 */
import { Chain, chainFirst } from './Chain'
import { flow } from './function'
import { HKT, Kind, Typeclass } from './HKT'
import type { IO } from './IO'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO<F extends HKT> extends Typeclass<F> {
  readonly fromIO: <A, S, R, E>(fa: IO<A>) => Kind<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromIOK<F extends HKT>(
  F: FromIO<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <S, R, E>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromIO) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainIOK<M extends HKT>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B> {
  // TODO
  return (f) => M.chain(flow(f, F.fromIO)) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainFirstIOK<M extends HKT>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A> {
  const chainFirstM = chainFirst(M)
  // TODO
  return (f) => chainFirstM(flow(f, F.fromIO)) as any
}
