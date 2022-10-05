/**
 * ```ts
 * interface TaskEither<E, A> extends Task<Either<E, A>> {}
 * ```
 *
 * `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
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
import * as either from './Result'
import type { Result } from './Result'
import * as eitherT from './EitherT'
import type { Filterable } from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './Function'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as task from './Async'
import type { Async } from './Async'
import type { TaskOption } from './TaskOption'

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskEither<E, A> extends Async<Result<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TaskEitherTypeLambda extends TypeLambda {
  readonly type: TaskEither<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => TaskEither<E, never> = /*#__PURE__*/ eitherT.fail(task.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => TaskEither<never, A> = /*#__PURE__*/ eitherT.succeed(task.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTask: <A>(task: Async<A>) => TaskEither<never, A> = /*#__PURE__*/ eitherT.fromKind(task.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failAsync: <E>(task: Async<E>) => TaskEither<E, never> = /*#__PURE__*/ eitherT.failKind(task.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIO: <A>(io: Sync<A>) => TaskEither<never, A> = /*#__PURE__*/ flow(task.fromIO, fromTask)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failSync: <E>(io: Sync<E>) => TaskEither<E, never> = /*#__PURE__*/ flow(task.fromIO, failAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEither: <E, A>(either: Result<E, A>) => TaskEither<E, A> = task.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(ioEither: IOEither<E, A>) => TaskEither<E, A> = task.fromIO

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTaskOption: <E>(onNone: E) => <A>(self: TaskOption<A>) => TaskEither<E, A> = (onNone) =>
  task.map(either.fromOption(onNone))

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: TaskEither<E, A>) => Async<E | A> = /*#__PURE__*/ eitherT.toUnion(task.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (task: TaskEither<E, A>) => Async<B | C> = /*#__PURE__*/ eitherT.match(task.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchTask: <E, B, A, C = B>(
  onError: (e: E) => Async<B>,
  onSuccess: (a: A) => Async<C>
) => (self: TaskEither<E, A>) => Async<B | C> = /*#__PURE__*/ eitherT.matchKind(task.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <A>(self: TaskEither<unknown, A>) => Async<A | B> =
  /*#__PURE__*/ eitherT.getOrElse(task.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseTask: <B>(onError: Async<B>) => <A>(self: TaskEither<unknown, A>) => Async<A | B> =
  /*#__PURE__*/ eitherT.getOrElseKind(task.Monad)

/**
 * Converts a `Promise` that may reject to a `TaskEither`.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import * as TE from 'fp-ts/TaskEither'
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
  <A, E>(f: LazyArg<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> =>
  async () => {
    try {
      return await f().then(_.succeed)
    } catch (reason) {
      return _.fail(onRejected(reason))
    }
  }

/**
 * Lifts a function returning a `Promise` that may reject to one returning a `TaskEither`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftRejectable =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => Promise<B>,
    onRejected: (error: unknown) => E
  ): ((...a: A) => TaskEither<E, B>) =>
  (...a) =>
    fromRejectable(() => f(...a), onRejected)

/**
 * Recovers from all errors.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import { pipe } from 'fp-ts/Function'
 * import * as TE from 'fp-ts/TaskEither'
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
  onError: (e: E1) => TaskEither<E2, B>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E2, A | B> = /*#__PURE__*/ eitherT.catchAll(task.Monad)

/**
 * @since 3.0.0
 */
export const swap: <E, A>(self: TaskEither<E, A>) => TaskEither<A, E> = /*#__PURE__*/ eitherT.swap(task.Functor)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTaskOption = <E>(
  onNone: E
): (<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>) => {
  const from = fromTaskOption(onNone)
  return (f) => flow(f, from)
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTaskOption = <A, B, E2>(
  f: (a: A) => TaskOption<B>,
  onNone: E2
): (<E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B>) => {
  return flatMap(liftTaskOption(onNone)(f))
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftIOEither = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): ((...a: A) => TaskEither<E, B>) => flow(f, fromIOEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapIOEither = <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
): (<E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B>) => flatMap(liftIOEither(f))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ eitherT.map(
  task.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: TaskEither<E, A>) => TaskEither<G, B> =
  /*#__PURE__*/ eitherT.mapBoth(task.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: TaskEither<E, A>) => TaskEither<G, A> =
  /*#__PURE__*/ eitherT.mapError(task.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ eitherT.flatMap(task.Monad)

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @category error handling
 * @since 3.0.0
 */
export const flatMapError: <E1, E2>(f: (e: E1) => Async<E2>) => <A>(self: TaskEither<E1, A>) => TaskEither<E2, A> =
  /*#__PURE__*/ eitherT.flatMapError(task.Monad)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(self: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `TaskEither` returns `self` if it is a `Success` or the value returned by `that` otherwise.
 *
 * @example
 * import * as E from 'fp-ts/Result'
 * import { pipe } from 'fp-ts/Function'
 * import * as TE from 'fp-ts/TaskEither'
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
export const orElse: <E2, B>(that: TaskEither<E2, B>) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2, A | B> =
  /*#__PURE__*/ eitherT.orElse(task.Monad)

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  Apply: apply.Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
): applicative.Applicative<either.ValidatedT<TaskEitherTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(Apply, either.getValidatedApplicative(Semigroup)),
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
): semigroupKind.SemigroupKind<either.ValidatedT<TaskEitherTypeLambda, E>> => {
  return {
    combineKind: eitherT.getValidatedCombineKind(task.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(onNone: E) => <A>(self: TaskEither<E, Option<A>>) => TaskEither<E, A> =
  /*#__PURE__*/ eitherT.compact(task.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <A, B>(self: TaskEither<E, Result<A, B>>) => readonly [TaskEither<E, A>, TaskEither<E, B>] =
  /*#__PURE__*/ eitherT.separate(task.Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(onNone: E): Compactable<either.ValidatedT<TaskEitherTypeLambda, E>> => {
  return {
    compact: compact(onNone)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(onEmpty: E): Filterable<either.ValidatedT<TaskEitherTypeLambda, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, onEmpty),
    filterMap: (f) => filterMap(f, onEmpty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskEitherTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: TaskEither<E, unknown>) => TaskEither<E, B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: TaskEither<E, unknown>) => TaskEither<E, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<TaskEitherTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<TaskEitherTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKind: <B, E2, C>(
  bfc: (b: B) => TaskEither<E2, C>
) => <A, E1>(afb: (a: A) => TaskEither<E1, B>) => (a: A) => TaskEither<E2 | E1, C> =
  /*#__PURE__*/ flattenable.composeKind(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ComposableKind: composableKind.ComposableKind<TaskEitherTypeLambda> = {
  composeKind
}

/**
 * @since 3.0.0
 */
export const idKind: <A>() => (a: A) => TaskEither<never, A> = /*#__PURE__*/ fromIdentity.idKind(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: categoryKind.CategoryKind<TaskEitherTypeLambda> = {
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
  that: TaskEither<E2, unknown>
) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <E2, A>(
  that: TaskEither<E2, A>
) => <E1>(self: TaskEither<E1, unknown>) => TaskEither<E2 | E1, A> = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(self: TaskEither<E1, (a: A) => B>) => TaskEither<E2 | E1, B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<TaskEitherTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `TaskEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>) => TaskEither<E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `TaskEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: TaskEither<E1, A>, fb: TaskEither<E2, B>, fc: TaskEither<E3, C>) => TaskEither<E1 | E2 | E3, D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<TaskEitherTypeLambda> = {
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
  f: (a: A) => TaskEither<E2, unknown>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, E2>(
  onError: (e: E1) => TaskEither<E2, unknown>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ eitherT.tapLeft(task.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskEitherTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TaskEitherTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<TaskEitherTypeLambda> = {
  combineKind: orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskEitherTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => TaskEither<never, void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => TaskEither<never, void> =
  /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => TaskEither<never, B> = /*#__PURE__*/ fromIO_.liftSync(FromIO)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromIO_.flatMapSync(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<TaskEitherTypeLambda> = {
  fromIO,
  fromTask
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => TaskEither<never, void> = /*#__PURE__*/ fromTask_.sleep(FromTask)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromTask_.delay(FromTask, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => (...a: A) => TaskEither<never, B> = /*#__PURE__*/ fromTask_.liftAsync(FromTask)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTask: <A, B>(f: (a: A) => Async<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromTask_.flatMapTask(FromTask, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskEitherTypeLambda> = {
  fromEither
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.liftOption(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, B> = /*#__PURE__*/ fromEither_.flatMapOption(
  FromEither,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => TaskEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => TaskEither<E, B>
} = /*#__PURE__*/ fromEither_.liftPredicate(FromEither)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    self: TaskEither<E1, C>
  ) => TaskEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(
    self: TaskEither<E1, B>
  ) => TaskEither<E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(f: (a: A) => Option<B>, onNone: E) => (self: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromEither_.filterMap(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: TaskEither<E, C>
  ) => readonly [TaskEither<E, C>, TaskEither<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: TaskEither<E, B>
  ) => readonly [TaskEither<E, B>, TaskEither<E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => (self: TaskEither<E, A>) => readonly [TaskEither<E, B>, TaskEither<E, C>] = /*#__PURE__*/ fromEither_.partitionMap(
  FromEither,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Result<E, B>
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.liftEither(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ fromEither_.flatMapEither(
  FromEither,
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => TaskEither<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => TaskEither<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.liftNullable(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, NonNullable<B>> = /*#__PURE__*/ fromEither_.flatMapNullable(
  FromEither,
  Flattenable
)

/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 * @category interop
 * @since 3.0.0
 */
export function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>
export function taskify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => TaskEither<L, R>
export function taskify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => TaskEither<L, R>
export function taskify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => TaskEither<L, R>
export function taskify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => TaskEither<L, R>
export function taskify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>
export function taskify<L, R>(f: Function): () => TaskEither<L, R> {
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
  acquire: TaskEither<E1, A>,
  use: (a: A) => TaskEither<E2, B>,
  release: (a: A, e: either.Result<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B> = /*#__PURE__*/ eitherT.bracket(task.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: TaskEither<never, {}> = /*#__PURE__*/ succeed(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
  f: (a: A) => TaskEither<E2, B>
) => <E1>(
  self: TaskEither<E1, A>
) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(
  self: TaskEither<E1, A>
) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: TaskEither<never, readonly []> = /*#__PURE__*/ succeed(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <E, A>(self: TaskEither<E, A>) => TaskEither<E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <E2, B>(
  fb: TaskEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <E2, B, A, C>(
  that: TaskEither<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, C> = /*#__PURE__*/ apply.zipWith(Apply)

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
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndexPar(f), task.map(either.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
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
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => TaskEither<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskEither<E, ReadonlyNonEmptyArray<B>> =>
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
      f(0, _.head(as))().then(either.map(_.singleton))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
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
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
