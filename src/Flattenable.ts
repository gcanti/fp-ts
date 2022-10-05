/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import type { KleisliComposable } from './KleisliComposable'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import type { Kind, TypeLambda } from './HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Flattenable<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft = <F extends TypeLambda>(Flattenable: Flattenable<F>) => {
  const tap_ = tap(Flattenable)
  return <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return tap_(() => that)
  }
}

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight = <F extends TypeLambda>(Flattenable: Flattenable<F>) => {
  return <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(self: Kind<F, S, R1, O1, E1, unknown>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return Flattenable.flatMap(() => that)
  }
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind =
  <M extends TypeLambda>(Flattenable: Flattenable<M>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<M, S, R1, O1, E1, A>
  ) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
    Flattenable.flatMap((a) =>
      pipe(
        f(a),
        Flattenable.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )

/**
 * @since 3.0.0
 */
export const ap =
  <F extends TypeLambda>(Flattenable: Flattenable<F>): Apply<F>['ap'] =>
  (fa) =>
  (fab) =>
    pipe(
      fab,
      Flattenable.flatMap((f) => pipe(fa, Flattenable.map(f)))
    )

/**
 * @since 3.0.0
 */
export const composeKleisli =
  <F extends TypeLambda>(Flattenable: Flattenable<F>): KleisliComposable<F>['composeKleisli'] =>
  (bc) =>
  (ab) =>
    flow(ab, Flattenable.flatMap(bc))

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap =
  <M extends TypeLambda>(Flattenable: Flattenable<M>) =>
  <A, S, R2, O2, E2>(
    f: (a: A) => Kind<M, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    Flattenable.flatMap((a) =>
      pipe(
        f(a),
        Flattenable.map(() => a)
      )
    )
