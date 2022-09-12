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
import type { ComposeF, HKT, Kind } from './HKT'
import { Semigroup, reverse } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply<F extends HKT> extends Functor<F> {
  readonly ap: <S, R, W, E, A>(
    fa: Kind<F, S, R, W, E, A>
  ) => <B>(fab: Kind<F, S, R, W, E, (a: A) => B>) => Kind<F, S, R, W, E, B>
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
export const ap = <F extends HKT, G extends HKT>(F: Apply<F>, G: Apply<G>): Apply<ComposeF<F, G>>['ap'] => {
  return <FS, FR, FW, FE, GS, GR, GW, GE, A>(
    fa: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ): (<B>(
    fab: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, (a: A) => B>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>) =>
    flow(
      F.map((gab) => (ga: Kind<G, GS, GR, GW, GE, A>) => G.ap(ga)(gab)),
      F.ap(fa)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const apFirst = <F extends HKT>(A: Apply<F>) => <S, R, W, E, B>(
  second: Kind<F, S, R, W, E, B>
): (<A>(first: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, A>) =>
  flow(
    A.map((a) => () => a),
    A.ap(second)
  )

/**
 * @category combinators
 * @since 3.0.0
 */
export const apSecond = <F extends HKT>(A: Apply<F>) => <S, R, W, E, B>(
  second: Kind<F, S, R, W, E, B>
): (<A>(first: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>) =>
  flow(
    A.map(() => (b: B) => b),
    A.ap(second)
  )

/**
 * @category combinators
 * @since 3.0.0
 */
export const apS = <F extends HKT>(F: Apply<F>) => <N extends string, A, S, R, W, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, S, R, W, E, B>
): ((
  fa: Kind<F, S, R, W, E, A>
) => Kind<F, S, R, W, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    F.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
    F.ap(fb)
  )

/**
 * @category combinators
 * @since 3.0.0
 */
export const apT = <F extends HKT>(F: Apply<F>) => <S, R, W, E, B>(fb: Kind<F, S, R, W, E, B>) => <
  A extends ReadonlyArray<unknown>
>(
  fas: Kind<F, S, R, W, E, A>
): Kind<F, S, R, W, E, readonly [...A, B]> =>
  pipe(
    fas,
    F.map((a) => (b: B): readonly [...A, B] => [...a, b]),
    F.ap(fb)
  )

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const getApplySemigroup = <F extends HKT>(F: Apply<F>) => <A, S, R, W, E>(
  S: Semigroup<A>
): Semigroup<Kind<F, S, R, W, E, A>> => {
  const f = reverse(S).concat
  return {
    concat: (second) => (first) => pipe(first, F.map(f), F.ap(second))
  }
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// TODO: sequenceT
// TODO: sequenceS
