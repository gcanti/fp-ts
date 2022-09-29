/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import { pipe } from './function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Flattenable<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap =
  <F extends TypeLambda>(M: Flattenable<F>): Apply<F>['ap'] =>
  (fa) =>
  (fab) =>
    pipe(
      fab,
      M.flatMap((f) => pipe(fa, M.map(f)))
    )

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap =
  <M extends TypeLambda>(M: Flattenable<M>) =>
  <A, S, R2, O2, E2, _>(
    f: (a: A) => Kind<M, S, R2, O2, E2, _>
  ): (<R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    M.flatMap((a) =>
      pipe(
        f(a),
        M.map(() => a)
      )
    )

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft = <F extends TypeLambda>(Flattenable: Flattenable<F>) => {
  const tap_ = tap(Flattenable)
  return <S, R2, O2, E2, _>(
    that: Kind<F, S, R2, O2, E2, _>
  ): (<R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return tap_(() => that)
  }
}

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight = <F extends TypeLambda>(Flattenable: Flattenable<F>) => {
  return <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1, _>(self: Kind<F, S, R1, O1, E1, _>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return Flattenable.flatMap(() => that)
  }
}

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bind =
  <M extends TypeLambda>(M: Flattenable<M>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<M, S, R1, O1, E1, A>
  ) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
    M.flatMap((a) =>
      pipe(
        f(a),
        M.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const bindT =
  <F extends TypeLambda>(F: Flattenable<F>) =>
  <A extends ReadonlyArray<unknown>, S, R2, O2, E2, B>(f: (a: A) => Kind<F, S, R2, O2, E2, B>) =>
  <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
    pipe(
      self,
      F.flatMap((a) =>
        pipe(
          f(a),
          F.map((b) => [...a, b])
        )
      )
    )
