/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
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
 * @since 2.0.0
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { tuple } from './function'
import { Semigroup } from './Semigroup'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A, B>(fab: Kind2<F, E, (a: A) => B>, fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A, B>(fab: Kind2<F, E, (a: A) => B>, fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A, B>(fab: Kind3<F, R, E, (a: A) => B>, fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category model
 * @since 2.2.0
 */
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A, B>(fab: Kind3<F, R, E, (a: A) => B>, fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A, B>(fab: Kind4<F, S, R, E, (a: A) => B>, fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `ap` composition.
 *
 * @since 2.10.0
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
  return <A>(fa: HKT<F, HKT<G, A>>) =>
    <B>(fab: HKT<F, HKT<G, (a: A) => B>>): HKT<F, HKT<G, B>> =>
      F.ap(
        F.map(fab, (gab) => (ga: HKT<G, A>) => G.ap(gab, ga)),
        fa
      )
}

/**
 * @since 2.10.0
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
  return (second) => (first) =>
    A.ap(
      A.map(first, (a) => () => a),
      second
    )
}

/**
 * @since 2.10.0
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
    (first) =>
      A.ap(
        A.map(first, () => (b: B) => b),
        second
      )
}

/**
 * @since 2.10.0
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
    (fa) =>
      F.ap(
        F.map(fa, (a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
        fb
      )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.
 *
 * @since 2.10.0
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
  return <A>(S: Semigroup<A>) => ({
    concat: (first: HKT<F, A>, second: HKT<F, A>) =>
      F.ap(
        F.map(first, (x: A) => (y: A) => S.concat(x, y)),
        second
      )
  })
}

function curried(f: Function, n: number, acc: ReadonlyArray<unknown>) {
  return function (x: unknown) {
    const combined = Array(acc.length + 1)
    for (let i = 0; i < acc.length; i++) {
      combined[i] = acc[i]
    }
    combined[acc.length] = x
    return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined)
  }
}

const tupleConstructors: Record<number, (a: unknown) => any> = {
  1: (a) => [a],
  2: (a) => (b: any) => [a, b],
  3: (a) => (b: any) => (c: any) => [a, b, c],
  4: (a) => (b: any) => (c: any) => (d: any) => [a, b, c, d],
  5: (a) => (b: any) => (c: any) => (d: any) => (e: any) => [a, b, c, d, e]
}

function getTupleConstructor(len: number): (a: unknown) => any {
  if (!_.has.call(tupleConstructors, len)) {
    tupleConstructors[len] = curried(tuple, len - 1, [])
  }
  return tupleConstructors[len]
}

/**
 * Tuple sequencing, i.e., take a tuple of monadic actions and does them from left-to-right, returning the resulting tuple.
 *
 * @example
 * import { sequenceT } from 'fp-ts/Apply'
 * import * as O from 'fp-ts/Option'
 *
 * const sequenceTOption = sequenceT(O.Apply)
 * assert.deepStrictEqual(sequenceTOption(O.some(1)), O.some([1]))
 * assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('2')), O.some([1, '2']))
 * assert.deepStrictEqual(sequenceTOption(O.some(1), O.some('2'), O.none), O.none)
 *
 * @since 2.0.0
 */
export function sequenceT<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, T extends Array<Kind4<F, S, R, E, any>>>(
  ...t: T & { readonly 0: Kind4<F, S, R, E, any> }
) => Kind4<F, S, R, E, { [K in keyof T]: [T[K]] extends [Kind4<F, S, R, E, infer A>] ? A : never }>
export function sequenceT<F extends URIS3>(
  F: Apply3<F>
): <R, E, T extends Array<Kind3<F, R, E, any>>>(
  ...t: T & { readonly 0: Kind3<F, R, E, any> }
) => Kind3<F, R, E, { [K in keyof T]: [T[K]] extends [Kind3<F, R, E, infer A>] ? A : never }>
export function sequenceT<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, T extends Array<Kind3<F, R, E, any>>>(
  ...t: T & { readonly 0: Kind3<F, R, E, any> }
) => Kind3<F, R, E, { [K in keyof T]: [T[K]] extends [Kind3<F, R, E, infer A>] ? A : never }>
export function sequenceT<F extends URIS2>(
  F: Apply2<F>
): <E, T extends Array<Kind2<F, E, any>>>(
  ...t: T & { readonly 0: Kind2<F, E, any> }
) => Kind2<F, E, { [K in keyof T]: [T[K]] extends [Kind2<F, E, infer A>] ? A : never }>
export function sequenceT<F extends URIS2, E>(
  F: Apply2C<F, E>
): <T extends Array<Kind2<F, E, any>>>(
  ...t: T & { readonly 0: Kind2<F, E, any> }
) => Kind2<F, E, { [K in keyof T]: [T[K]] extends [Kind2<F, E, infer A>] ? A : never }>
export function sequenceT<F extends URIS>(
  F: Apply1<F>
): <T extends Array<Kind<F, any>>>(
  ...t: T & { readonly 0: Kind<F, any> }
) => Kind<F, { [K in keyof T]: [T[K]] extends [Kind<F, infer A>] ? A : never }>
export function sequenceT<F>(
  F: Apply<F>
): <T extends Array<HKT<F, any>>>(
  ...t: T & { readonly 0: HKT<F, any> }
) => HKT<F, { [K in keyof T]: [T[K]] extends [HKT<F, infer A>] ? A : never }>
export function sequenceT<F>(F: Apply<F>): any {
  return <A>(...args: Array<HKT<F, A>>) => {
    const len = args.length
    const f = getTupleConstructor(len)
    let fas = F.map(args[0], f)
    for (let i = 1; i < len; i++) {
      fas = F.ap(fas, args[i])
    }
    return fas
  }
}

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

function getRecordConstructor(keys: ReadonlyArray<string>) {
  const len = keys.length
  switch (len) {
    case 1:
      return (a: any) => ({ [keys[0]]: a })
    case 2:
      return (a: any) => (b: any) => ({ [keys[0]]: a, [keys[1]]: b })
    case 3:
      return (a: any) => (b: any) => (c: any) => ({ [keys[0]]: a, [keys[1]]: b, [keys[2]]: c })
    case 4:
      return (a: any) => (b: any) => (c: any) => (d: any) => ({
        [keys[0]]: a,
        [keys[1]]: b,
        [keys[2]]: c,
        [keys[3]]: d
      })
    case 5:
      return (a: any) => (b: any) => (c: any) => (d: any) => (e: any) => ({
        [keys[0]]: a,
        [keys[1]]: b,
        [keys[2]]: c,
        [keys[3]]: d,
        [keys[4]]: e
      })
    default:
      return curried(
        (...args: ReadonlyArray<unknown>) => {
          const r: Record<string, unknown> = {}
          for (let i = 0; i < len; i++) {
            r[keys[i]] = args[i]
          }
          return r
        },
        len - 1,
        []
      )
  }
}

/**
 * Like `Apply.sequenceT` but works with structs instead of tuples.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { sequenceS } from 'fp-ts/Apply'
 *
 * const ado = sequenceS(E.Apply)
 *
 * assert.deepStrictEqual(
 *   ado({
 *     a: E.right(1),
 *     b: E.right(true)
 *   }),
 *   E.right({ a: 1, b: true })
 * )
 * assert.deepStrictEqual(
 *   ado({
 *     a: E.right(1),
 *     b: E.left('error')
 *   }),
 *   E.left('error')
 * )
 *
 * @since 2.0.0
 */
export function sequenceS<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, NER extends Record<string, Kind4<F, S, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind4<F, S, R, E, any>>
) => Kind4<F, S, R, E, { [K in keyof NER]: [NER[K]] extends [Kind4<F, any, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS3>(
  F: Apply3<F>
): <R, E, NER extends Record<string, Kind3<F, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind3<F, R, E, any>>
) => Kind3<F, R, E, { [K in keyof NER]: [NER[K]] extends [Kind3<F, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, NER extends Record<string, Kind3<F, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind3<F, R, E, any>>
) => Kind3<F, R, E, { [K in keyof NER]: [NER[K]] extends [Kind3<F, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2>(
  F: Apply2<F>
): <E, NER extends Record<string, Kind2<F, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind2<F, E, any>>
) => Kind2<F, E, { [K in keyof NER]: [NER[K]] extends [Kind2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2, E>(
  F: Apply2C<F, E>
): <NER extends Record<string, Kind2<F, E, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => Kind2<F, E, { [K in keyof NER]: [NER[K]] extends [Kind2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS>(
  F: Apply1<F>
): <NER extends Record<string, Kind<F, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => Kind<F, { [K in keyof NER]: [NER[K]] extends [Kind<F, infer A>] ? A : never }>
export function sequenceS<F>(
  F: Apply<F>
): <NER extends Record<string, HKT<F, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => HKT<F, { [K in keyof NER]: [NER[K]] extends [HKT<F, infer A>] ? A : never }>
export function sequenceS<F>(F: Apply<F>): (r: Record<string, HKT<F, any>>) => HKT<F, Record<string, any>> {
  return (r) => {
    const keys = Object.keys(r)
    const len = keys.length
    const f = getRecordConstructor(keys)
    let fr = F.map(r[keys[0]], f)
    for (let i = 1; i < len; i++) {
      fr = F.ap(fr, r[keys[i]])
    }
    return fr
  }
}
