/**
 * ```ts
 * interface TaskEither<E, A> extends Task<Either<E, A>> {}
 * ```
 *
 * `TaskEither<E, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 *
 * @since 3.0.0
 */
import type * as semigroupKind from './SemigroupKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import * as compactable from './Compactable'
import * as either from './Either'
import type { Either } from './Either'
import * as eitherT from './EitherT'
import type { Filterable } from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './function'
import { flow, identity, pipe, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as task from './Task'
import type { Task } from './Task'
import type { TaskOption } from './TaskOption'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskEither<E, A> extends Task<Either<E, A>> {}

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

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => TaskEither<E, never> = /*#__PURE__*/ eitherT.left(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => TaskEither<never, A> = /*#__PURE__*/ eitherT.right(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A>(task: Task<A>) => TaskEither<never, A> = /*#__PURE__*/ eitherT.rightKind(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E>(task: Task<E>) => TaskEither<E, never> = /*#__PURE__*/ eitherT.leftKind(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A>(io: IO<A>) => TaskEither<never, A> = /*#__PURE__*/ flow(task.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E>(io: IO<E>) => TaskEither<E, never> = /*#__PURE__*/ flow(task.fromIO, leftTask)

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromIO: <A>(io: IO<A>) => TaskEither<never, A> = rightIO

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromTask: <A>(task: Task<A>) => TaskEither<never, A> = rightTask

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromEither: <E, A>(either: Either<E, A>) => TaskEither<E, A> = task.of

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(ioEither: IOEither<E, A>) => TaskEither<E, A> = task.fromIO

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromTaskOption: <E>(onNone: LazyArg<E>) => <A>(self: TaskOption<A>) => TaskEither<E, A> = (onNone) =>
  task.map(either.fromOption(onNone))

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
) => (task: TaskEither<E, A>) => Task<B | C> = /*#__PURE__*/ eitherT.match(task.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchTask: <E, B, A, C = B>(
  onError: (e: E) => Task<B>,
  onSuccess: (a: A) => Task<C>
) => (self: TaskEither<E, A>) => Task<B | C> = /*#__PURE__*/ eitherT.matchKind(task.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <A>(self: TaskEither<E, A>) => Task<A | B> =
  /*#__PURE__*/ eitherT.getOrElse(task.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseTask: <E, B>(onError: (e: E) => Task<B>) => <A>(self: TaskEither<E, A>) => Task<A | B> =
  /*#__PURE__*/ eitherT.getOrElseKind(task.Monad)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import * as TE from 'fp-ts/TaskEither'
 * import { identity } from 'fp-ts/function'
 *
 * async function test() {
 *   assert.deepStrictEqual(await TE.tryCatch(() => Promise.resolve(1), identity)(), E.right(1))
 *   assert.deepStrictEqual(await TE.tryCatch(() => Promise.reject('error'), identity)(), E.left('error'))
 * }
 *
 * test()
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch =
  <A, E>(f: LazyArg<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> =>
  async () => {
    try {
      return await f().then(_.right)
    } catch (reason) {
      return _.left(onRejected(reason))
    }
  }

/**
 * Converts a function returning a `Promise` that may reject to one returning a `TaskEither`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => Promise<B>,
    onRejected: (error: unknown) => E
  ): ((...a: A) => TaskEither<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onRejected)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: TaskEither<E, A>) => Task<E | A> = /*#__PURE__*/ eitherT.toUnion(task.Functor)

/**
 * Recovers from all errors.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   const errorHandler = TE.catchAll((error: string) => TE.right(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
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
export const fromTaskOptionK = <E>(
  onNone: LazyArg<E>
): (<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>) => {
  const from = fromTaskOption(onNone)
  return (f) => flow(f, from)
}

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapTaskOptionK =
  <E2>(onNone: LazyArg<E2>) =>
  <A, B>(f: (a: A) => TaskOption<B>) =>
  <E1>(self: TaskEither<E1, A>): TaskEither<E1 | E2, B> =>
    pipe(self, flatMap(fromTaskOptionK<E1 | E2>(onNone)(f)))

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): ((...a: A) => TaskEither<E, B>) => flow(f, fromIOEither)

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapIOEitherK = <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
): (<E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B>) => flatMap(fromIOEitherK(f))

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
  /*#__PURE__*/ eitherT.mapLeft(task.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ eitherT.flatMap(task.Monad)

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
 * In case of `TaskEither` returns `self` if it is a `Right` or the value returned by `that` otherwise.
 *
 * See also [catchAll](#catchall).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.right(1),
 *       TE.orElse(TE.right(2))
 *     )(),
 *     E.right(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.orElse(TE.right(2))
 *     )(),
 *     E.right(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.orElse(TE.left('b'))
 *     )(),
 *     E.left('b')
 *   )
 * }
 *
 * test()
 *
 * @category error handling
 * @since 3.0.0
 */
export const orElse: <E2, B>(that: TaskEither<E2, B>) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2, A | B> =
  /*#__PURE__*/ eitherT.orElse(task.Monad)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => TaskEither<never, A> = right

/**
 * @since 3.0.0
 */
export const unit: TaskEither<never, void> = of(undefined)

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
): applicative.Applicative<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>> => ({
  map,
  ap: apply.getApComposition(Apply, either.getValidatedApplicative(Semigroup)),
  of
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
): semigroupKind.SemigroupKind<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>> => {
  return {
    combineKind: eitherT.getValidatedCombineK(task.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.ValidatedTypeLambda<either.EitherTypeLambda, E>> = { map: either.map }
  return {
    compact: compactable.getCompactComposition(task.Functor, C),
    separate: compactable.getSeparateComposition(task.Functor, C, F)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable<either.ValidatedTypeLambda<TaskEitherTypeLambda, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, () => M.empty),
    filterMap: (f) => filterMap(f, () => M.empty)
  }
}

/**
 * @category mapping
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
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TaskEitherTypeLambda> = {
  of
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
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <E2, _>(that: TaskEither<E2, _>) => <E1, A>(self: TaskEither<E1, A>) => TaskEither<E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <E2, A>(that: TaskEither<E2, A>) => <E1, _>(self: TaskEither<E1, _>) => TaskEither<E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

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
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, E2, _>(
  f: (a: A) => TaskEither<E2, _>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, E2, _>(
  onError: (e: E1) => TaskEither<E2, _>
) => <A>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ eitherT.tapLeft(task.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskEitherTypeLambda> = {
  map,
  of,
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
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => (...a: A) => TaskEither<never, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

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
 * @category combinators
 * @since 3.0.0
 */
export const delay: (duration: number) => <E, A>(self: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromTask_.delay(FromTask, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskEither<never, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapTaskK: <A, B>(f: (a: A) => task.Task<B>) => <E>(self: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromTask_.flatMapTaskK(FromTask, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskEitherTypeLambda> = {
  fromEither
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.flatMapOptionK(FromEither, Flattenable)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => TaskEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => TaskEither<E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    self: TaskEither<E1, C>
  ) => TaskEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    self: TaskEither<E1, B>
  ) => TaskEither<E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.filterMap(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: TaskEither<E, C>
  ) => readonly [TaskEither<E, C>, TaskEither<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: TaskEither<E, B>
  ) => readonly [TaskEither<E, B>, TaskEither<E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => (self: TaskEither<E, A>) => readonly [TaskEither<E, B>, TaskEither<E, C>] = /*#__PURE__*/ fromEither_.partitionMap(
  FromEither,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category sequencing, lifting
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(self: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ fromEither_.flatMapEitherK(
  FromEither,
  Flattenable
)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => TaskEither<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (self: TaskEither<E, A>) => TaskEither<E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullableK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

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
        const cbResolver = (e: L, r: R) => (e != null ? resolve(_.left(e)) : resolve(_.right(r)))
        f.apply(null, args.concat(cbResolver))
      })
  }
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 3.0.0
 */
export const bracket: <E1, A, E2, B, E3>(
  acquire: TaskEither<E1, A>,
  use: (a: A) => TaskEither<E2, B>,
  release: (a: A, e: either.Either<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B> = /*#__PURE__*/ eitherT.bracket(task.Monad)

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: TaskEither<never, {}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
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
   * @category struct sequencing
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category struct sequencing
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
 * @category struct sequencing
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
export const Zip: TaskEither<never, readonly []> = /*#__PURE__*/ of(_.Zip)

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
 * @category sequencing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndexPar(f), task.map(either.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category sequencing
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
 * @category sequencing
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
 * @category sequencing
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
 * @category sequencing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => TaskEither<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskEither<E, ReadonlyNonEmptyArray<B>> =>
  () =>
    _.tail(as).reduce<Promise<Either<E, _.NonEmptyArray<B>>>>(
      (acc, a, i) =>
        acc.then((ebs) =>
          _.isLeft(ebs)
            ? acc
            : f(i + 1, a)().then((eb) => {
                if (_.isLeft(eb)) {
                  return eb
                }
                ebs.right.push(eb.right)
                return ebs
              })
        ),
      f(0, _.head(as))().then(either.map(_.singleton))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category sequencing
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
 * @category sequencing
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
 * @category sequencing
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
 * @category sequencing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
