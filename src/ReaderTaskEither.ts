/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import type { Apply } from './Apply'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import * as either from './Either'
import type { Either } from './Either'
import * as eitherT from './EitherT'
import * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
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
export interface ReaderTaskEitherλ extends TypeLambda {
  readonly type: ReaderTaskEither<this['In1'], this['Out2'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
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
  /*#__PURE__*/ eitherT.rightF(readerTask.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderTask: <R, E>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, never> =
  /*#__PURE__*/ eitherT.leftF(readerTask.Functor)

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

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => ReaderTaskEither<unknown, E, A> = readerTask.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: Reader<R, A>) => ReaderTaskEither<R, never, A> = rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => ReaderTaskEither<unknown, never, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A>(fa: Task<A>) => ReaderTaskEither<unknown, never, A> = rightTask

/**
 * @category natural transformations
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
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B | C> = /*#__PURE__*/ eitherT.match(readerTask.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchWithEffect: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => ReaderTask<R2, B>,
  onSuccess: (a: A) => ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> = /*#__PURE__*/ eitherT.matchWithEffect(
  readerTask.Monad
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <R, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A | B> =
  /*#__PURE__*/ eitherT.getOrElse(readerTask.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseWithEffect: <E, R2, B>(
  onError: (e: E) => ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> = /*#__PURE__*/ eitherT.getOrElseWithEffect(
  readerTask.Monad
)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

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
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, R2, E2, B>(
  onError: (e: E1) => ReaderTaskEither<R2, E2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.orElse(
  readerTask.Monad
)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinatorsError
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
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => IOEither<E, B>
  ): ((...a: A) => ReaderTaskEither<unknown, E, B>) =>
  (...a) =>
    fromIOEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => flatMap(fromIOEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => TaskEither<E, B>
  ): ((...a: A) => ReaderTaskEither<unknown, E, B>) =>
  (...a) =>
    fromTaskEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskEitherK: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => flatMap(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderEitherK = <A extends ReadonlyArray<unknown>, R, E, B>(
  f: (...a: A) => ReaderEither<R, E, B>
): ((...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromReaderEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = (f) =>
  flatMap(fromReaderEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderIOK =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderIO<R, B>
  ): ((...a: A) => ReaderTaskEither<R, never, B>) =>
  (...a) =>
    rightReaderIO(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderIOK: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) => flatMap(fromReaderIOK(f))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ eitherT.map(readerTask.Functor)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category Bifunctor
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
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> =
  /*#__PURE__*/ eitherT.mapLeft(readerTask.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ eitherT.ap(readerTask.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReaderTaskEither<unknown, never, A> = right

/**
 * @since 3.0.0
 */
export const unit: ReaderTaskEither<unknown, never, void> = of(undefined)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ eitherT.flatMap(
  readerTask.Monad
)

/**
 * Derivable from `Flattenable`.
 *
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
export const combineK: <R2, E2, B>(
  second: LazyArg<ReaderTaskEither<R2, E2, B>>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> =
  /*#__PURE__*/ eitherT.combineK(readerTask.Monad)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * See [`getValidatedApplicative`](./Either.ts.html#getvalidatedapplicative).
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  A: apply.Apply<task.Taskλ>,
  S: Semigroup<E>
): applicative.Applicative<either.Validatedλ<ReaderTaskEitherλ, E>> => ({
  map,
  ap: apply.getApComposition(reader.Apply, taskEither.getValidatedApplicative(A, S)),
  of
})

/**
 * The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedSemigroupK = <E>(
  S: Semigroup<E>
): semigroupK.SemigroupK<either.Validatedλ<ReaderTaskEitherλ, E>> => {
  return {
    combineK: eitherT.getValidatedCombineK(readerTask.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): compactable.Compactable<either.Validatedλ<ReaderTaskEitherλ, E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.Validatedλ<either.Eitherλ, E>> = { map: either.map }
  return {
    compact: compactable.getCompactComposition(readerTask.Functor, C),
    separate: compactable.getSeparateComposition(readerTask.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): filterable.Filterable<either.Validatedλ<ReaderTaskEitherλ, E>> => {
  const F = either.getFilterable(M)
  return {
    filterMap: filterable.getFilterMapComposition(readerTask.Functor, F),
    partitionMap: filterable.getPartitionMapComposition(readerTask.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderTaskEitherλ> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderTaskEitherλ> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply<ReaderTaskEitherλ> = {
  map,
  ap
}

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ apply.zipLeftPar(ApplyPar)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ apply.zipRightPar(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<ReaderTaskEitherλ> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderTaskEitherλ> = {
  map,
  flatMap
}

const apSeq = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply<ReaderTaskEitherλ> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: applicative.Applicative<ReaderTaskEitherλ> = {
  map,
  ap: apSeq,
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
export const Monad: monad.Monad<ReaderTaskEitherλ> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<ReaderTaskEitherλ> = {
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
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromIO_.flatMapIOK(
  FromIO,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<ReaderTaskEitherλ> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskK: <A, B>(
  f: (a: A) => task.Task<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromTask_.flatMapTaskK(
  FromTask,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderTaskEitherλ> = {
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
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderTaskEither<R, never, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReaderK(FromReader, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderTaskK =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderTask<R, B>
  ): ((...a: A) => ReaderTaskEither<R, never, B>) =>
  (...a) =>
    rightReaderTask(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderTaskK: <A, R2, B>(
  f: (a: A) => readerTask.ReaderTask<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) => flatMap(fromReaderTaskK(f))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<ReaderTaskEitherλ> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A, R>(fa: Option<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => ReaderTaskEither<unknown, E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ fromEither_.flatMapOptionK(
  FromEither,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> =
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flattenable)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    c: C
  ) => ReaderTaskEither<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => ReaderTaskEither<unknown, E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

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
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => ReaderTaskEither<unknown, E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => ReaderTaskEither<unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => ReaderTaskEither<unknown, E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullableK(FromEither, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderTaskEitherλ> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<ReaderTaskEitherλ> = {
  combineK
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
 * @since 3.0.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTaskEither<unknown, never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.apT(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(
    reader.traverseReadonlyNonEmptyArrayWithIndex(f),
    reader.map(taskEither.traverseReadonlyNonEmptyArrayWithIndexSeq(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArraySeq(identity)
