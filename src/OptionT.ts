/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1
} from './Applicative'
import { Apply, Apply1, ap_ as ap__ } from './Apply'
import { Either } from './Either'
import { flow, Lazy, pipe, Predicate, Refinement } from './function'
import { Functor, Functor1, map_ as map__ } from './Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C } from './Monad'
import * as O from './Option'
import { Pointed, Pointed1 } from './Pointed'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function some_<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
export function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>> {
  return flow(O.some, F.of)
}

/**
 * @since 2.10.0
 */
export function none_<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export function none_<F>(F: Pointed<F>): HKT<F, Option<never>>
export function none_<F>(F: Pointed<F>): HKT<F, Option<never>> {
  return F.of(O.none)
}

/**
 * @since 2.10.0
 */
export function fromF_<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
export function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>> {
  return (ma) => F.map(ma, O.some)
}

/**
 * @since 2.10.0
 */
export function fromNullable_<F extends URIS>(F: Pointed1<F>): <A>(fa: Kind<F, A>) => Kind<F, Option<NonNullable<A>>>
export function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>>
export function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>> {
  return (fa) => F.map(fa, O.fromNullable)
}

/**
 * @since 2.10.0
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
 * @since 2.10.0
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
 * @since 2.10.0
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
  return (onNone, onSome) => (ma) => M.chain(ma, O.fold(onNone, onSome))
}

/**
 * @since 2.10.0
 */
export function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
export function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A> {
  return (onNone) => (fa) => M.chain(fa, O.fold(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
export function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>> {
  return map__(F, O.Functor)
}

/**
 * @since 2.10.0
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
 * @since 2.10.0
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
  return (f) => (ma) =>
    M.chain(
      ma,
      O.fold(() => none, f)
    )
}

/**
 * @since 2.10.0
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
  return (second) => (first) => M.chain(first, O.fold(second, some))
}

// -------------------------------------------------------------------------------------
// unused
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fa: OptionT<M, A>, that: Lazy<OptionT<M, A>>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, R>>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, A>>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fa: OptionT1<M, A>, that: Lazy<OptionT1<M, A>>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, R>>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, A>>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: deprecation
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, O.URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.2.0
 */
// tslint:disable-next-line: deprecation
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, O.URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}

/**
 * @since 2.0.0
 */
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const map = map_(M)
  const ap = ap_(M)
  const of = some_(M)
  const none = M.of(O.none)

  return {
    map: (fa, f) => pipe(fa, map(f)),
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of,
    chain: (ma, f) =>
      M.chain(
        ma,
        O.fold(() => none, f)
      ),
    alt: (fa, that) =>
      M.chain(
        fa,
        O.fold(that, (a) => M.of(O.some(a)))
      ),
    fold: (ma, onNone, onSome) => M.chain(ma, O.fold(onNone, onSome)),
    getOrElse: (ma, onNone) => M.chain(ma, O.fold(onNone, M.of)),
    fromM: (ma) => M.map(ma, O.some),
    none: () => none
  }
}
