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
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Semigroup, reverse } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
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
export function ap<F extends URIS4, G extends URIS4>(
  F: Apply4<F>,
  G: Apply4<G>
): <FS, FR, FE, GS, GR, GE, A>(
  fa: Kind4<F, FS, FR, FE, Kind4<G, GS, GR, GE, A>>
) => <B>(fab: Kind4<F, FS, FR, FE, Kind4<G, GS, GR, GE, (a: A) => B>>) => Kind4<F, FS, FR, FE, Kind4<G, GS, GR, GE, B>>
export function ap<F extends URIS4, G extends URIS3>(
  F: Apply4<F>,
  G: Apply3<G>
): <S, FR, FE, GR, GE, A>(
  fa: Kind4<F, S, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind4<F, S, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind4<F, S, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS4, G extends URIS3, GE>(
  F: Apply4<F>,
  G: Apply3C<G, GE>
): <S, FR, FE, GR, A>(
  fa: Kind4<F, S, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind4<F, S, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind4<F, S, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS4, G extends URIS2>(
  F: Apply4<F>,
  G: Apply2<G>
): <S, R, FE, GE, A>(
  fa: Kind4<F, S, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind4<F, S, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind4<F, S, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS4, G extends URIS2, GE>(
  F: Apply4<F>,
  G: Apply2C<G, GE>
): <S, R, FE, A>(
  fa: Kind4<F, S, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind4<F, S, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind4<F, S, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS4, G extends URIS>(
  F: Apply4<F>,
  G: Apply1<G>
): <S, R, E, A>(
  fa: Kind4<F, S, R, E, Kind<G, A>>
) => <B>(fab: Kind4<F, S, R, E, Kind<G, (a: A) => B>>) => Kind4<F, S, R, E, Kind<G, B>>
export function ap<F extends URIS3, FE, G extends URIS4>(
  F: Apply3C<F, FE>,
  G: Apply4<G>
): <FR, S, GR, GE, A>(
  fa: Kind3<F, FR, FE, Kind4<G, S, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind4<G, S, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind4<G, S, GR, GE, B>>
export function ap<F extends URIS3, FE, G extends URIS3>(
  F: Apply3C<F, FE>,
  G: Apply3<G>
): <FR, GR, GE, A>(
  fa: Kind3<F, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS3, FE, G extends URIS3, GE>(
  F: Apply3C<F, FE>,
  G: Apply3C<G, GE>
): <FR, GR, A>(
  fa: Kind3<F, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS3, FE, G extends URIS2>(
  F: Apply3C<F, FE>,
  G: Apply2<G>
): <R, GE, A>(
  fa: Kind3<F, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind3<F, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind3<F, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS3, FE, G extends URIS2, GE>(
  F: Apply3C<F, FE>,
  G: Apply2C<G, GE>
): <R, A>(
  fa: Kind3<F, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind3<F, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind3<F, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS3, E, G extends URIS>(
  F: Apply3C<F, E>,
  G: Apply1<G>
): <R, A>(
  fa: Kind3<F, R, E, Kind<G, A>>
) => <B>(fab: Kind3<F, R, E, Kind<G, (a: A) => B>>) => Kind3<F, R, E, Kind<G, B>>
export function ap<F extends URIS3, G extends URIS4>(
  F: Apply3<F>,
  G: Apply4<G>
): <FR, FE, S, GR, GE, A>(
  fa: Kind3<F, FR, FE, Kind4<G, S, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind4<G, S, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind4<G, S, GR, GE, B>>
export function ap<F extends URIS3, G extends URIS3>(
  F: Apply3<F>,
  G: Apply3<G>
): <FR, FE, GR, GE, A>(
  fa: Kind3<F, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS3, G extends URIS3, GE>(
  F: Apply3<F>,
  G: Apply3C<G, GE>
): <FR, FE, GR, A>(
  fa: Kind3<F, FR, FE, Kind3<G, GR, GE, A>>
) => <B>(fab: Kind3<F, FR, FE, Kind3<G, GR, GE, (a: A) => B>>) => Kind3<F, FR, FE, Kind3<G, GR, GE, B>>
export function ap<F extends URIS3, G extends URIS2>(
  F: Apply3<F>,
  G: Apply2<G>
): <R, FE, GE, A>(
  fa: Kind3<F, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind3<F, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind3<F, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS3, G extends URIS2, GE>(
  F: Apply3<F>,
  G: Apply2C<G, GE>
): <R, FE, A>(
  fa: Kind3<F, R, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind3<F, R, FE, Kind2<G, GE, (a: A) => B>>) => Kind3<F, R, FE, Kind2<G, GE, B>>
export function ap<F extends URIS3, G extends URIS>(
  F: Apply3<F>,
  G: Apply1<G>
): <R, E, A>(
  fa: Kind3<F, R, E, Kind<G, A>>
) => <B>(fab: Kind3<F, R, E, Kind<G, (a: A) => B>>) => Kind3<F, R, E, Kind<G, B>>
export function ap<F extends URIS2, FE, G extends URIS4>(
  F: Apply2C<F, FE>,
  G: Apply4<G>
): <S, R, GE, A>(
  fa: Kind2<F, FE, Kind4<G, S, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind4<G, S, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind4<G, S, R, GE, B>>
export function ap<F extends URIS2, FE, G extends URIS3>(
  F: Apply2C<F, FE>,
  G: Apply3<G>
): <R, GE, A>(
  fa: Kind2<F, FE, Kind3<G, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind3<G, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind3<G, R, GE, B>>
export function ap<F extends URIS2, FE, G extends URIS3, GE>(
  F: Apply2C<F, FE>,
  G: Apply3C<G, GE>
): <R, A>(
  fa: Kind2<F, FE, Kind3<G, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind3<G, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind3<G, R, GE, B>>
export function ap<F extends URIS2, FE, G extends URIS2>(
  F: Apply2C<F, FE>,
  G: Apply2<G>
): <GE, A>(
  fa: Kind2<F, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>) => Kind2<F, FE, Kind2<G, GE, B>>
export function ap<F extends URIS2, FE, G extends URIS2, GE>(
  F: Apply2C<F, FE>,
  G: Apply2C<G, GE>
): <A>(
  fa: Kind2<F, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>) => Kind2<F, FE, Kind2<G, GE, B>>
export function ap<F extends URIS2, E, G extends URIS>(
  F: Apply2C<F, E>,
  G: Apply1<G>
): <A>(fa: Kind2<F, E, Kind<G, A>>) => <B>(fab: Kind2<F, E, Kind<G, (a: A) => B>>) => Kind2<F, E, Kind<G, B>>
export function ap<F extends URIS2, G extends URIS4>(
  F: Apply2<F>,
  G: Apply4<G>
): <FE, S, R, GE, A>(
  fa: Kind2<F, FE, Kind4<G, S, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind4<G, S, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind4<G, S, R, GE, B>>
export function ap<F extends URIS2, G extends URIS3>(
  F: Apply2<F>,
  G: Apply3<G>
): <FE, R, GE, A>(
  fa: Kind2<F, FE, Kind3<G, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind3<G, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind3<G, R, GE, B>>
export function ap<F extends URIS2, G extends URIS3, GE>(
  F: Apply2<F>,
  G: Apply3C<G, GE>
): <FE, R, A>(
  fa: Kind2<F, FE, Kind3<G, R, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind3<G, R, GE, (a: A) => B>>) => Kind2<F, FE, Kind3<G, R, GE, B>>
export function ap<F extends URIS2, G extends URIS2>(
  F: Apply2<F>,
  G: Apply2<G>
): <FE, GE, A>(
  fa: Kind2<F, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>) => Kind2<F, FE, Kind2<G, GE, B>>
export function ap<F extends URIS2, G extends URIS2, GE>(
  F: Apply2<F>,
  G: Apply2C<G, GE>
): <FE, A>(
  fa: Kind2<F, FE, Kind2<G, GE, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>) => Kind2<F, FE, Kind2<G, GE, B>>
export function ap<F extends URIS2, G extends URIS>(
  F: Apply2<F>,
  G: Apply1<G>
): <E, A>(fa: Kind2<F, E, Kind<G, A>>) => <B>(fab: Kind2<F, E, Kind<G, (a: A) => B>>) => Kind2<F, E, Kind<G, B>>
export function ap<F extends URIS, G extends URIS4>(
  F: Apply1<F>,
  G: Apply4<G>
): <S, R, E, A>(
  fa: Kind<F, Kind4<G, S, R, E, A>>
) => <B>(fab: Kind<F, Kind4<G, S, R, E, (a: A) => B>>) => Kind<F, Kind4<G, S, R, E, B>>
export function ap<F extends URIS, G extends URIS3>(
  F: Apply1<F>,
  G: Apply3<G>
): <R, E, A>(
  fa: Kind<F, Kind3<G, R, E, A>>
) => <B>(fab: Kind<F, Kind3<G, R, E, (a: A) => B>>) => Kind<F, Kind3<G, R, E, B>>
export function ap<F extends URIS, G extends URIS3, E>(
  F: Apply1<F>,
  G: Apply3C<G, E>
): <R, A>(
  fa: Kind<F, Kind3<G, R, E, A>>
) => <B>(fab: Kind<F, Kind3<G, R, E, (a: A) => B>>) => Kind<F, Kind3<G, R, E, B>>
export function ap<F extends URIS, G extends URIS2>(
  F: Apply1<F>,
  G: Apply2<G>
): <E, A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export function ap<F extends URIS, G extends URIS2, E>(
  F: Apply1<F>,
  G: Apply2C<G, E>
): <A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export function ap<F extends URIS, G extends URIS>(
  F: Apply1<F>,
  G: Apply1<G>
): <A>(fa: Kind<F, Kind<G, A>>) => <B>(fab: Kind<F, Kind<G, (a: A) => B>>) => Kind<F, Kind<G, B>>
export function ap<F, G extends URIS4>(
  F: Apply<F>,
  G: Apply4<G>
): <S, R, E, A>(
  fa: HKT<F, Kind4<G, S, R, E, A>>
) => <B>(fab: HKT<F, Kind4<G, S, R, E, (a: A) => B>>) => HKT<F, Kind4<G, S, R, E, B>>
export function ap<F, G extends URIS3>(
  F: Apply<F>,
  G: Apply3<G>
): <R, E, A>(
  fa: HKT<F, Kind3<G, R, E, A>>
) => <B>(fab: HKT<F, Kind3<G, R, E, (a: A) => B>>) => HKT<F, Kind3<G, R, E, B>>
export function ap<F, G extends URIS3, E>(
  F: Apply<F>,
  G: Apply3C<G, E>
): <R, A>(fa: HKT<F, Kind3<G, R, E, A>>) => <B>(fab: HKT<F, Kind3<G, R, E, (a: A) => B>>) => HKT<F, Kind3<G, R, E, B>>
export function ap<F, G extends URIS2>(
  F: Apply<F>,
  G: Apply2<G>
): <E, A>(fa: HKT<F, Kind2<G, E, A>>) => <B>(fab: HKT<F, Kind2<G, E, (a: A) => B>>) => HKT<F, Kind2<G, E, B>>
export function ap<F, G extends URIS2, E>(
  F: Apply<F>,
  G: Apply2C<G, E>
): <A>(fa: HKT<F, Kind2<G, E, A>>) => <B>(fab: HKT<F, Kind2<G, E, (a: A) => B>>) => HKT<F, Kind2<G, E, B>>
export function ap<F, G extends URIS>(
  F: Apply<F>,
  G: Apply1<G>
): <A>(fa: HKT<F, Kind<G, A>>) => <B>(fab: HKT<F, Kind<G, (a: A) => B>>) => HKT<F, Kind<G, B>>
export function ap<F, G>(
  F: Apply<F>,
  G: Apply<G>
): <A>(fa: HKT<F, HKT<G, A>>) => <B>(fab: HKT<F, HKT<G, (a: A) => B>>) => HKT<F, HKT<G, B>>
export function ap<F, G>(
  F: Apply<F>,
  G: Apply<G>
): <A>(fa: HKT<F, HKT<G, A>>) => <B>(fab: HKT<F, HKT<G, (a: A) => B>>) => HKT<F, HKT<G, B>> {
  return <A>(fa: HKT<F, HKT<G, A>>): (<B>(fab: HKT<F, HKT<G, (a: A) => B>>) => HKT<F, HKT<G, B>>) =>
    flow(
      F.map((gab) => (ga: HKT<G, A>) => G.ap(ga)(gab)),
      F.ap(fa)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apFirst<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
export function apFirst<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export function apFirst<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export function apFirst<F extends URIS>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A>
export function apFirst<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, A>
export function apFirst<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, A> {
  return (second) =>
    flow(
      A.map((a) => () => a),
      A.ap(second)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apSecond<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export function apSecond<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function apSecond<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export function apSecond<F extends URIS>(A: Apply1<F>): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B>
export function apSecond<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, B>
export function apSecond<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, B> {
  return <B>(second: HKT<F, B>) =>
    flow(
      A.map(() => (b: B) => b),
      A.ap(second)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apS<F extends URIS4>(
  F: Apply4<F>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind4<F, S, R, E, B>
) => (fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends URIS3>(
  F: Apply3<F>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends URIS3, E>(
  F: Apply3C<F, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends URIS2>(
  F: Apply2<F>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends URIS2, E>(
  F: Apply2C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F extends URIS>(
  F: Apply1<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, B>
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F>(
  F: Apply<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: HKT<F, B>
) => (fa: HKT<F, A>) => HKT<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function apS<F>(
  F: Apply<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: HKT<F, B>
) => (fa: HKT<F, A>) => HKT<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return <B>(name: string, fb: HKT<F, B>) =>
    flow(
      F.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      F.ap(fb)
    )
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function apT<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, B>(
  fb: Kind4<F, S, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, readonly [...A, B]>
export function apT<F extends URIS3>(
  F: Apply3<F>
): <R, E, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export function apT<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export function apT<F extends URIS2>(
  F: Apply2<F>
): <E, B>(
  fb: Kind2<F, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export function apT<F extends URIS2, E>(
  F: Apply2C<F, E>
): <B>(fb: Kind2<F, E, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export function apT<F extends URIS>(
  F: Apply1<F>
): <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) => Kind<F, readonly [...A, B]>
export function apT<F>(
  F: Apply<F>
): <B>(fb: HKT<F, B>) => <A extends ReadonlyArray<unknown>>(fas: HKT<F, A>) => HKT<F, readonly [...A, B]>
export function apT<F>(
  F: Apply<F>
): <B>(fb: HKT<F, B>) => <A extends ReadonlyArray<unknown>>(fas: HKT<F, A>) => HKT<F, readonly [...A, B]> {
  return <B>(fb: HKT<F, B>) => <A extends ReadonlyArray<unknown>>(fas: HKT<F, A>) =>
    pipe(
      fas,
      F.map((a) => (b: B): readonly [...A, B] => [...a, b]),
      F.ap(fb)
    )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export function getApplySemigroup<F extends URIS4>(
  F: Apply4<F>
): <A, S, R, E>(S: Semigroup<A>) => Semigroup<Kind4<F, S, R, E, A>>
export function getApplySemigroup<F extends URIS3>(
  F: Apply3<F>
): <A, R, E>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export function getApplySemigroup<F extends URIS3, E>(
  F: Apply3C<F, E>
): <A, R>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export function getApplySemigroup<F extends URIS2>(F: Apply2<F>): <A, E>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export function getApplySemigroup<F extends URIS2, E>(
  F: Apply2C<F, E>
): <A>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export function getApplySemigroup<F extends URIS>(F: Apply1<F>): <A>(S: Semigroup<A>) => Semigroup<Kind<F, A>>
export function getApplySemigroup<F>(F: Apply<F>): <A>(S: Semigroup<A>) => Semigroup<HKT<F, A>>
export function getApplySemigroup<F>(F: Apply<F>): <A>(S: Semigroup<A>) => Semigroup<HKT<F, A>> {
  return <A>(S: Semigroup<A>) => {
    const f = reverse(S).concat
    return {
      concat: (second: HKT<F, A>) => (first: HKT<F, A>) => pipe(first, F.map(f), F.ap(second))
    }
  }
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// TODO: sequenceT
// TODO: sequenceS
