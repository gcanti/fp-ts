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
  readonly flatMap: <A, S, R2, W2, E2, B>(
    f: (a: A) => Kind<M, S, R2, W2, E2, B>
  ) => <R1, W1, E1>(self: Kind<M, S, R1, W1, E1, A>) => Kind<M, S, R1 & R2, W1 | W2, E1 | E2, B>
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
  <A, S, R2, W2, E2, _>(
    f: (a: A) => Kind<M, S, R2, W2, E2, _>
  ): (<R1, W1, E1>(self: Kind<M, S, R1, W1, E1, A>) => Kind<M, S, R1 & R2, W1 | W2, E1 | E2, A>) =>
    M.flatMap((a) =>
      pipe(
        f(a),
        M.map(() => a)
      )
    )

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bind =
  <M extends TypeLambda>(M: Flattenable<M>) =>
  <N extends string, A, S, R2, W2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<M, S, R2, W2, E2, B>
  ): (<R1, W1, E1>(
    self: Kind<M, S, R1, W1, E1, A>
  ) => Kind<M, S, R1 & R2, W1 | W2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
    M.flatMap((a) =>
      pipe(
        f(a),
        M.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )
