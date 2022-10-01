/**
 * @since 3.0.0
 */
import type * as semigroupKind from './SemigroupKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import type * as categoryKind from './CategoryKind'
import type * as composableKind from './ComposableKind'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import * as either from './Either'
import type { Either } from './Either'
import * as eitherT from './EitherT'
import * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './Function'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { Reader } from './Reader'
import type { ReaderEither } from './ReaderEither'
import type { ReaderIO } from './ReaderIO'
import * as readerTask from './ReaderTask'
import type { ReaderTask } from './ReaderTask'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type * as task from './Task'
import type { Task } from './Task'
import * as taskEither from './TaskEither'
import type { TaskEither } from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderTaskEitherTypeLambda extends TypeLambda {
  readonly type: ReaderTaskEither<this['In1'], this['Out2'], this['Out1']>
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTaskEither: <E, A>(fa: taskEither.TaskEither<E, A>) => ReaderTaskEither<unknown, E, A> =
  /*#__PURE__*/ reader.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => ReaderTaskEither<unknown, E, never> = /*#__PURE__*/ eitherT.left(readerTask.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => ReaderTaskEither<unknown, never, A> = /*#__PURE__*/ eitherT.right(readerTask.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A>(ma: Task<A>) => ReaderTaskEither<unknown, never, A> = /*#__PURE__*/ flow(
  taskEither.rightTask,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E>(me: Task<E>) => ReaderTaskEither<unknown, E, never> = /*#__PURE__*/ flow(
  taskEither.leftTask,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A>(ma: Reader<R, A>) => ReaderTaskEither<R, never, A> = (ma) => flow(ma, taskEither.right)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E>(me: Reader<R, E>) => ReaderTaskEither<R, E, never> = (me) => flow(me, taskEither.left)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderTask: <R, A>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, never, A> =
  /*#__PURE__*/ eitherT.rightKind(readerTask.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderTask: <R, E>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, never> =
  /*#__PURE__*/ eitherT.leftKind(readerTask.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A>(ma: IO<A>) => ReaderTaskEither<unknown, never, A> = /*#__PURE__*/ flow(
  taskEither.rightIO,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E>(me: IO<E>) => ReaderTaskEither<unknown, E, never> = /*#__PURE__*/ flow(
  taskEither.leftIO,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A> = reader.asksReader

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderIO: <R, A>(ma: ReaderIO<R, A>) => ReaderTaskEither<R, never, A> = /*#__PURE__*/ (ma) =>
  flow(ma, taskEither.rightIO)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderIO: <R, E>(me: ReaderIO<R, E>) => ReaderTaskEither<R, E, never> = /*#__PURE__*/ (me) =>
  flow(me, taskEither.leftIO)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => ReaderTaskEither<unknown, E, A> = readerTask.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: Reader<R, A>) => ReaderTaskEither<R, never, A> = rightReader

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => ReaderTaskEither<unknown, never, A> = rightIO

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTask: <A>(fa: Task<A>) => ReaderTaskEither<unknown, never, A> = rightTask

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => ReaderTaskEither<unknown, E, A> = /*#__PURE__*/ flow(
  taskEither.fromIOEither,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderEither: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  flow(ma, taskEither.fromEither)

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
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B | C> = /*#__PURE__*/ eitherT.match(readerTask.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchReaderTask: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => ReaderTask<R2, B>,
  onSuccess: (a: A) => ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> = /*#__PURE__*/ eitherT.matchKind(
  readerTask.Monad
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <R, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A | B> =
  /*#__PURE__*/ eitherT.getOrElse(readerTask.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseReaderTask: <E, R2, B>(
  onError: (e: E) => ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> = /*#__PURE__*/ eitherT.getOrElseKind(
  readerTask.Monad
)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTask<R, E | A> = /*#__PURE__*/ eitherT.toUnion(
  readerTask.Functor
)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 3.0.0
 */
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A> = reader.local

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, R2, E2, B>(
  onError: (e: E1) => ReaderTaskEither<R2, E2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.catchAll(
  readerTask.Monad
)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2, _>(
  onError: (e: E1) => ReaderTaskEither<R2, E2, _>
) => <R1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ eitherT.tapLeft(readerTask.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E> = /*#__PURE__*/ eitherT.swap(
  readerTask.Functor
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftIOEither =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => IOEither<E, B>
  ): ((...a: A) => ReaderTaskEither<unknown, E, B>) =>
  (...a) =>
    fromIOEither(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapIOEither: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => flatMap(liftIOEither(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTaskEither =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => TaskEither<E, B>
  ): ((...a: A) => ReaderTaskEither<unknown, E, B>) =>
  (...a) =>
    fromTaskEither(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTaskEither: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => flatMap(liftTaskEither(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderEither = <A extends ReadonlyArray<unknown>, R, E, B>(
  f: (...a: A) => ReaderEither<R, E, B>
): ((...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromReaderEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderEither: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = (f) =>
  flatMap(liftReaderEither(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderIO =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderIO<R, B>
  ): ((...a: A) => ReaderTaskEither<R, never, B>) =>
  (...a) =>
    rightReaderIO(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderIO: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) => flatMap(liftReaderIO(f))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ eitherT.map(readerTask.Functor)

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
) => <R>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> = /*#__PURE__*/ eitherT.mapBoth(
  readerTask.Functor
)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> =
  /*#__PURE__*/ eitherT.mapLeft(readerTask.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReaderTaskEither<unknown, never, A> = right

/**
 * @since 3.0.0
 */
export const unit: ReaderTaskEither<unknown, never, void> = of(undefined)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ eitherT.flatMap(readerTask.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category SemigroupK
 * @since 3.0.0
 */
export const orElse: <R2, E2, B>(
  that: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> =
  /*#__PURE__*/ eitherT.orElse(readerTask.Monad)

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
  Apply: apply.Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
): applicative.Applicative<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(reader.Apply, taskEither.getValidatedApplicative(Apply, Semigroup)),
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
): semigroupKind.SemigroupKind<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>> => {
  return {
    combineKind: eitherT.getValidatedCombineKind(readerTask.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(
  onNone: LazyArg<E>
) => <R, A>(self: ReaderTaskEither<R, E, Option<A>>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ eitherT.compact(
  readerTask.Functor
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: LazyArg<E>
) => <R, A, B>(
  self: ReaderTaskEither<R, E, Either<A, B>>
) => readonly [ReaderTaskEither<R, E, A>, ReaderTaskEither<R, E, B>] = /*#__PURE__*/ eitherT.separate(
  readerTask.Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(
  M: Monoid<E>
): Compactable<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>> => {
  return {
    compact: compact(() => M.empty),
    separate: separate(() => M.empty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(
  M: Monoid<E>
): filterable.Filterable<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>> => {
  const F = either.getFilterable(M)
  return {
    filterMap: filterable.filterMapComposition(readerTask.Functor, F),
    partitionMap: filterable.partitionMapComposition(readerTask.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderTaskEitherTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderTaskEitherTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderTaskEitherTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKind: <B, R2, E2, C>(
  bfc: (b: B) => ReaderTaskEither<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderTaskEither<R1, E1, B>) => (a: A) => ReaderTaskEither<R1 & R2, E1 | E2, C> =
  /*#__PURE__*/ flattenable.composeKind(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ComposableKind: composableKind.ComposableKind<ReaderTaskEitherTypeLambda> = {
  composeKind
}

/**
 * @since 3.0.0
 */
export const idKind: <A>() => (a: A) => ReaderTaskEither<unknown, never, A> = /*#__PURE__*/ pointed.idKind(Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: categoryKind.CategoryKind<ReaderTaskEitherTypeLambda> = {
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
export const zipLeft: <R2, E2, _>(
  that: ReaderTaskEither<R2, E2, _>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, E2, A>(
  that: ReaderTaskEither<R2, E2, A>
) => <R1, E1, _>(self: ReaderTaskEither<R1, E1, _>) => ReaderTaskEither<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(self: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E2 | E1, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderTaskEitherTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderTaskEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(
  fa: ReaderTaskEither<R1, E1, A>,
  fb: ReaderTaskEither<R2, E2, B>
) => ReaderTaskEither<R1 & R2, E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderTaskEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderTaskEither<R1, E1, A>,
  fb: ReaderTaskEither<R2, E2, B>,
  fc: ReaderTaskEither<R3, E3, C>
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderTaskEitherTypeLambda> = {
  map,
  ap,
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, R2, E2, _>(
  f: (a: A) => ReaderTaskEither<R2, E2, _>
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderTaskEitherTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<ReaderTaskEitherTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => ReaderTaskEither<unknown, never, void> =
  /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => ReaderTaskEither<unknown, never, void> =
  /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftIO: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B> = /*#__PURE__*/ fromIO_.liftIO(FromIO)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapIO: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromIO_.flatMapIO(
  FromIO,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<ReaderTaskEitherTypeLambda> = {
  fromIO,
  fromTask
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => ReaderTaskEither<unknown, never, void> =
  /*#__PURE__*/ fromTask_.sleep(FromTask)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @category combinators
 * @since 3.0.0
 */
export const delay: (duration: number) => <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ fromTask_.delay(FromTask, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTask: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B> = /*#__PURE__*/ fromTask_.liftTask(FromTask)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTask: <A, B>(
  f: (a: A) => Task<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromTask_.flatMapTask(
  FromTask,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderTaskEitherTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderTaskEither<R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderTaskEither<R, never, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderTaskEither<R, never, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReader(FromReader, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderTask =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderTask<R, B>
  ): ((...a: A) => ReaderTaskEither<R, never, B>) =>
  (...a) =>
    rightReaderTask(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderTask: <A, R2, B>(
  f: (a: A) => readerTask.ReaderTask<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) => flatMap(liftReaderTask(f))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<ReaderTaskEitherTypeLambda> = {
  fromEither
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A, R>(fa: Option<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => ReaderTaskEither<unknown, E, B> = /*#__PURE__*/ fromEither_.liftOption(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <R, E1>(self: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B> =
  /*#__PURE__*/ fromEither_.flatMapOption(FromEither, Flattenable)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> =
  /*#__PURE__*/ fromEither_.flatMapEither(FromEither, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    c: C
  ) => ReaderTaskEither<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => ReaderTaskEither<unknown, E, B>
} = /*#__PURE__*/ fromEither_.liftPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, C>
  ) => ReaderTaskEither<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <R, E1>(
    mb: ReaderTaskEither<R, E1, B>
  ) => ReaderTaskEither<R, E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromEither_.filterMap(
  FromEither,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <R>(
    self: ReaderTaskEither<R, E, C>
  ) => readonly [ReaderTaskEither<R, E, C>, ReaderTaskEither<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <R>(
    self: ReaderTaskEither<R, E, B>
  ) => readonly [ReaderTaskEither<R, E, B>, ReaderTaskEither<R, E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => <R>(self: ReaderTaskEither<R, E, A>) => readonly [ReaderTaskEither<R, E, B>, ReaderTaskEither<R, E, C>] =
  /*#__PURE__*/ fromEither_.partitionMap(FromEither, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => ReaderTaskEither<unknown, E, B> = /*#__PURE__*/ fromEither_.liftEither(FromEither)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => ReaderTaskEither<unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: LazyArg<E>
) => (...a: A) => ReaderTaskEither<unknown, E, NonNullable<B>> = /*#__PURE__*/ fromEither_.liftNullable(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: LazyArg<E2>
) => <R, E1>(self: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullable(FromEither, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderTaskEitherTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<ReaderTaskEitherTypeLambda> = {
  combineKind: orElse
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 3.0.0
 */
export const bracket: <R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderTaskEither<R1, E1, A>,
  use: (a: A) => ReaderTaskEither<R2, E2, B>,
  release: (a: A, e: Either<E2, B>) => ReaderTaskEither<R3, E3, void>
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B> = /*#__PURE__*/ eitherT.bracket(readerTask.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> = /*#__PURE__*/ of(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderTaskEither<unknown, never, readonly []> = /*#__PURE__*/ of(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, E2, B, A, C>(
  that: ReaderTaskEither<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(
    reader.traverseReadonlyNonEmptyArrayWithIndex(f),
    reader.map(taskEither.traverseReadonlyNonEmptyArrayWithIndexPar(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(
    reader.traverseReadonlyNonEmptyArrayWithIndex(f),
    reader.map(taskEither.traverseReadonlyNonEmptyArrayWithIndex(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
