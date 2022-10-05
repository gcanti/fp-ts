/**
 * ```ts
 * interface AsyncResult<E, A> extends Async<Result<E, A>> {}
 * ```
 *
 * `AsyncResult<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Async`.
 *
 * @since 3.0.0
 */
import type * as categoryKind from './CategoryKind'
import type * as composableKind from './ComposableKind'
import type * as semigroupKind from './SemigroupKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import * as result from './Result'
import type { Result } from './Result'
import * as resultT from './ResultT'
import type { Filterable } from './Filterable'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import * as fromAsync_ from './FromAsync'
import type { LazyArg } from './Function'
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
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as async from './Async'
import type { Async } from './Async'
import type { AsyncOption } from './AsyncOption'

/**
 * @category model
 * @since 3.0.0
 */
export interface AsyncResult<E, A> extends Async<Result<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface AsyncResultTypeLambda extends TypeLambda {
  readonly type: AsyncResult<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => AsyncResult<E, never> = /*#__PURE__*/ resultT.fail(async.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => AsyncResult<never, A> = /*#__PURE__*/ resultT.succeed(async.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <A>(async: Async<A>) => AsyncResult<never, A> = /*#__PURE__*/ resultT.fromKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failAsync: <E>(async: Async<E>) => AsyncResult<E, never> = /*#__PURE__*/ resultT.failKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(sync: Sync<A>) => AsyncResult<never, A> = /*#__PURE__*/ flow(async.fromSync, fromAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failSync: <E>(sync: Sync<E>) => AsyncResult<E, never> = /*#__PURE__*/ flow(async.fromSync, failAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A>(either: Result<E, A>) => AsyncResult<E, A> = async.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <E, A>(syncResult: SyncResult<E, A>) => AsyncResult<E, A> = async.fromSync

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncOption: <E>(onNone: E) => <A>(self: AsyncOption<A>) => AsyncResult<E, A> = (onNone) =>
  async.map(result.fromOption(onNone))

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: AsyncResult<E, A>) => Async<E | A> = /*#__PURE__*/ resultT.toUnion(async.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (async: AsyncResult<E, A>) => Async<B | C> = /*#__PURE__*/ resultT.match(async.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchAsync: <E, B, A, C = B>(
  onError: (e: E) => Async<B>,
  onSuccess: (a: A) => Async<C>
) => (self: AsyncResult<E, A>) => Async<B | C> = /*#__PURE__*/ resultT.matchKind(async.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <A>(self: AsyncResult<unknown, A>) => Async<A | B> =
  /*#__PURE__*/ resultT.getOrElse(async.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseAsync: <B>(onError: Async<B>) => <A>(self: AsyncResult<unknown, A>) => Async<A | B> =
  /*#__PURE__*/ resultT.getOrElseKind(async.Monad)

/**
 * Converts a `Promise` that may reject to a `AsyncResult`.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import * as TE from 'fp-ts/AsyncResult'
 * import { identity } from 'fp-ts/Function'
 *
 * async function test() {
 *   assert.deepStrictEqual(await TE.fromRejectable(() => Promise.resolve(1), identity)(), E.succeed(1))
 *   assert.deepStrictEqual(await TE.fromRejectable(() => Promise.reject('error'), identity)(), E.fail('error'))
 * }
 *
 * test()
 *
 * @category interop
 * @see {@link liftRejectable}
 * @since 3.0.0
 */
export const fromRejectable =
  <A, E>(f: LazyArg<Promise<A>>, onRejected: (reason: unknown) => E): AsyncResult<E, A> =>
  async () => {
    try {
      return await f().then(_.succeed)
    } catch (reason) {
      return _.fail(onRejected(reason))
    }
  }

/**
 * Lifts a function returning a `Promise` that may reject to one returning a `AsyncResult`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftRejectable =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => Promise<B>,
    onRejected: (error: unknown) => E
  ): ((...a: A) => AsyncResult<E, B>) =>
  (...a) =>
    fromRejectable(() => f(...a), onRejected)

/**
 * Recovers from all errors.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import { pipe } from 'fp-ts/Function'
 * import * as TE from 'fp-ts/AsyncResult'
 *
 * async function test() {
 *   const errorHandler = TE.catchAll((error: string) => TE.succeed(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.succeed('ok'), errorHandler)(), E.succeed('ok'))
 *   assert.deepStrictEqual(await pipe(TE.fail('ko'), errorHandler)(), E.succeed('recovering from ko...'))
 * }
 *
 * test()
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, E2, B>(
  onError: (e: E1) => AsyncResult<E2, B>
) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E2, A | B> = /*#__PURE__*/ resultT.catchAll(async.Monad)

/**
 * @since 3.0.0
 */
export const swap: <E, A>(self: AsyncResult<E, A>) => AsyncResult<A, E> = /*#__PURE__*/ resultT.swap(async.Functor)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsyncOption = <E>(
  onNone: E
): (<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncOption<B>) => (...a: A) => AsyncResult<E, B>) => {
  const from = fromAsyncOption(onNone)
  return (f) => flow(f, from)
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsyncOption = <A, B, E2>(
  f: (a: A) => AsyncOption<B>,
  onNone: E2
): (<E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B>) => {
  return flatMap(liftAsyncOption(onNone)(f))
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSyncResult = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => SyncResult<E, B>
): ((...a: A) => AsyncResult<E, B>) => flow(f, fromSyncResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSyncResult = <A, E2, B>(
  f: (a: A) => SyncResult<E2, B>
): (<E1>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, B>) => flatMap(liftSyncResult(f))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: AsyncResult<E, A>) => AsyncResult<E, B> = /*#__PURE__*/ resultT.map(
  async.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: AsyncResult<E, A>) => AsyncResult<G, B> =
  /*#__PURE__*/ resultT.mapBoth(async.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: AsyncResult<E, A>) => AsyncResult<G, A> =
  /*#__PURE__*/ resultT.mapError(async.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(
  f: (a: A) => AsyncResult<E2, B>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, B> = /*#__PURE__*/ resultT.flatMap(async.Monad)

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @category error handling
 * @since 3.0.0
 */
export const flatMapError: <E1, E2>(f: (e: E1) => Async<E2>) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E2, A> =
  /*#__PURE__*/ resultT.flatMapError(async.Monad)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(self: AsyncResult<E1, AsyncResult<E2, A>>) => AsyncResult<E1 | E2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `AsyncResult` returns `self` if it is a `Success` or the value returned by `that` otherwise.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import { pipe } from 'fp-ts/Function'
 * import * as TE from 'fp-ts/AsyncResult'
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.succeed(1),
 *       TE.orElse(TE.succeed(2))
 *     )(),
 *     E.succeed(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.fail('a'),
 *       TE.orElse(TE.succeed(2))
 *     )(),
 *     E.succeed(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.fail('a'),
 *       TE.orElse(TE.fail('b'))
 *     )(),
 *     E.fail('b')
 *   )
 * }
 *
 * test()
 *
 * @category error handling
 * @see {@link catchAll}
 * @since 3.0.0
 */
export const orElse: <E2, B>(that: AsyncResult<E2, B>) => <E1, A>(self: AsyncResult<E1, A>) => AsyncResult<E2, A | B> =
  /*#__PURE__*/ resultT.orElse(async.Monad)

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
): applicative.Applicative<result.ValidatedT<AsyncResultTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(Apply, result.getValidatedApplicative(Semigroup)),
  succeed
})

/**
 * The default [`SemigroupKind`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedSemigroupKind = <E>(
  Semigroup: Semigroup<E>
): semigroupKind.SemigroupKind<result.ValidatedT<AsyncResultTypeLambda, E>> => {
  return {
    combineKind: resultT.getValidatedCombineKind(async.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(onNone: E) => <A>(self: AsyncResult<E, Option<A>>) => AsyncResult<E, A> =
  /*#__PURE__*/ resultT.compact(async.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <A, B>(self: AsyncResult<E, Result<A, B>>) => readonly [AsyncResult<E, A>, AsyncResult<E, B>] =
  /*#__PURE__*/ resultT.separate(async.Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(onNone: E): Compactable<result.ValidatedT<AsyncResultTypeLambda, E>> => {
  return {
    compact: compact(onNone)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(onEmpty: E): Filterable<result.ValidatedT<AsyncResultTypeLambda, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, onEmpty),
    filterMap: (f) => filterMap(f, onEmpty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<AsyncResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: AsyncResult<E, (a: A) => B>) => AsyncResult<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: AsyncResult<E, unknown>) => AsyncResult<E, B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: AsyncResult<E, unknown>) => AsyncResult<E, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<AsyncResultTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<AsyncResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKind: <B, E2, C>(
  bfc: (b: B) => AsyncResult<E2, C>
) => <A, E1>(afb: (a: A) => AsyncResult<E1, B>) => (a: A) => AsyncResult<E2 | E1, C> =
  /*#__PURE__*/ flattenable.composeKind(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ComposableKind: composableKind.ComposableKind<AsyncResultTypeLambda> = {
  composeKind
}

/**
 * @since 3.0.0
 */
export const idKind: <A>() => (a: A) => AsyncResult<never, A> = /*#__PURE__*/ fromIdentity.idKind(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: categoryKind.CategoryKind<AsyncResultTypeLambda> = {
  composeKind,
  idKind
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <E2>(
  that: AsyncResult<E2, unknown>
) => <E1, A>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <E2, A>(
  that: AsyncResult<E2, A>
) => <E1>(self: AsyncResult<E1, unknown>) => AsyncResult<E2 | E1, A> = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: AsyncResult<E2, A>
) => <E1, B>(self: AsyncResult<E1, (a: A) => B>) => AsyncResult<E2 | E1, B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<AsyncResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `AsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: AsyncResult<E1, A>, fb: AsyncResult<E2, B>) => AsyncResult<E1 | E2, C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `AsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(
  fa: AsyncResult<E1, A>,
  fb: AsyncResult<E2, B>,
  fc: AsyncResult<E3, C>
) => AsyncResult<E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<AsyncResultTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, E2>(
  f: (a: A) => AsyncResult<E2, unknown>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, E2>(
  onError: (e: E1) => AsyncResult<E2, unknown>
) => <A>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, A> = /*#__PURE__*/ resultT.tapLeft(async.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<AsyncResultTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<AsyncResultTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<AsyncResultTypeLambda> = {
  combineKind: orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<AsyncResultTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => AsyncResult<never, void> = /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => AsyncResult<never, void> =
  /*#__PURE__*/ fromSync_.logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => AsyncResult<never, B> = /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<AsyncResultTypeLambda> = {
  fromSync: fromSync,
  fromAsync: fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => AsyncResult<never, void> = /*#__PURE__*/ fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, A> =
  /*#__PURE__*/ fromAsync_.delay(FromAsync, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => (...a: A) => AsyncResult<never, B> = /*#__PURE__*/ fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(f: (a: A) => Async<B>) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, B> =
  /*#__PURE__*/ fromAsync_.flatMapAsync(FromAsync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<AsyncResultTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => AsyncResult<E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => AsyncResult<E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, B> = /*#__PURE__*/ fromResult_.flatMapOption(
  FromResult,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => AsyncResult<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => AsyncResult<E, B>
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    self: AsyncResult<E1, C>
  ) => AsyncResult<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(
    self: AsyncResult<E1, B>
  ) => AsyncResult<E2 | E1, B>
} = /*#__PURE__*/ fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(f: (a: A) => Option<B>, onNone: E) => (self: AsyncResult<E, A>) => AsyncResult<E, B> =
  /*#__PURE__*/ fromResult_.filterMap(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: AsyncResult<E, C>
  ) => readonly [AsyncResult<E, C>, AsyncResult<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: AsyncResult<E, B>
  ) => readonly [AsyncResult<E, B>, AsyncResult<E, B>]
} = /*#__PURE__*/ fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => (self: AsyncResult<E, A>) => readonly [AsyncResult<E, B>, AsyncResult<E, C>] =
  /*#__PURE__*/ fromResult_.partitionMap(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => result.Result<E, B>
) => (...a: A) => AsyncResult<E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, B> = /*#__PURE__*/ fromResult_.flatMapResult(
  FromResult,
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => AsyncResult<E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => AsyncResult<E, NonNullable<B>> = /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, NonNullable<B>> = /*#__PURE__*/ fromResult_.flatMapNullable(
  FromResult,
  Flattenable
)

/**
 * Convert a node style callback function to one returning a `AsyncResult`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => AsyncResult<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => AsyncResult<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/AsyncResult'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => AsyncResult<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 * @category interop
 * @since 3.0.0
 */
export function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => AsyncResult<L, R>
export function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => AsyncResult<L, R>
export function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => AsyncResult<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => AsyncResult<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => AsyncResult<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => AsyncResult<L, R>
export function taskify<L, R>(f: Function): () => AsyncResult<L, R> {
  return function () {
    const args = Array.prototype.slice.call(arguments)
    return () =>
      new Promise((resolve) => {
        const cbResolver = (e: L, r: R) => (e != null ? resolve(_.fail(e)) : resolve(_.succeed(r)))
        f.apply(null, args.concat(cbResolver))
      })
  }
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Failure`
 *
 * @since 3.0.0
 */
export const bracket: <E1, A, E2, B, E3>(
  acquire: AsyncResult<E1, A>,
  use: (a: A) => AsyncResult<E2, B>,
  release: (a: A, e: result.Result<E2, B>) => AsyncResult<E3, void>
) => AsyncResult<E1 | E2 | E3, B> = /*#__PURE__*/ resultT.bracket(async.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: AsyncResult<never, {}> = /*#__PURE__*/ succeed(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: AsyncResult<E, A>) => AsyncResult<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncResult<E2, B>
) => <E1>(
  self: AsyncResult<E1, A>
) => AsyncResult<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncResult<E2, B>
) => <E1>(
  self: AsyncResult<E1, A>
) => AsyncResult<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: AsyncResult<never, readonly []> = /*#__PURE__*/ succeed(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <E, A>(self: AsyncResult<E, A>) => AsyncResult<E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <E2, B>(
  fb: AsyncResult<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(self: AsyncResult<E1, A>) => AsyncResult<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <E2, B, A, C>(
  that: AsyncResult<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: AsyncResult<E1, A>) => AsyncResult<E2 | E1, C> = /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => AsyncResult<E, ReadonlyNonEmptyArray<B>>) =>
  flow(async.traverseReadonlyNonEmptyArrayWithIndexPar(f), async.map(result.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
): ((as: ReadonlyArray<A>) => AsyncResult<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => AsyncResult<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
): ((as: ReadonlyArray<A>) => AsyncResult<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <E, A>(
  arr: ReadonlyArray<AsyncResult<E, A>>
) => AsyncResult<E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => AsyncResult<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): AsyncResult<E, ReadonlyNonEmptyArray<B>> =>
  () =>
    _.tail(as).reduce<Promise<Result<E, _.NonEmptyArray<B>>>>(
      (acc, a, i) =>
        acc.then((ebs) =>
          _.isFailure(ebs)
            ? acc
            : f(i + 1, a)().then((eb) => {
                if (_.isFailure(eb)) {
                  return eb
                }
                ebs.success.push(eb.success)
                return ebs
              })
        ),
      f(0, _.head(as))().then(result.map(_.singleton))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => AsyncResult<E, B>
): ((as: ReadonlyArray<A>) => AsyncResult<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => AsyncResult<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => AsyncResult<E, B>
): ((as: ReadonlyArray<A>) => AsyncResult<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<AsyncResult<E, A>>) => AsyncResult<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
