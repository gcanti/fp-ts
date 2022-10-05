/**
 * Lift a computation from the `Async` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { FromSync } from './FromSync'
import { pipe } from './Function'
import type { TypeLambda, Kind } from './HKT'
import type { Async } from './Async'
import * as task from './Async'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromTask<F extends TypeLambda> extends FromSync<F> {
  readonly fromTask: <A, S>(fa: Async<A>) => Kind<F, S, unknown, never, never, A>
}

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

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
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
export const liftAsync =
  <F extends TypeLambda>(F: FromTask<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Async<B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, never, B> =>
    F.fromTask(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTask = <M extends TypeLambda>(
  F: FromTask<M>,
  M: Flattenable<M>
): (<A, B>(f: (a: A) => Async<B>) => <S, R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>) => {
  return (f) => M.flatMap((a) => F.fromTask(f(a)))
}
