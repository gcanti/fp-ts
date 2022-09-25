/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `fbc |> map(bc => ab => a => bc(ab(a))) |> ap(fab) <-> fbc |> ap(fab |> ap(fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
 * const fa: O.Option<string> = O.some('s')
 * const fb: O.Option<number> = O.some(1)
 * const fc: O.Option<boolean> = O.some(true)
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     // lift a function
 *     O.some(f),
 *     // apply the first argument
 *     O.ap(fa),
 *     // apply the second argument
 *     O.ap(fb),
 *     // apply the third argument
 *     O.ap(fc)
 *   ),
 *   O.some('s1true')
 * )
 *
 * @since 3.0.0
 */
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as semigroup from './Semigroup'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply<λ extends TypeLambda> extends Functor<λ> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<λ, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(self: Kind<λ, S, R1, O1, E1, (a: A) => B>) => Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `ap` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getApComposition =
  <λ extends TypeLambda, μ extends TypeLambda>(Applyλ: Apply<λ>, Applyμ: Apply<μ>) =>
  <λS, λR2, λO2, λE2, μS, μR2, μO2, μE2, A>(
    fa: Kind<λ, λS, λR2, λO2, λE2, Kind<μ, μS, μR2, μO2, μE2, A>>
  ): (<λR1, λO1, λE1, μR1, μO1, μE1, B>(
    self: Kind<λ, λS, λR1, λO1, λE1, Kind<μ, μS, μR1, μO1, μE1, (a: A) => B>>
  ) => Kind<λ, λS, λR1 & λR2, λO1 | λO2, λE1 | λE2, Kind<μ, μS, μR1 & μR2, μO1 | μO2, μE1 | μE2, B>>) => {
    return flow(
      Applyλ.map((gab) => (ga: Kind<μ, μS, μR2, μO2, μE2, A>) => Applyμ.ap(ga)(gab)),
      Applyλ.ap(fa)
    )
  }

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar =
  <λ extends TypeLambda>(Applyλ: Apply<λ>) =>
  <S, R2, O2, E2, B>(
    second: Kind<λ, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A>(self: Kind<λ, S, R1, O1, E1, A>) => Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flow(
      Applyλ.map((a) => () => a),
      Applyλ.ap(second)
    )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar =
  <λ extends TypeLambda>(Applyλ: Apply<λ>) =>
  <S, R2, O2, E2, B>(
    second: Kind<λ, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A>(self: Kind<λ, S, R1, O1, E1, A>) => Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, B>) =>
    flow(
      Applyλ.map(() => (b: B) => b),
      Applyλ.ap(second)
    )

/**
 * @category combinators
 * @since 3.0.0
 */
export const bindPar =
  <λ extends TypeLambda>(Applyλ: Apply<λ>) =>
  <N extends string, A, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<λ, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<λ, S, R1, O1, E1, A>
  ) => Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
    flow(
      Applyλ.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      Applyλ.ap(fb)
    )

/**
 * @category combinators
 * @since 3.0.0
 */
export const apT =
  <λ extends TypeLambda>(Applyλ: Apply<λ>) =>
  <S, R2, O2, E2, B>(fb: Kind<λ, S, R2, O2, E2, B>) =>
  <R1, O1, E1, A extends ReadonlyArray<unknown>>(
    fas: Kind<λ, S, R1, O1, E1, A>
  ): Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
    pipe(
      fas,
      Applyλ.map((a) => (b: B): readonly [...A, B] => [...a, b]),
      Applyλ.ap(fb)
    )

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a semigroup into 'λ', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const getApplySemigroup =
  <λ extends TypeLambda>(Applyλ: Apply<λ>) =>
  <A, S, R, O, E>(S: Semigroup<A>): Semigroup<Kind<λ, S, R, O, E, A>> => {
    const f = semigroup.reverse(S).combine
    return {
      combine: (second) => (first) => pipe(first, Applyλ.map(f), Applyλ.ap(second))
    }
  }
