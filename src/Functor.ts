/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
 * constructor `F` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `map(identity) <-> identity`
 * 2. Composition: `map(flow(ab, bc)) <-> flow(map(ab), map(bc))`
 *
 * @since 3.0.0
 */
import { apply, flow } from './function'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { tuple } from './tuple'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor<F> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly map: <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function flap<F extends URIS4>(
  F: Functor4<F>
): <A>(a: A) => <S, R, E, B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
export function flap<F extends URIS3>(
  F: Functor3<F>
): <A>(a: A) => <R, E, B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
export function flap<F extends URIS2>(
  F: Functor2<F>
): <A>(a: A) => <E, B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
export function flap<F extends URIS>(F: Functor1<F>): <A>(a: A) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
export function flap<F>(F: Functor<F>): <A>(a: A) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
export function flap<F>(F: Functor<F>): <A>(a: A) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B> {
  return (a) => F.map(apply(a))
}

/**
 * `map` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function map<F extends URIS4, G extends URIS4>(
  F: Functor4<F>,
  G: Functor4<G>
): <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: Kind4<F, S, R, E, Kind4<G, S, R, E, A>>) => Kind4<F, S, R, E, Kind4<G, S, R, E, B>>
export function map<F extends URIS4, G extends URIS3>(
  F: Functor4<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Kind3<G, R, E, A>>) => Kind4<F, S, R, E, Kind3<G, R, E, B>>
export function map<F extends URIS4, G extends URIS2>(
  F: Functor4<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Kind2<G, E, A>>) => Kind4<F, S, R, E, Kind2<G, E, B>>
export function map<F extends URIS4, G extends URIS>(
  F: Functor4<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Kind<G, A>>) => Kind4<F, S, R, E, Kind<G, B>>
export function map<F extends URIS3, G extends URIS4>(
  F: Functor3<F>,
  G: Functor4<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind3<F, R, E, Kind4<G, S, R, E, A>>) => Kind3<F, R, E, Kind4<G, S, R, E, B>>
export function map<F extends URIS3, G extends URIS3>(
  F: Functor3<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind3<G, R, E, A>>) => Kind3<F, R, E, Kind3<G, R, E, B>>
export function map<F extends URIS3, G extends URIS2>(
  F: Functor3<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind2<G, E, A>>) => Kind3<F, R, E, Kind2<G, E, B>>
export function map<F extends URIS3, G extends URIS>(
  F: Functor3<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind<G, A>>) => Kind3<F, R, E, Kind<G, B>>
export function map<F extends URIS2, G extends URIS4>(
  F: Functor2<F>,
  G: Functor4<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind2<F, E, Kind4<G, S, R, E, A>>) => Kind2<F, E, Kind4<G, S, R, E, B>>
export function map<F extends URIS2, G extends URIS3>(
  F: Functor2<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind2<F, E, Kind3<G, R, E, A>>) => Kind2<F, E, Kind3<G, R, E, B>>
export function map<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Kind2<G, E, A>>) => Kind2<F, E, Kind2<G, E, B>>
export function map<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
export function map<F extends URIS, G extends URIS4>(
  F: Functor1<F>,
  G: Functor4<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, Kind4<G, S, R, E, A>>) => Kind<F, Kind4<G, S, R, E, B>>
export function map<F extends URIS, G extends URIS3>(
  F: Functor1<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind<F, Kind3<G, R, E, A>>) => Kind<F, Kind3<G, R, E, B>>
export function map<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
export function map<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export function map<F, G extends URIS2>(
  F: Functor<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
export function map<F, G extends URIS>(
  F: Functor<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, Kind<G, A>>) => HKT<F, Kind<G, B>>
export function map<F, G>(
  F: Functor<F>,
  G: Functor<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
export function map<F, G>(
  F: Functor<F>,
  G: Functor<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>> {
  return flow(G.map, F.map)
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function bindTo<F extends URIS4>(
  F: Functor4<F>
): <N extends string>(name: N) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { readonly [K in N]: A }>
export function bindTo<F extends URIS3>(
  F: Functor3<F>
): <N extends string>(name: N) => <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export function bindTo<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string>(name: N) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export function bindTo<F extends URIS2>(
  F: Functor2<F>
): <N extends string>(name: N) => <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export function bindTo<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string>(name: N) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export function bindTo<F extends URIS>(
  F: Functor1<F>
): <N extends string>(name: N) => <A>(fa: Kind<F, A>) => Kind<F, { [K in N]: A }>
export function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }>
export function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }> {
  return (name) => F.map((a) => ({ [name]: a } as any))
}

/**
 * @since 3.0.0
 */
export function tupled<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, readonly [A]>
export function tupled<F extends URIS3>(
  F: Functor3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [A]>
export function tupled<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [A]>
export function tupled<F extends URIS2>(F: Functor2<F>): <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, readonly [A]>
export function tupled<F extends URIS2, E>(F: Functor2C<F, E>): <A>(fa: Kind2<F, E, A>) => Kind2<F, E, readonly [A]>
export function tupled<F extends URIS>(F: Functor1<F>): <A>(fa: Kind<F, A>) => Kind<F, readonly [A]>
export function tupled<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, readonly [A]>
export function tupled<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, readonly [A]> {
  return F.map(tuple)
}
