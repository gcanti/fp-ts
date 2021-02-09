/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1
} from './Applicative'
import { ap as ap_, Apply, Apply1 } from './Apply'
import { Either } from './Either'
import { flow, Lazy, pipe, Predicate, Refinement } from './function'
import { Functor, Functor1, map as map_ } from './Functor'
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
export function some<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>> {
  return flow(O.some, F.of)
}

/**
 * @since 2.10.0
 */
export function none<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export function none<F>(F: Pointed<F>): HKT<F, Option<never>>
export function none<F>(F: Pointed<F>): HKT<F, Option<never>> {
  return F.of(O.none)
}

/**
 * @since 2.10.0
 */
export function fromF<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>> {
  return (ma) => F.map(ma, O.some)
}

/**
 * @since 2.10.0
 */
export function fromNullable<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>> {
  return flow(O.fromNullable, F.of)
}

/**
 * @since 2.10.0
 */
export function fromNullableK<F extends URIS>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, Option<NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (f) => flow(f, fromNullableF)
}

/**
 * @since 2.10.0
 */
export function chainNullableK<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, Option<A>>) => Kind<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, Option<A>>) => HKT<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, Option<A>>) => HKT<M, Option<NonNullable<B>>> {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return (f) => chainM(fromNullableKM(f))
}

/**
 * @since 2.10.0
 */
export function fromOptionK<F extends URIS>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT<F, Option<B>> {
  return (f) => flow(f, F.of)
}

/**
 * @since 2.10.0
 */
export function chainOptionK<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const chainM = chain(M)
  const fromOptionKM = fromOptionK(M)
  return (f) => chainM(fromOptionKM(f))
}

/**
 * @since 2.10.0
 */
export function fromPredicate<F extends URIS>(
  F: Pointed1<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind<F, Option<A>>
}
export function fromPredicate<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
}
export function fromPredicate<F>(
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
export function fromEither<F extends URIS>(F: Pointed1<F>): <E, A>(e: Either<E, A>) => Kind<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>> {
  return flow(O.fromEither, F.of)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function match<M extends URIS>(
  M: Monad1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function match<M>(
  M: Monad<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B>
export function match<M>(
  M: Monad<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B> {
  return (onNone, onSome) => (ma) => M.chain(ma, O.fold(onNone, onSome))
}

/**
 * @since 2.10.0
 */
export function getOrElse<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A> {
  return (onNone) => (fa) => M.chain(fa, O.fold(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 2.10.0
 */
export function ap<F extends URIS>(
  F: Apply1<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>> {
  return ap_(F, O.Apply)
}

/**
 * @since 2.10.0
 */
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const _none = none(M)
  return (f) => (ma) =>
    M.chain(
      ma,
      O.fold(() => _none, f)
    )
}

/**
 * @since 2.10.0
 */
export function alt<M extends URIS>(
  M: Monad1<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>> {
  const _some = some(M)
  return (second) => (first) => M.chain(first, O.fold(second, _some))
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * @category model
 * @since 2.0.0
 * @deprecated
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}

/**
 * @since 2.0.0
 * @deprecated
 */
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
 * @deprecated
 */
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>

/**
 * @since 2.0.0
 * @deprecated
 */
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
 * @deprecated
 */
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>

/**
 * @since 2.0.0
 * @deprecated
 */
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
 * @deprecated
 */
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
 * @deprecated
 */
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
/** @deprecated */
export function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
/** @deprecated */
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
/** @deprecated */
export function getOptionM<M>(M: Monad<M>): OptionM<M>
/** @deprecated */
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const _ap = ap(M)
  const _map = map(M)
  const _chain = chain(M)
  const _alt = alt(M)
  const _fold = match(M)
  const _getOrElse = getOrElse(M)
  const _none = none(M)

  return {
    map: (fa, f) => pipe(fa, _map(f)),
    ap: (fab, fa) => pipe(fab, _ap(fa)),
    of: some(M),
    chain: (ma, f) => pipe(ma, _chain(f)),
    alt: (fa, that) => pipe(fa, _alt(that)),
    fold: (fa, onNone, onSome) => pipe(fa, _fold(onNone, onSome)),
    getOrElse: (fa, onNone) => pipe(fa, _getOrElse(onNone)),
    fromM: fromF(M),
    none: () => _none
  }
}
