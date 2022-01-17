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
import type { Alt2, Alt2C } from './Alt'
import type { Applicative2, Applicative2C } from './Applicative'
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply1,
  Apply2,
  apS as apS_,
  apSecond as apSecond_,
  apT as apT_
} from './Apply'
import type { Bifunctor2 } from './Bifunctor'
import { ap as apSeq_, bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable2C, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { filter, Filterable2C, filterMap, partition, partitionMap } from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither2,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO2, fromIOK as fromIOK_ } from './FromIO'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask2,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, Lazy, pipe, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2, tupled as tupled_ } from './Functor'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither, URI as IEURI } from './IOEither'
import type { Monad2 } from './Monad'
import type { Monoid } from './Monoid'
import { NaturalTransformation12C, NaturalTransformation22 } from './NaturalTransformation'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Pointed2 } from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as T from './Task'
import type { TaskOption, URI as TOURI } from './TaskOption'

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
export const left: <E, A = never>(e: E) => TaskEither<E, A> =
  /*#__PURE__*/
  ET.left(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskEither<E, A> =
  /*#__PURE__*/
  ET.right(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskEither<E, A> =
  /*#__PURE__*/
  ET.rightF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskEither<E, A> =
  /*#__PURE__*/
  ET.leftF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskEither<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskEither<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, leftTask)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: FromIO2<URI>['fromIO'] = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: FromTask2<URI>['fromTask'] = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: FromEither2<URI>['fromEither'] = T.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: NaturalTransformation22<IEURI, URI> = T.fromIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskOption: <E>(onNone: Lazy<E>) => NaturalTransformation12C<TOURI, URI, E> = (onNone) =>
  T.map(E.fromOption(onNone))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: TaskEither<E, A>) => Task<B> =
  /*#__PURE__*/
  ET.match(T.Functor)

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
) => (ma: TaskEither<E, A>) => Task<B> =
  /*#__PURE__*/
  ET.matchE(T.Monad)

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
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: TaskEither<E, A>) => Task<A> =
  /*#__PURE__*/
  ET.getOrElse(T.Functor)

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
export const getOrElseE: <E, A>(onLeft: (e: E) => Task<A>) => (ma: TaskEither<E, A>) => Task<A> =
  /*#__PURE__*/
  ET.getOrElseE(T.Monad)

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
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * See also [`tryCatchK`](#tryCatchK).
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
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskEither<unknown, A> => () => f().then(_.right, _.left)

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
export const toUnion: <E, A>(fa: TaskEither<E, A>) => Task<E | A> =
  /*#__PURE__*/
  ET.toUnion(T.Functor)

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
export const orElse: <E1, E2, A>(onLeft: (e: E1) => TaskEither<E2, A>) => (ma: TaskEither<E1, A>) => TaskEither<E2, A> =
  /*#__PURE__*/
  ET.orElse(T.Monad)

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
export const orElseFirst: <E, B>(onLeft: (e: E) => TaskEither<E, B>) => <A>(ma: TaskEither<E, A>) => TaskEither<E, A> =
  /*#__PURE__*/
  ET.orElseFirst(T.Monad)

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
export const orLeft: <E1, E2>(onLeft: (e: E1) => Task<E2>) => <A>(fa: TaskEither<E1, A>) => TaskEither<E2, A> =
  /*#__PURE__*/
  ET.orLeft(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: TaskEither<E, A>) => TaskEither<A, E> =
  /*#__PURE__*/
  ET.swap(T.Functor)

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
export const chainTaskOptionK = <E>(
  onNone: Lazy<E>
): (<A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>) =>
  flow(fromTaskOptionK(onNone), chain)

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
export const chainIOEitherK: <E, A, B>(
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
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  ET.map(T.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor2<URI>['bimap'] =
  /*#__PURE__*/
  ET.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  ET.mapLeft(T.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply2<URI>['ap'] =
  /*#__PURE__*/
  ET.ap(T.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <E2, A>(
  fa: TaskEither<E2, A>
) => <E1, B>(fab: TaskEither<E1, (a: A) => B>) => TaskEither<E1 | E2, B> = ap as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain2<URI>['chain'] =
  /*#__PURE__*/
  ET.chain(T.Monad)

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
export const flattenW: <E1, E2, A>(mma: TaskEither<E1, TaskEither<E2, A>>) => TaskEither<E1 | E2, A> =
  /*#__PURE__*/
  chainW(identity)

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
export const alt: Alt2<URI>['alt'] =
  /*#__PURE__*/
  ET.alt(T.Monad)

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
export type URI = 'TaskEither'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly TaskEither: TaskEither<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeTaskValidation = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E> => ({
  map,
  ap: ap_(A, E.getApplicativeValidation(S)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getAltTaskValidation = <E>(S: Semigroup<E>): Alt2C<URI, E> => {
  return {
    map,
    alt: ET.altValidation(T.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable2C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    compact: compact_(T.Functor, C),
    separate: separate_(T.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable2C<URI, E> => {
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
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply2<URI> = {
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
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative2<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain2<URI> = {
  map,
  chain
}

const apSeq =
  /*#__PURE__*/
  apSeq_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply2<URI> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative2<URI> = {
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
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

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
export const Monad: Monad2<URI> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt2<URI> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO2<URI> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask2<URI> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither2<URI> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, B> = chainEitherK as any

/**
 * Less strict version of [`chainFirstEitherK`](#chainFirstEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: TaskEither<E1, A>) => TaskEither<E1 | E2, A> = (f) => chainFirstW(fromEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: TaskEither<E, A>) => TaskEither<E, A> = chainFirstEitherKW

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain)

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
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

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
) => TaskEither<E, B> =
  /*#__PURE__*/
  ET.bracket(T.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: TaskEither<never, {}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskEither<E2, B>
) => <E1>(
  fa: TaskEither<E1, A>
) => TaskEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, E2, B>(
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
export const ApT: TaskEither<never, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(ApplyPar)

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
