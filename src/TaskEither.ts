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
import type * as alt_ from './Alt'
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as chain_ from './Chain'
import type { Compactable } from './Compactable'
import * as compactable from './Compactable'
import * as either from './Either'
import type { Either } from './Either'
import * as eitherT from './EitherT'
import type { Filterable } from './Filterable'
import * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import type { Lazy } from './function'
import { flow, identity, pipe, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
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
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => TaskEither<E, A> = /*#__PURE__*/ eitherT.left(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskEither<E, A> = /*#__PURE__*/ eitherT.right(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskEither<E, A> = /*#__PURE__*/ eitherT.rightF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskEither<E, A> = /*#__PURE__*/ eitherT.leftF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskEither<E, A> = /*#__PURE__*/ flow(task.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskEither<E, A> = /*#__PURE__*/ flow(task.fromIO, leftTask)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, E = never>(fa: IO<A>) => TaskEither<E, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, E = never>(fa: task.Task<A>) => TaskEither<E, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: either.Either<E, A>) => TaskEither<E, A> = task.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> = task.fromIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskOption: <E>(onNone: Lazy<E>) => <A>(fa: TaskOption<A>) => TaskEither<E, A> = (onNone) =>
  task.map(either.fromOption(onNone))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: TaskEither<E, A>) => Task<B | C> = /*#__PURE__*/ eitherT.match(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A, C = B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<C>
) => (ma: TaskEither<E, A>) => Task<B | C> = /*#__PURE__*/ eitherT.matchE(task.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onLeft: (e: E) => B) => <A>(ma: TaskEither<E, A>) => Task<A | B> =
  /*#__PURE__*/ eitherT.getOrElse(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, B>(onLeft: (e: E) => Task<B>) => <A>(ma: TaskEither<E, A>) => Task<A | B> =
  /*#__PURE__*/ eitherT.getOrElseE(task.Monad)

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
  <A, E>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> =>
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

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
 *
 * See also [alt](#alt).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as TE from 'fp-ts/TaskEither'
 *
 * async function test() {
 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
 * }
 *
 * test()
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E2, A | B> = /*#__PURE__*/ eitherT.orElse(task.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ eitherT.orElseFirst(task.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstIOK: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A> = (
  onLeft
) => orElseFirst(fromIOK(onLeft))

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstTaskK: <E, B>(onLeft: (e: E) => Task<B>) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A> = (
  onLeft
) => orElseFirst(fromTaskK(onLeft))

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, E2>(onLeft: (e: E1) => Task<E2>) => <A>(fa: TaskEither<E1, A>) => TaskEither<E2, A> =
  /*#__PURE__*/ eitherT.orLeft(task.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> = /*#__PURE__*/ eitherT.swap(task.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskOptionK = <E>(
  onNone: Lazy<E>
): (<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => TaskOption<B>) => (...a: A) => TaskEither<E, B>) => {
  const from = fromTaskOption(onNone)
  return (f) => flow(f, from)
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskOptionK =
  <E2>(onNone: Lazy<E2>) =>
  <A, B>(f: (a: A) => TaskOption<B>) =>
  <E1>(ma: TaskEither<E1, A>): TaskEither<E1 | E2, B> =>
    pipe(ma, chain(fromTaskOptionK<E1 | E2>(onNone)(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): ((...a: A) => TaskEither<E, B>) => flow(f, fromIOEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK = <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
): (<E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B>) => chain(fromIOEitherK(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ eitherT.map(
  task.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: TaskEither<E, A>) => TaskEither<G, B> =
  /*#__PURE__*/ eitherT.bimap(task.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: TaskEither<E, A>) => TaskEither<G, A> =
  /*#__PURE__*/ eitherT.mapLeft(task.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(fa: TaskEither<E2, A>) => <E1, B>(fab: TaskEither<E1, (a: A) => B>) => TaskEither<E1 | E2, B> =
  /*#__PURE__*/ eitherT.ap(task.ApplyPar)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ eitherT.chain(task.Monad)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A> =
  /*#__PURE__*/ chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `TaskEither` returns `first` if it is a `Right` or the value returned by `second` otherwise.
 *
 * See also [orElse](#orElse).
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
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(1)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.right(2))
 *     )(),
 *     E.right(2)
 *   )
 *   assert.deepStrictEqual(
 *     await pipe(
 *       TE.left('a'),
 *       TE.alt(() => TE.left('b'))
 *     )(),
 *     E.left('b')
 *   )
 * }
 *
 * test()
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <E2, B>(
  second: Lazy<TaskEither<E2, B>>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2, A | B> = /*#__PURE__*/ eitherT.alt(task.Monad)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => TaskEither<E, A> = right

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TaskEitherF extends HKT {
  readonly type: TaskEither<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TaskEitherFFixedE<E> extends HKT {
  readonly type: TaskEither<E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeTaskValidation = <E>(
  A: Apply<task.TaskF>,
  S: Semigroup<E>
): Applicative<TaskEitherFFixedE<E>> => ({
  map,
  ap: apply.ap(A, either.getApplicativeValidation(S)),
  of
})

/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getAltTaskValidation = <E>(S: Semigroup<E>): alt_.Alt<TaskEitherFFixedE<E>> => {
  return {
    map,
    alt: eitherT.altValidation(task.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable<TaskEitherFFixedE<E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.EitherFFixedE<E>> = { map: either.map }
  return {
    compact: compactable.compact(task.Functor, C),
    separate: compactable.separate(task.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable<TaskEitherFFixedE<E>> => {
  const F = either.getFilterable(M)
  return {
    filterMap: filterable.filterMap(task.Functor, F),
    partitionMap: filterable.partitionMap(task.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TaskEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply<TaskEitherF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ apply.apFirst(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ apply.apSecond(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative<TaskEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: chain_.Chain<TaskEitherF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ chain_.ap(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply<TaskEitherF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative<TaskEitherF> = {
  map,
  ap: apSeq,
  of
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = /*#__PURE__*/ chain_.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskEitherF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TaskEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt_.Alt<TaskEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <E = never>(...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromIO_.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromIO_.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<TaskEitherF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => <E = never>(...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(f: (a: A) => task.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromTask_.chainTaskK(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(f: (a: A) => task.Task<B>) => <E>(first: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromTask_.chainFirstTaskK(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskEither<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => TaskEither<E, B> =
  /*#__PURE__*/ fromEither_.fromOptionKOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B> =
  /*#__PURE__*/ fromEither_.chainOptionKOrElse(FromEither, Chain)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => (b: B) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => (c: C) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.fromRefinementOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <E1>(mb: TaskEither<E1, B>) => TaskEither<E2 | E1, B> = /*#__PURE__*/ fromEither_.filterOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <E1>(ma: TaskEither<E1, C>) => TaskEither<E2 | E1, B> = /*#__PURE__*/ fromEither_.refineOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ fromEither_.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = (f) => chainFirst(fromEitherK(f))

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse: <E>(onNullable: Lazy<E>) => <A>(a: A) => TaskEither<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableKOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskEither<E, A>) => TaskEither<E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.chainNullableKOrElse(FromEither, Chain)

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
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: TaskEither<never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ chain_.bind(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(fa: TaskEither<E1, A>) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: TaskEither<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(fa: TaskEither<E, A>) => TaskEither<E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <E2, B>(
  fb: TaskEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(fas: TaskEither<E1, A>) => TaskEither<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.apT(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndex(f), task.map(either.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq =
  <A, E, B>(f: (index: number, a: A) => TaskEither<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskEither<E, ReadonlyNonEmptyArray<B>> =>
  () =>
    _.tail(as).reduce<Promise<Either<E, NonEmptyArray<B>>>>(
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, E, B>(
  f: (a: A) => TaskEither<E, B>
): ((as: ReadonlyArray<A>) => TaskEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <E, A>(arr: ReadonlyArray<TaskEither<E, A>>) => TaskEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArraySeq(identity)
