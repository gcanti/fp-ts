/**
 * Lift a computation from the `Async` monad.
 *
 * @since 3.0.0
 */
import type { Async } from '@fp-ts/core/Async'
import * as async from '@fp-ts/core/Async'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { FromSync } from '@fp-ts/core/FromSync'
import { pipe } from '@fp-ts/core/Function'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'

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
export const sleep = <F extends TypeLambda>(FromAsync: FromAsync<F>) =>
  <S>(duration: number): Kind<F, S, unknown, never, never, void> => FromAsync.fromAsync(async.sleep(duration))

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
export const liftAsync = <F extends TypeLambda>(FromAsync: FromAsync<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Async<B>) =>
    <S>(...a: A): Kind<F, S, unknown, never, never, B> => FromAsync.fromAsync(f(...a))

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
