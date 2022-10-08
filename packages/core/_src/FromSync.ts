/**
 * Lift a computation from the `Sync` effect.
 *
 * @since 3.0.0
 */
import * as console from '@fp-ts/core/Console'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import { pipe } from '@fp-ts/core/Function'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import type { Sync } from '@fp-ts/core/Sync'
/**
 * @category model
 * @since 3.0.0
 */
export interface FromSync<F extends TypeLambda> extends TypeClass<F> {
  readonly fromSync: <A, S>(fa: Sync<A>) => Kind<F, S, unknown, never, never, A>
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync = <F extends TypeLambda>(FromSync: FromSync<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) =>
    <S>(...a: A): Kind<F, S, unknown, never, never, B> => FromSync.fromSync(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync = <M extends TypeLambda>(FromSync: FromSync<M>, M: Flattenable<M>) =>
  <A, B>(f: (a: A) => Sync<B>) =>
    <S, R, O, E>(self: Kind<M, S, R, O, E, A>): Kind<M, S, R, O, E, B> => {
      return pipe(
        self,
        M.flatMap<A, S, R, O, E, B>((a) => FromSync.fromSync(f(a)))
      )
    }

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log = <M extends TypeLambda>(FromSync: FromSync<M>) =>
  <A extends ReadonlyArray<unknown>, S>(...x: A): Kind<M, S, unknown, never, never, void> =>
    FromSync.fromSync(console.log(...x))

/**
 * @category logging
 * @since 3.0.0
 */
export const logError = <M extends TypeLambda>(FromSync: FromSync<M>) =>
  <A extends ReadonlyArray<unknown>, S>(...x: A): Kind<M, S, unknown, never, never, void> =>
    FromSync.fromSync(console.error(...x))
