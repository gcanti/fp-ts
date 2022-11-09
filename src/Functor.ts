/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
import { pipe } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}

/**
 * @category model
 * @since 2.2.0
 */
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly map: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => B) => Kind4<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `map` composition.
 *
 * @since 2.10.0
 */
export function map<F extends URIS3, G extends URIS>(
  F: Functor3<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind<G, A>>) => Kind3<F, R, E, Kind<G, B>>
export function map<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <EF, EG>(fa: Kind2<F, EF, Kind2<G, EG, A>>) => Kind2<F, EF, Kind2<G, EG, B>>
export function map<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
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
  return (f) => (fa) => F.map(fa, (ga) => G.map(ga, f))
}

/**
 * @category mapping
 * @since 2.10.0
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
  return (a) => (fab) => F.map(fab, (f) => f(a))
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
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
): <N extends string>(name: N) => <A>(fa: Kind<F, A>) => Kind<F, { readonly [K in N]: A }>
export function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }>
export function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }> {
  return (name) => (fa) => F.map(fa, (a) => ({ [name]: a } as any))
}

/**
 * @since 2.13.0
 */
function let_<F extends URIS4>(
  F: Functor4<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  fa: Kind4<F, S, R, E, A>
) => Kind4<F, S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS3>(
  F: Functor3<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS2>(
  F: Functor2<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS>(
  F: Functor1<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F>(
  F: Functor<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: HKT<F, A>) => HKT<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F>(
  F: Functor<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: HKT<F, A>) => HKT<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return (name, f) => (fa) => F.map(fa, (a) => Object.assign({}, a, { [name]: f(a) }) as any)
}

export {
  /**
   * @since 2.13.0
   */
  let_ as let
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorCompositionHKT1<F, G extends URIS> {
  readonly map: <A, B>(fa: HKT<F, Kind<G, A>>, f: (a: A) => B) => HKT<F, Kind<G, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorCompositionHKT2<F, G extends URIS2> {
  readonly map: <E, A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorCompositionHKT2C<F, G extends URIS2, E> {
  readonly map: <A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Kind<F, Kind<G, A>>, f: (a: A) => B) => Kind<F, Kind<G, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <E, A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition12C<F extends URIS, G extends URIS2, E> {
  readonly map: <A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <E, A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly map: <A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <FE, GE, A, B>(fa: Kind2<F, FE, Kind2<G, GE, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, GE, B>>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly map: <FE, A, B>(fa: Kind2<F, FE, Kind2<G, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, E, B>>
}

/**
 * @category zone of death
 * @since 2.2.0
 * @deprecated
 */
export interface FunctorComposition23<F extends URIS2, G extends URIS3> {
  readonly map: <FE, R, E, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}

/**
 * @category zone of death
 * @since 2.2.0
 * @deprecated
 */
export interface FunctorComposition23C<F extends URIS2, G extends URIS3, E> {
  readonly map: <FE, R, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}

/**
 * Use [`map`](#map) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function getFunctorComposition<F extends URIS2, G extends URIS3, E>(
  F: Functor2<F>,
  G: Functor3C<G, E>
): FunctorComposition23C<F, G, E>
/** @deprecated */
export function getFunctorComposition<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Functor2C<G, E>
): FunctorComposition22C<F, G, E>
/** @deprecated */
export function getFunctorComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): FunctorComposition22<F, G>
/** @deprecated */
export function getFunctorComposition<F extends URIS2, G extends URIS, E>(
  F: Functor2C<F, E>,
  G: Functor1<G>
): FunctorComposition2C1<F, G, E>
/** @deprecated */
export function getFunctorComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): FunctorComposition21<F, G>
/** @deprecated */
export function getFunctorComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Functor2C<G, E>
): FunctorComposition12C<F, G, E>
/** @deprecated */
export function getFunctorComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): FunctorComposition12<F, G>
/** @deprecated */
export function getFunctorComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): FunctorComposition11<F, G>
/** @deprecated */
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
/** @deprecated */
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> {
  const _map = map(F, G)
  return {
    map: (fga, f) => pipe(fga, _map(f))
  }
}
