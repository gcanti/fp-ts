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
 * @since 3.0.0
 */
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as semigroup from './Semigroup'
import type { Semigroup } from './Semigroup'

/**
 * @category model
 * @since 3.0.0
 */
export interface Apply<F extends TypeLambda> extends Functor<F> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<F, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * Returns a default `ap` composition.
 *
 * @since 3.0.0
 */
export const apComposition =
  <F extends TypeLambda, G extends TypeLambda>(ApplyF: Apply<F>, ApplyG: Apply<G>) =>
  <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(
    fa: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, A>>
  ): (<FR1, FO1, FE1, GR1, GO1, GE1, B>(
    self: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, (a: A) => B>>
  ) => Kind<F, FS, FR1 & FR2, FO1 | FO2, FE1 | FE2, Kind<G, GS, GR1 & GR2, GO1 | GO2, GE1 | GE2, B>>) => {
    return flow(
      ApplyF.map((gab) => (ga: Kind<G, GS, GR2, GO2, GE2, A>) => ApplyG.ap(ga)(gab)),
      ApplyF.ap(fa)
    )
  }

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipLeftPar =
  <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flow(
      F.map((a) => () => a),
      F.ap(that)
    )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipRightPar =
  <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(self: Kind<F, S, R1, O1, E1, unknown>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flow(
      F.map(() => (b: A) => b),
      F.ap(that)
    )

/**
 * A variant of `Flattenable.bind` that sequentially ignores the scope.
 *
 * @since 3.0.0
 */
export const bindRight =
  <F extends TypeLambda>(F: Apply<F>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
    flow(
      F.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      F.ap(fb)
    )

/**
 * Zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 3.0.0
 */
export const zipWith =
  <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2, B, A, C>(that: Kind<F, S, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
  <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
    pipe(
      self,
      F.map(
        (a) =>
          (b: B): C =>
            f(a, b)
      ),
      F.ap(that)
    )

/**
 * Zips this effect with the specified effect.
 *
 * @since 3.0.0
 */
export const zipFlatten = <F extends TypeLambda>(F: Apply<F>) => {
  const zipWith_ = zipWith(F)
  return <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A extends ReadonlyArray<unknown>>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]>) => zipWith_(that, (a, b) => [...a, b] as const)
}

/**
 * Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const getApplySemigroup =
  <F extends TypeLambda>(Apply: Apply<F>) =>
  <A, S, R, O, E>(Semigroup: Semigroup<A>): Semigroup<Kind<F, S, R, O, E, A>> => {
    const f = semigroup.reverse(Semigroup).combine
    return {
      combine: (that) => (self) => pipe(self, Apply.map(f), Apply.ap(that))
    }
  }

/**
 * Lifts a binary function into `F`.
 *
 * @since 3.0.0
 */
export const lift2 =
  <F extends TypeLambda>(F: Apply<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
  <S, R1, O1, E1, R2, O2, E2>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> => {
    const g = (a: A) => (b: B) => f(a, b)
    return pipe(fa, F.map(g), F.ap(fb))
  }

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 3.0.0
 */
export const lift3 =
  <F extends TypeLambda>(F: Apply<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
  <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>,
    fc: Kind<F, S, R3, O3, E3, C>
  ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> => {
    const g = (a: A) => (b: B) => (c: C) => f(a, b, c)
    return pipe(fa, F.map(g), F.ap(fb), F.ap(fc))
  }
