/**
 * Lift a computation from the `Async` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { FromSync } from './FromSync'
import { pipe } from '../Function'
import type { TypeLambda, Kind } from '../HKT'
import type { Async } from '../Async'
import * as async from '../Async'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromAsync<F extends TypeLambda> extends FromSync<F> {
  readonly fromAsync: <A, S>(fa: Async<A>) => Kind<F, S, unknown, never, never, A>
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep =
  <F extends TypeLambda>(FromAsync: FromAsync<F>) =>
  <S>(duration: number): Kind<F, S, unknown, never, never, void> =>
    FromAsync.fromAsync(async.sleep(duration))

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay = <F extends TypeLambda>(FromAsync: FromAsync<F>, Flattenable: Flattenable<F>) => {
  const sleepF = sleep(FromAsync)
  return (duration: number) =>
    <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>): Kind<F, S, R, O, E, A> =>
      pipe(
        sleepF<S>(duration),
        Flattenable.flatMap(() => self)
      )
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync =
  <F extends TypeLambda>(FromAsync: FromAsync<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Async<B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, never, B> =>
    FromAsync.fromAsync(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync = <F extends TypeLambda>(
  FromAsync: FromAsync<F>,
  Flattenable: Flattenable<F>
): (<A, B>(f: (a: A) => Async<B>) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) => {
  return (f) => Flattenable.flatMap((a) => FromAsync.fromAsync(f(a)))
}
