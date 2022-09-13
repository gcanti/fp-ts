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
import type { Alt as Alt_ } from './Alt'
import type { Applicative } from './Applicative'
import { ap as ap_, apFirst as apFirst_, Apply, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import type { Bifunctor as Bifunctor_ } from './Bifunctor'
import { ap as apSeq_, bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { filter, Filterable, filterMap, partition, partitionMap } from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither as FromEither_,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask as FromTask_,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, Lazy, pipe, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type { Monad as Monad_ } from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as T from './Task'
import type { TaskOption } from './TaskOption'

import Either = E.Either
import Task = T.Task

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
export const left: <E, A = never>(e: E) => TaskEither<E, A> = /*#__PURE__*/ ET.left(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskEither<E, A> = /*#__PURE__*/ ET.right(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskEither<E, A> = /*#__PURE__*/ ET.rightF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskEither<E, A> = /*#__PURE__*/ ET.leftF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskEither<E, A> = /*#__PURE__*/ flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskEither<E, A> = /*#__PURE__*/ flow(T.fromIO, leftTask)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, E>(fa: IO<A>) => TaskEither<E, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, E>(fa: T.Task<A>) => TaskEither<E, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: E.Either<E, A>) => TaskEither<E, A> = T.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskEither<E, A> = T.fromIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskOption: <E>(onNone: Lazy<E>) => <A>(fa: TaskOption<A>) => TaskEither<E, A> = (onNone) =>
  T.map(E.fromOption(onNone))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (ma: TaskEither<E, A>) => Task<B> = /*#__PURE__*/ ET.match(T.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: TaskEither<E, A>) => Task<B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>
) => (ma: TaskEither<E, A>) => Task<B> = /*#__PURE__*/ ET.matchE(T.Monad)

/**
 * Less strict version of [`matchE`](#matchE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchEW: <E, B, A, C>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<C>
) => (ma: TaskEither<E, A>) => Task<B | C> = matchE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: TaskEither<E, A>) => Task<A> = /*#__PURE__*/ ET.getOrElse(
  T.Functor
)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: TaskEither<E, A>) => Task<A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, A>(
  onLeft: (e: E) => Task<A>
) => (ma: TaskEither<E, A>) => Task<A> = /*#__PURE__*/ ET.getOrElseE(T.Monad)

/**
 * Less strict version of [`getOrElseE`](#getOrElseE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseEW: <E, B>(
  onLeft: (e: E) => Task<B>
) => <A>(ma: TaskEither<E, A>) => Task<A | B> = getOrElseE as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { left, right } from 'fp-ts/Either'
 * import { tryCatch } from 'fp-ts/TaskEither'
 *
 * tryCatch(() => Promise.resolve(1))().then(result => {
 *   assert.deepStrictEqual(result, right(1))
 * })
 * tryCatch(() => Promise.reject('error'))().then(result => {
 *   assert.deepStrictEqual(result, left('error'))
 * })
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskEither<unknown, A> => async () => {
  try {
    return await f().then(_.right)
  } catch (reason) {
    return _.left(reason)
  }
}

/**
 * Converts a function returning a `Promise` that may reject to one returning a `TaskEither`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Promise<B>,
  onRejected: (error: unknown) => E
): ((...a: A) => TaskEither<E, B>) => (...a) =>
  pipe(
    tryCatch(() => f(...a)),
    mapLeft(onRejected)
  )

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: TaskEither<E, A>) => Task<E | A> = /*#__PURE__*/ ET.toUnion(T.Functor)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(e: E) => <A>(a: A) => TaskEither<E, NonNullable<A>> = /*#__PURE__*/ ET.fromNullable(
  T.Pointed
)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskEither<E, NonNullable<B>> = /*#__PURE__*/ ET.fromNullableK(T.Pointed)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK: <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskEither<E, A>) => TaskEither<E, NonNullable<B>> = /*#__PURE__*/ ET.chainNullableK(T.Monad)

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
export const orElse: <E1, E2, A>(
  onLeft: (e: E1) => TaskEither<E2, A>
) => (ma: TaskEither<E1, A>) => TaskEither<E2, A> = /*#__PURE__*/ ET.orElse(T.Monad)

/**
 * Less strict version of [`orElse`](#orElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E, B>(
  onLeft: (e: E) => TaskEither<E, B>
) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ ET.orElseFirst(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => TaskEither<E2, B>
) => <A>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = orElseFirst as any

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
export const orLeft: <E1, E2>(
  onLeft: (e: E1) => Task<E2>
) => <A>(fa: TaskEither<E1, A>) => TaskEither<E2, A> = /*#__PURE__*/ ET.orLeft(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> = /*#__PURE__*/ ET.swap(T.Functor)

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
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskOptionKW = <E2>(onNone: Lazy<E2>) => <A, B>(f: (a: A) => TaskOption<B>) => <E1>(
  ma: TaskEither<E1, A>
): TaskEither<E1 | E2, B> => pipe(ma, chain(fromTaskOptionK<E1 | E2>(onNone)(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B> = chainTaskOptionKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): ((...a: A) => TaskEither<E, B>) => flow(f, fromIOEither)

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherKW = <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
): (<E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B>) => chainW(fromIOEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B> = chainIOEitherKW

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ ET.map(
  T.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fea: TaskEither<E, A>) => TaskEither<G, B> = /*#__PURE__*/ ET.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <A>(fea: TaskEither<E, A>) => TaskEither<G, A> = /*#__PURE__*/ ET.mapLeft(T.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(fab: TaskEither<E1, (a: A) => B>) => TaskEither<E1 | E2, B> = /*#__PURE__*/ ET.ap(T.ApplyPar)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ ET.chain(T.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <E1, E2, A>(
  mma: TaskEither<E1, TaskEither<E2, A>>
) => TaskEither<E1 | E2, A> = /*#__PURE__*/ chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E, A>(mma: TaskEither<E, TaskEither<E, A>>) => TaskEither<E, A> = flattenW

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
export const alt: <E, A>(
  second: Lazy<TaskEither<E, A>>
) => (first: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ ET.alt(T.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <E2, B>(
  second: Lazy<TaskEither<E2, B>>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E2, A | B> = alt as any

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => TaskEither<E, A> = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface TaskEitherF extends HKT {
  readonly type: TaskEither<this['Covariant2'], this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface TaskEitherFE<E> extends HKT {
  readonly type: TaskEither<E, this['Covariant1']>
}

/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeTaskValidation = <E>(A: Apply<T.TaskF>, S: Semigroup<E>): Applicative<TaskEitherFE<E>> => ({
  map,
  ap: ap_(A, E.getApplicativeValidation(S)),
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
export const getAltTaskValidation = <E>(S: Semigroup<E>): Alt_<TaskEitherFE<E>> => {
  return {
    map,
    alt: ET.altValidation(T.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable<TaskEitherFE<E>> => {
  const C = E.getCompactable(M)
  const F: Functor_<E.EitherFE<E>> = { map: E.map }
  return {
    compact: compact_(T.Functor, C),
    separate: separate_(T.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable<TaskEitherFE<E>> => {
  const F = E.getFilterable(M)
  return {
    filter: filter(T.Functor, F),
    filterMap: filterMap(T.Functor, F),
    partition: partition(T.Functor, F),
    partitionMap: partitionMap(T.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<TaskEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B> = /*#__PURE__*/ flap_(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<TaskEitherF> = {
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
export const apFirst: <E, B>(
  second: TaskEither<E, B>
) => <A>(first: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ apFirst_(ApplyPar)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirstW: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E, B>(
  second: TaskEither<E, B>
) => <A>(first: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ apSecond_(ApplyPar)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecondW: <E2, B>(
  second: TaskEither<E2, B>
) => <E1, A>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = apSecond as any

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
export const Chain: Chain_<TaskEitherF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ apSeq_(Chain)

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
export const chainFirst: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => (first: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <E1>(first: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<TaskEitherF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<TaskEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<TaskEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<TaskEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <E>(...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_<TaskEitherF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => T.Task<B>
) => <E>(...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(
  f: (a: A) => T.Task<B>
) => <E>(first: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(
  f: (a: A) => T.Task<B>
) => <E>(first: TaskEither<E, A>) => TaskEither<E, A> = /*#__PURE__*/ chainFirstTaskK_(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither_<TaskEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskEither<E, A> = /*#__PURE__*/ fromOption_(
  FromEither
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ chainOptionK_(
  FromEither,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, B> = /*#__PURE__*/ chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = chainEitherK as any

/**
 * Less strict version of [`chainFirstEitherK`](#chainFirstEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = (f) => chainFirstW(fromEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, A> = chainFirstEitherKW

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => TaskEither<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => TaskEither<B, B>
  <A>(predicate: Predicate<A>): (a: A) => TaskEither<A, A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: TaskEither<E, B>) => TaskEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: TaskEither<E, A>) => TaskEither<E, A>
} = /*#__PURE__*/ filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: TaskEither<E1, A>
  ) => TaskEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: TaskEither<E1, B>
  ) => TaskEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => TaskEither<E, B> = /*#__PURE__*/ fromEitherK_(FromEither)

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
export const bracket: <E, A, B>(
  acquire: TaskEither<E, A>,
  use: (a: A) => TaskEither<E, B>,
  release: (a: A, e: Either<E, B>) => TaskEither<E, void>
) => TaskEither<E, B> = /*#__PURE__*/ ET.bracket(T.Monad)

/**
 * Less strict version of [`bracket`](#bracket).
 *
 * @since 3.0.0
 */
export const bracketW: <E1, A, E2, B, E3>(
  acquire: TaskEither<E1, A>,
  use: (a: A) => TaskEither<E2, B>,
  release: (a: A, e: E.Either<E2, B>) => TaskEither<E3, void>
) => TaskEither<E1 | E2 | E3, B> = bracket as any

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
) => <E, A>(fa: TaskEither<E, A>) => TaskEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => TaskEither<E, B>
) => (
  ma: TaskEither<E, A>
) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => TaskEither<E2, B>
) => <E1>(
  fa: TaskEither<E1, A>
) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E, B>
) => (
  fa: TaskEither<E, A>
) => TaskEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: TaskEither<E2, B>
) => <E1>(
  fa: TaskEither<E1, A>
) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

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
export const tupled: <E, A>(fa: TaskEither<E, A>) => TaskEither<E, readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <E, B>(
  fb: TaskEither<E, B>
) => <A extends ReadonlyArray<unknown>>(
  fas: TaskEither<E, A>
) => TaskEither<E, readonly [...A, B]> = /*#__PURE__*/ apT_(ApplyPar)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <E2, B>(
  fb: TaskEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(
  fas: TaskEither<E1, A>
) => TaskEither<E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => TaskEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskEither<E, ReadonlyNonEmptyArray<B>>) =>
  flow(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E.traverseReadonlyNonEmptyArrayWithIndex(SK)))

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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, E, B>(f: (index: number, a: A) => TaskEither<E, B>) => (
  as: ReadonlyNonEmptyArray<A>
): TaskEither<E, ReadonlyNonEmptyArray<B>> => () =>
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
    f(0, _.head(as))().then(E.map(_.singleton))
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
