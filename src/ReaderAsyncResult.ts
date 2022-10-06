/**
 * @since 3.0.0
 */
import type * as alt from './Alt'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import type { Result, ValidatedT } from './Result'
import * as resultT from './ResultT'
import type { Filterable } from './Filterable'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import * as fromReader_ from './FromReader'
import * as fromAsync_ from './FromAsync'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type { SyncResult } from './SyncResult'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { Reader } from './Reader'
import type { ReaderResult } from './ReaderResult'
import type { ReaderSync } from './ReaderSync'
import * as readerAsync from './ReaderAsync'
import type { ReaderAsync } from './ReaderAsync'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type * as async from './Async'
import type { Async } from './Async'
import * as asyncResult from './AsyncResult'
import type { AsyncResult } from './AsyncResult'

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderAsyncResult<R, E, A> {
  (r: R): AsyncResult<E, A>
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncResult<this['In1'], this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => ReaderAsyncResult<unknown, E, never> = /*#__PURE__*/ resultT.fail(
  readerAsync.FromIdentity
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => ReaderAsyncResult<unknown, never, A> = /*#__PURE__*/ resultT.succeed(
  readerAsync.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncResult: <E, A>(fa: asyncResult.AsyncResult<E, A>) => ReaderAsyncResult<unknown, E, A> =
  /*#__PURE__*/ reader.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <A>(ma: Async<A>) => ReaderAsyncResult<unknown, never, A> = /*#__PURE__*/ flow(
  asyncResult.fromAsync,
  fromAsyncResult
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failAsync: <E>(me: Async<E>) => ReaderAsyncResult<unknown, E, never> = /*#__PURE__*/ flow(
  asyncResult.failAsync,
  fromAsyncResult
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader = <R, A>(ma: Reader<R, A>): ReaderAsyncResult<R, never, A> => flow(ma, asyncResult.succeed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failReader: <R, E>(me: Reader<R, E>) => ReaderAsyncResult<R, E, never> = (me) => flow(me, asyncResult.fail)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderAsync: <R, A>(ma: ReaderAsync<R, A>) => ReaderAsyncResult<R, never, A> =
  /*#__PURE__*/ resultT.fromKind(readerAsync.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failReaderAsync: <R, E>(me: ReaderAsync<R, E>) => ReaderAsyncResult<R, E, never> =
  /*#__PURE__*/ resultT.failKind(readerAsync.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromSync: <A>(ma: Sync<A>) => ReaderAsyncResult<unknown, never, A> = /*#__PURE__*/ flow(
  asyncResult.fromSync,
  fromAsyncResult
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failSync: <E>(me: Sync<E>) => ReaderAsyncResult<unknown, E, never> = /*#__PURE__*/ flow(
  asyncResult.failSync,
  fromAsyncResult
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderAsyncResult: <R1, R2, E, A>(
  f: (r1: R1) => ReaderAsyncResult<R2, E, A>
) => ReaderAsyncResult<R1 & R2, E, A> = reader.asksReader

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderSync: <R, A>(ma: ReaderSync<R, A>) => ReaderAsyncResult<R, never, A> = /*#__PURE__*/ (ma) =>
  flow(ma, asyncResult.fromSync)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failReaderSync: <R, E>(me: ReaderSync<R, E>) => ReaderAsyncResult<R, E, never> = /*#__PURE__*/ (me) =>
  flow(me, asyncResult.failSync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A>(fa: Result<E, A>) => ReaderAsyncResult<unknown, E, A> = readerAsync.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <E, A>(fa: SyncResult<E, A>) => ReaderAsyncResult<unknown, E, A> = /*#__PURE__*/ flow(
  asyncResult.fromSyncResult,
  fromAsyncResult
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderResult: <R, E, A>(fa: ReaderResult<R, E, A>) => ReaderAsyncResult<R, E, A> = (ma) =>
  flow(ma, asyncResult.fromResult)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: ReaderAsyncResult<R, E, A>) => ReaderAsync<R, B | C> = /*#__PURE__*/ resultT.match(readerAsync.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchReaderAsync: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => ReaderAsync<R2, B>,
  onSuccess: (a: A) => ReaderAsync<R3, C>
) => <R1>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsync<R1 & R2 & R3, B | C> = /*#__PURE__*/ resultT.matchKind(
  readerAsync.Monad
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <R, A>(self: ReaderAsyncResult<R, unknown, A>) => ReaderAsync<R, A | B> =
  /*#__PURE__*/ resultT.getOrElse(readerAsync.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseReaderAsync: <R2, B>(
  onError: ReaderAsync<R2, B>
) => <R1, A>(self: ReaderAsyncResult<R1, unknown, A>) => ReaderAsync<R1 & R2, A | B> =
  /*#__PURE__*/ resultT.getOrElseKind(readerAsync.Monad)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderAsyncResult<R, E, A>) => ReaderAsync<R, E | A> =
  /*#__PURE__*/ resultT.toUnion(readerAsync.Functor)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R2, E, A> = reader.local

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, R2, E2, B>(
  onError: (e: E1) => ReaderAsyncResult<R2, E2, B>
) => <R1, A>(ma: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2, A | B> =
  /*#__PURE__*/ resultT.catchAll(readerAsync.Monad)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2>(
  onError: (e: E1) => ReaderAsyncResult<R2, E2, unknown>
) => <R1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ resultT.tapLeft(readerAsync.Monad)

/**
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, A, E> = /*#__PURE__*/ resultT.swap(
  readerAsync.Functor
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSyncResult =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => SyncResult<E, B>
  ): ((...a: A) => ReaderAsyncResult<unknown, E, B>) =>
  (...a) =>
    fromSyncResult(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSyncResult: <A, E2, B>(
  f: (a: A) => SyncResult<E2, B>
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E1 | E2, B> = (f) => flatMap(liftSyncResult(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsyncResult =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => AsyncResult<E, B>
  ): ((...a: A) => ReaderAsyncResult<unknown, E, B>) =>
  (...a) =>
    fromAsyncResult(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsyncResult: <A, E2, B>(
  f: (a: A) => AsyncResult<E2, B>
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E1 | E2, B> = (f) => flatMap(liftAsyncResult(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderResult = <A extends ReadonlyArray<unknown>, R, E, B>(
  f: (...a: A) => ReaderResult<R, E, B>
): ((...a: A) => ReaderAsyncResult<R, E, B>) => flow(f, fromReaderResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderResult: <A, R2, E2, B>(
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E1 | E2, B> = (f) =>
  flatMap(liftReaderResult(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderSync =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderSync<R, B>
  ): ((...a: A) => ReaderAsyncResult<R, never, B>) =>
  (...a) =>
    fromReaderSync(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderSync: <A, R2, B>(
  f: (a: A) => ReaderSync<R2, B>
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B> = (f) => flatMap(liftReaderSync(f))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B> =
  /*#__PURE__*/ resultT.map(readerAsync.Functor)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, G, B> = /*#__PURE__*/ resultT.mapBoth(
  readerAsync.Functor
)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(
  f: (e: E) => G
) => <R, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, G, A> = /*#__PURE__*/ resultT.mapError(
  readerAsync.Functor
)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ resultT.flatMap(readerAsync.Monad)

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @category error handling
 * @since 3.0.0
 */
export const flatMapError: <E1, R, E2>(
  f: (e: E1) => ReaderAsync<R, E2>
) => <A>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2, A> = /*#__PURE__*/ resultT.flatMapError(
  readerAsync.Monad
)

/**
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderAsyncResult<R1, E1, ReaderAsyncResult<R2, E2, A>>
) => ReaderAsyncResult<R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * @since 3.0.0
 */
export const orElse: <R2, E2, B>(
  that: ReaderAsyncResult<R2, E2, B>
) => <R1, E1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2, A | B> =
  /*#__PURE__*/ resultT.orElse(readerAsync.Monad)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  Apply: apply.Apply<async.AsyncTypeLambda>,
  Semigroup: Semigroup<E>
): applicative.Applicative<ValidatedT<ReaderAsyncResultTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(reader.Apply, asyncResult.getValidatedApplicative(Apply, Semigroup)),
  succeed
})

/**
 * The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedAlt = <E>(Semigroup: Semigroup<E>): alt.Alt<ValidatedT<ReaderAsyncResultTypeLambda, E>> => {
  return {
    orElse: resultT.getValidatedOrElse(readerAsync.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(onNone: E) => <R, A>(self: ReaderAsyncResult<R, E, Option<A>>) => ReaderAsyncResult<R, E, A> =
  /*#__PURE__*/ resultT.compact(readerAsync.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <R, A, B>(
  self: ReaderAsyncResult<R, E, Result<A, B>>
) => readonly [ReaderAsyncResult<R, E, A>, ReaderAsyncResult<R, E, B>] = /*#__PURE__*/ resultT.separate(
  readerAsync.Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(onNone: E): Compactable<ValidatedT<ReaderAsyncResultTypeLambda, E>> => {
  return {
    compact: compact(onNone)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(onEmpty: E): Filterable<ValidatedT<ReaderAsyncResultTypeLambda, E>> => {
  return {
    filterMap: (f) => filterMap(f, onEmpty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderAsyncResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderAsyncResult<R, E, (a: A) => B>) => ReaderAsyncResult<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R, E>(self: ReaderAsyncResult<R, E, unknown>) => ReaderAsyncResult<R, E, B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R, E>(self: ReaderAsyncResult<R, E, unknown>) => ReaderAsyncResult<R, E, void> =
  /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReaderAsyncResultTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderAsyncResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, R2, E2, C>(
  bfc: (b: B) => ReaderAsyncResult<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderAsyncResult<R1, E1, B>) => (a: A) => ReaderAsyncResult<R1 & R2, E1 | E2, C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReaderAsyncResultTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => ReaderAsyncResult<unknown, never, A> =
  /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReaderAsyncResultTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <R2, E2>(
  that: ReaderAsyncResult<R2, E2, unknown>
) => <R1, E1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, E2, A>(
  that: ReaderAsyncResult<R2, E2, A>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, unknown>) => ReaderAsyncResult<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderAsyncResult<R2, E2, A>
) => <R1, E1, B>(self: ReaderAsyncResult<R1, E1, (a: A) => B>) => ReaderAsyncResult<R1 & R2, E2 | E1, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderAsyncResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderAsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(
  fa: ReaderAsyncResult<R1, E1, A>,
  fb: ReaderAsyncResult<R2, E2, B>
) => ReaderAsyncResult<R1 & R2, E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderAsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderAsyncResult<R1, E1, A>,
  fb: ReaderAsyncResult<R2, E2, B>,
  fc: ReaderAsyncResult<R3, E3, C>
) => ReaderAsyncResult<R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderAsyncResultTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, R2, E2>(
  f: (a: A) => ReaderAsyncResult<R2, E2, unknown>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderAsyncResultTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<ReaderAsyncResultTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderAsyncResult<unknown, never, void> =
  /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderAsyncResult<unknown, never, void> =
  /*#__PURE__*/ fromSync_.logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => ReaderAsyncResult<unknown, never, B> = /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(
  f: (a: A) => Sync<B>
) => <R, E>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B> = /*#__PURE__*/ fromSync_.flatMapSync(
  FromSync,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<ReaderAsyncResultTypeLambda> = {
  fromSync: fromSync,
  fromAsync: fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => ReaderAsyncResult<unknown, never, void> =
  /*#__PURE__*/ fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, A> =
  /*#__PURE__*/ fromAsync_.delay(FromAsync, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => (...a: A) => ReaderAsyncResult<unknown, never, B> = /*#__PURE__*/ fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(
  f: (a: A) => Async<B>
) => <R, E>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B> = /*#__PURE__*/ fromAsync_.flatMapAsync(
  FromAsync,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderAsyncResultTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderAsyncResult<R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderResult`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderAsyncResult<R, never, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderAsyncResult<R, never, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReader(FromReader, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderAsync =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderAsync<R, B>
  ): ((...a: A) => ReaderAsyncResult<R, never, B>) =>
  (...a) =>
    fromReaderAsync(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderAsync: <A, R2, B>(
  f: (a: A) => readerAsync.ReaderAsync<R2, B>
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B> = (f) => flatMap(liftReaderAsync(f))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<ReaderAsyncResultTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A, R>(fa: Option<A>) => ReaderAsyncResult<R, E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => ReaderAsyncResult<unknown, E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <R, E1>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, B> =
  /*#__PURE__*/ fromResult_.flatMapOption(FromResult, Flattenable)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E1 | E2, B> =
  /*#__PURE__*/ fromResult_.flatMapResult(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    c: C
  ) => ReaderAsyncResult<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => ReaderAsyncResult<unknown, E, B>
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <R, E1>(
    ma: ReaderAsyncResult<R, E1, C>
  ) => ReaderAsyncResult<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <R, E1>(
    mb: ReaderAsyncResult<R, E1, B>
  ) => ReaderAsyncResult<R, E2 | E1, B>
} = /*#__PURE__*/ fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => <R>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B> = /*#__PURE__*/ fromResult_.filterMap(
  FromResult,
  Flattenable
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <R>(
    self: ReaderAsyncResult<R, E, C>
  ) => readonly [ReaderAsyncResult<R, E, C>, ReaderAsyncResult<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <R>(
    self: ReaderAsyncResult<R, E, B>
  ) => readonly [ReaderAsyncResult<R, E, B>, ReaderAsyncResult<R, E, B>]
} = /*#__PURE__*/ fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => <R>(self: ReaderAsyncResult<R, E, A>) => readonly [ReaderAsyncResult<R, E, B>, ReaderAsyncResult<R, E, C>] =
  /*#__PURE__*/ fromResult_.partitionMap(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => ReaderAsyncResult<unknown, E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => ReaderAsyncResult<unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => ReaderAsyncResult<unknown, E, NonNullable<B>> = /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <R, E1>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, NonNullable<B>> =
  /*#__PURE__*/ fromResult_.flatMapNullable(FromResult, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderAsyncResultTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<ReaderAsyncResultTypeLambda> = {
  orElse
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Failure`
 *
 * @since 3.0.0
 */
export const bracket: <R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderAsyncResult<R1, E1, A>,
  use: (a: A) => ReaderAsyncResult<R2, E2, B>,
  release: (a: A, e: Result<E2, B>) => ReaderAsyncResult<R3, E3, void>
) => ReaderAsyncResult<R1 & R2 & R3, E1 | E2 | E3, B> = /*#__PURE__*/ resultT.bracket(readerAsync.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderAsyncResult<unknown, never, {}> = /*#__PURE__*/ succeed(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderAsyncResult<R, E, A>
) => ReaderAsyncResult<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderAsyncResult<unknown, never, readonly []> = /*#__PURE__*/ succeed(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, E2, B>(
  fb: ReaderAsyncResult<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, E2, B, A, C>(
  that: ReaderAsyncResult<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndexPar = <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsyncResult<R, E, NonEmptyReadonlyArray<B>>) =>
  flow(
    reader.traverseNonEmptyReadonlyArrayWithIndex(f),
    reader.map(asyncResult.traverseNonEmptyReadonlyArrayWithIndexPar(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderAsyncResult<R, E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsyncResult<R, E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderAsyncResult<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <R, E, A>(
  arr: ReadonlyArray<ReaderAsyncResult<R, E, A>>
) => ReaderAsyncResult<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsyncResult<R, E, NonEmptyReadonlyArray<B>>) =>
  flow(
    reader.traverseNonEmptyReadonlyArrayWithIndex(f),
    reader.map(asyncResult.traverseNonEmptyReadonlyArrayWithIndex(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderAsyncResult<R, E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsyncResult<R, E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderAsyncResult<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderAsyncResult<R, E, A>>
) => ReaderAsyncResult<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
