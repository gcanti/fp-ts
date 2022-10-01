/**
 * Lift a computation from the `Task` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { FromIO } from './FromIO'
import { pipe } from './f'
import type { TypeLambda, Kind } from './HKT'
import type { Task } from './Task'
import * as task from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface FromTask<F extends TypeLambda> extends FromIO<F> {
  readonly fromTask: <A, S>(fa: Task<A>) => Kind<F, S, unknown, never, never, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep =
  <F extends TypeLambda>(F: FromTask<F>) =>
  <S>(duration: number): Kind<F, S, unknown, never, never, void> =>
    F.fromTask(task.sleep(duration))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @category combinators
 * @since 3.0.0
 */
export const delay = <F extends TypeLambda>(F: FromTask<F>, C: Flattenable<F>) => {
  const sleepF = sleep(F)
  return (duration: number) =>
    <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>): Kind<F, S, R, O, E, A> =>
      pipe(
        sleepF<S>(duration),
        C.flatMap(() => self)
      )
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTask =
  <F extends TypeLambda>(F: FromTask<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, never, B> =>
    F.fromTask(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTask = <M extends TypeLambda>(
  F: FromTask<M>,
  M: Flattenable<M>
): (<A, B>(f: (a: A) => Task<B>) => <S, R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>) => {
  return (f) => M.flatMap((a) => F.fromTask(f(a)))
}
