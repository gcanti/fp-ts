/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
 * constructor `F` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(identity) <-> identity`
 * 2. Composition: `F.map(flow(ab, bc)) <-> flow(F.map(ab), F.map(bc))`
 *
 * @since 3.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

/**
 * @since 3.0.0
 */
export function bindTo_<F extends URIS4>(
  F: Functor4<F>
): <N extends string>(name: N) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { [K in N]: A }>
export function bindTo_<F extends URIS3>(
  F: Functor3<F>
): <N extends string>(name: N) => <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { [K in N]: A }>
export function bindTo_<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string>(name: N) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { [K in N]: A }>
export function bindTo_<F extends URIS2>(
  F: Functor2<F>
): <N extends string>(name: N) => <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, { [K in N]: A }>
export function bindTo_<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string>(name: N) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, { [K in N]: A }>
export function bindTo_<F extends URIS>(
  F: Functor1<F>
): <N extends string>(name: N) => <A>(fa: Kind<F, A>) => Kind<F, { [K in N]: A }>
export function bindTo_<F>(F: Functor<F>): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { [K in N]: A }>
export function bindTo_<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { [K in N]: A }> {
  return (name) => F.map((a) => ({ [name]: a } as any))
}
