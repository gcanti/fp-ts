/**
 * @since 3.0.0
 */
import { Apply, Apply1, ap_ as ap__ } from './Apply'
import { Either } from './Either'
import { flow, Lazy, Predicate, Refinement } from './function'
import { Functor, Functor1, map_ as map__ } from './Functor'
import { HKT, Kind, URIS } from './HKT'
import { Monad, Monad1 } from './Monad'
import * as O from './Option'
import { Pointed, Pointed1 } from './Pointed'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function some_<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
export function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>> {
  return flow(O.some, F.of)
}

/**
 * @since 3.0.0
 */
export function none_<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export function none_<F>(F: Pointed<F>): HKT<F, Option<never>>
export function none_<F>(F: Pointed<F>): HKT<F, Option<never>> {
  return F.of(O.none)
}

/**
 * @since 3.0.0
 */
export function fromF_<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
export function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>> {
  return F.map(O.some)
}

/**
 * @since 3.0.0
 */
export function fromNullable_<F extends URIS>(F: Pointed1<F>): <A>(fa: Kind<F, A>) => Kind<F, Option<NonNullable<A>>>
export function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>>
export function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>> {
  return F.map(O.fromNullable)
}

/**
 * @since 3.0.0
 */
export function fromPredicate_<F extends URIS>(
  F: Pointed1<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind<F, Option<A>>
}
export function fromPredicate_<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
}
export function fromPredicate_<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
} {
  return <A>(predicate: Predicate<A>) => (a: A) => F.of(O.fromPredicate(predicate)(a))
}

/**
 * @since 3.0.0
 */
export function fromEither_<F extends URIS>(F: Pointed1<F>): <E, A>(e: Either<E, A>) => Kind<F, Option<A>>
export function fromEither_<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>>
export function fromEither_<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>> {
  return flow(O.fromEither, F.of)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function fold_<M extends URIS>(
  M: Monad1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function fold_<M>(
  M: Monad<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B>
export function fold_<M>(
  M: Monad<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B> {
  return (onNone, onSome) => M.chain(O.fold(onNone, onSome))
}

/**
 * @since 3.0.0
 */
export function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
export function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A> {
  return (onNone) => M.chain(O.fold(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>> {
  return map__(F, O.Functor)
}

/**
 * @since 3.0.0
 */
export function ap_<F extends URIS>(
  F: Apply1<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export function ap_<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>>
export function ap_<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>> {
  return ap__(F, O.Apply)
}

/**
 * @since 3.0.0
 */
export function chain_<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain_<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chain_<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const none = none_(M)
  return (f) => M.chain(O.fold(() => none, f))
}

/**
 * @since 3.0.0
 */
export function alt_<M extends URIS>(
  M: Monad1<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export function alt_<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>>
export function alt_<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>> {
  const some = some_(M)
  return (second) => M.chain(O.fold(second, some))
}
