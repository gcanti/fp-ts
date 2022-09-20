/**
 * @since 3.0.0
 */
import * as AltModule from './Alt'
import * as ApplicativeModule from './Applicative'
import * as ApplyModule from './Apply'
import * as BifunctorModule from './Bifunctor'
import * as ChainModule from './Chain'
import * as CompactableModule from './Compactable'
import * as EitherModule from './Either'
import * as EitherTModule from './EitherT'
import * as FilterableModule from './Filterable'
import * as FromEitherModule from './FromEither'
import * as FromIOModule from './FromIO'
import * as FromReaderModule from './FromReader'
import * as FromTaskModule from './FromTask'
import { flow, identity, Lazy, SK } from './function'
import * as FunctorModule from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import * as MonadModule from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import * as PointedModule from './Pointed'
import type { Predicate } from './Predicate'
import * as ReaderModule from './Reader'
import type { ReaderEither } from './ReaderEither'
import * as ReaderIOModule from './ReaderIO'
import * as ReaderTaskModule from './ReaderTask'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as TaskModule from './Task'
import * as TaskEitherModule from './TaskEither'

import Either = EitherModule.Either
import Reader = ReaderModule.Reader
import ReaderIO = ReaderIOModule.ReaderIO
import ReaderTask = ReaderTaskModule.ReaderTask
import Task = TaskModule.Task
import TaskEither = TaskEitherModule.TaskEither

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
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: <E, A, R = unknown>(fa: TaskEitherModule.TaskEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ ReaderModule.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, R = unknown, A = never>(e: E) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ EitherTModule.left(
  ReaderTaskModule.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R = unknown, E = never>(a: A) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ EitherTModule.right(
  ReaderTaskModule.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, R = unknown, E = never>(ma: Task<A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ flow(
  TaskEitherModule.rightTask,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, R = unknown, A = never>(me: Task<E>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ flow(
  TaskEitherModule.leftTask,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  flow(ma, TaskEitherModule.right)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(me: Reader<R, E>) => ReaderTaskEither<R, E, A> = (me) =>
  flow(me, TaskEitherModule.left)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderTask: <R, A, E = never>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ EitherTModule.rightF(ReaderTaskModule.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderTask: <R, E, A = never>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ EitherTModule.leftF(ReaderTaskModule.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, R = unknown, E = never>(ma: IO<A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ flow(
  TaskEitherModule.rightIO,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, R = unknown, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ flow(
  TaskEitherModule.leftIO,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A> = ReaderModule.asksReader

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderIO: <R, A, E = never>(ma: ReaderIO<R, A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ (ma) =>
  flow(ma, TaskEitherModule.rightIO)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderIO: <R, E, A = never>(me: ReaderIO<R, E>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ (me) =>
  flow(me, TaskEitherModule.leftIO)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A, R = unknown>(fa: Either<E, A>) => ReaderTaskEither<R, E, A> = ReaderTaskModule.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A, E = never>(fa: Reader<R, A>) => ReaderTaskEither<R, E, A> = rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, R = unknown, E = never>(fa: IO<A>) => ReaderTaskEither<R, E, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, R = unknown, E = never>(fa: Task<A>) => ReaderTaskEither<R, E, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A, R = unknown>(fa: IOEither<E, A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ flow(
  TaskEitherModule.fromIOEither,
  fromTaskEither
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderEither: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  flow(ma, TaskEitherModule.fromEither)

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
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B | C> = /*#__PURE__*/ EitherTModule.match(
  ReaderTaskModule.Functor
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, R2, B, A, R3, C = B>(
  onLeft: (e: E) => ReaderTask<R2, B>,
  onRight: (a: A) => ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> = /*#__PURE__*/ EitherTModule.matchE(
  ReaderTaskModule.Monad
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onLeft: (e: E) => B) => <R, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A | B> =
  /*#__PURE__*/ EitherTModule.getOrElse(ReaderTaskModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, R2, B>(
  onLeft: (e: E) => ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> = /*#__PURE__*/ EitherTModule.getOrElseE(
  ReaderTaskModule.Monad
)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTask<R, E | A> =
  /*#__PURE__*/ EitherTModule.toUnion(ReaderTaskModule.Functor)

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
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A> = ReaderModule.local

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> =
  /*#__PURE__*/ EitherTModule.orElse(ReaderTaskModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ EitherTModule.orElseFirst(ReaderTaskModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => ReaderTask<R, E2>
) => <A>(fa: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A> = /*#__PURE__*/ EitherTModule.orLeft(
  ReaderTaskModule.Monad
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E> =
  /*#__PURE__*/ EitherTModule.swap(ReaderTaskModule.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => IOEither<E, B>
  ): (<R = unknown>(...a: A) => ReaderTaskEither<R, E, B>) =>
  (...a) =>
    fromIOEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chain(fromIOEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => TaskEither<E, B>
  ): (<R = unknown>(...a: A) => ReaderTaskEither<R, E, B>) =>
  (...a) =>
    fromTaskEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chain(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskEitherK: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, A> = (f) => chainFirst(fromTaskEitherK(f))

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
export const chainReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = (f) =>
  chain(fromReaderEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> = (f) =>
  chainFirst(fromReaderEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderIOK =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderIO<R, B>
  ): (<E = never>(...a: A) => ReaderTaskEither<R, E, B>) =>
  (...a) =>
    rightReaderIO(f(...a))

/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) => chain(fromReaderIOK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainReaderIOKW

/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A> = (f) => chainFirst(fromReaderIOK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = chainFirstReaderIOKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ EitherTModule.map(ReaderTaskModule.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> = /*#__PURE__*/ EitherTModule.bimap(
  ReaderTaskModule.Functor
)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> =
  /*#__PURE__*/ EitherTModule.mapLeft(ReaderTaskModule.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ EitherTModule.ap(ReaderTaskModule.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown, E = never>(a: A) => ReaderTaskEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ EitherTModule.chain(ReaderTaskModule.Monad)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <R2, E2, B>(
  second: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> =
  /*#__PURE__*/ EitherTModule.alt(ReaderTaskModule.Monad)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderTaskEitherF extends HKT {
  readonly type: ReaderTaskEither<this['Contravariant1'], this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderTaskEitherFFixedE<E> extends HKT {
  readonly type: ReaderTaskEither<this['Contravariant1'], E, this['Covariant1']>
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
export const getApplicativeReaderTaskValidation = <E>(
  A: ApplyModule.Apply<TaskModule.TaskF>,
  S: Semigroup<E>
): ApplicativeModule.Applicative<ReaderTaskEitherFFixedE<E>> => ({
  map,
  ap: ApplyModule.ap(ReaderModule.Apply, TaskEitherModule.getApplicativeTaskValidation(A, S)),
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
export const getAltReaderTaskValidation = <E>(S: Semigroup<E>): AltModule.Alt<ReaderTaskEitherFFixedE<E>> => {
  return {
    map,
    alt: EitherTModule.altValidation(ReaderTaskModule.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): CompactableModule.Compactable<ReaderTaskEitherFFixedE<E>> => {
  const C = EitherModule.getCompactable(M)
  const F: FunctorModule.Functor<EitherModule.EitherFFixedE<E>> = { map: EitherModule.map }
  return {
    compact: CompactableModule.compact(ReaderTaskModule.Functor, C),
    separate: CompactableModule.separate(ReaderTaskModule.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): FilterableModule.Filterable<ReaderTaskEitherFFixedE<E>> => {
  const F = EitherModule.getFilterable(M)
  return {
    filterMap: FilterableModule.filterMap(ReaderTaskModule.Functor, F),
    partitionMap: FilterableModule.partitionMap(ReaderTaskModule.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: FunctorModule.Functor<ReaderTaskEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ FunctorModule.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: PointedModule.Pointed<ReaderTaskEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: ApplyModule.Apply<ReaderTaskEitherF> = {
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
export const apFirst: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ ApplyModule.apFirst(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ ApplyModule.apSecond(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: ApplicativeModule.Applicative<ReaderTaskEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: ChainModule.Chain<ReaderTaskEitherF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ ChainModule.ap(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: ApplyModule.Apply<ReaderTaskEitherF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: ApplicativeModule.Applicative<ReaderTaskEitherF> = {
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
export const chainFirst: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ ChainModule.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: MonadModule.Monad<ReaderTaskEitherF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIOModule.FromIO<ReaderTaskEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromIOModule.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromIOModule.chainIOK(
  FromIO,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ FromIOModule.chainFirstIOK(
  FromIO,
  Chain
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTaskModule.FromTask<ReaderTaskEitherF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskModule.Task<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromTaskModule.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(
  f: (a: A) => TaskModule.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromTaskModule.chainTaskK(
  FromTask,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(
  f: (a: A) => TaskModule.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ FromTaskModule.chainFirstTaskK(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReaderModule.FromReader<ReaderTaskEitherF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> = /*#__PURE__*/ FromReaderModule.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ FromReaderModule.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => ReaderModule.Reader<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromReaderModule.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R2, B>(
  f: (a: A) => ReaderModule.Reader<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> =
  /*#__PURE__*/ FromReaderModule.chainReaderK(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => ReaderModule.Reader<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A> =
  /*#__PURE__*/ FromReaderModule.chainFirstReaderK(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderTaskK =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderTask<R, B>
  ): (<E = never>(...a: A) => ReaderTaskEither<R, E, B>) =>
  (...a) =>
    rightReaderTask(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderTaskK: <A, R2, B>(
  f: (a: A) => ReaderTaskModule.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) =>
  chain(fromReaderTaskK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderTaskK: <A, R2, B>(
  f: (a: A) => ReaderTaskModule.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A> = (f) =>
  chainFirst(fromReaderTaskK(f))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<ReaderTaskEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A, R>(fa: Option<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ FromEitherModule.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ FromEitherModule.fromOptionKOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/ FromEitherModule.chainOptionKOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> =
  /*#__PURE__*/ FromEitherModule.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, A> = (f) => chainFirst(fromEitherK(f))

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <R = unknown>(b: B) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromEitherModule.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <R = unknown>(c: C) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromEitherModule.fromRefinementOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <R, E1>(mb: ReaderTaskEither<R, E1, B>) => ReaderTaskEither<R, E2 | E1, B> =
  /*#__PURE__*/ FromEitherModule.filterOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <R, E1>(ma: ReaderTaskEither<R, E1, C>) => ReaderTaskEither<R, E2 | E1, B> =
  /*#__PURE__*/ FromEitherModule.refineOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => EitherModule.Either<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B> = /*#__PURE__*/ FromEitherModule.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse: <E>(
  onNullable: Lazy<E>
) => <A, R = unknown>(a: A) => ReaderTaskEither<R, E, NonNullable<A>> =
  /*#__PURE__*/ FromEitherModule.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, NonNullable<B>> =
  /*#__PURE__*/ FromEitherModule.fromNullableKOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, NonNullable<B>> =
  /*#__PURE__*/ FromEitherModule.chainNullableKOrElse(FromEither, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: BifunctorModule.Bifunctor<ReaderTaskEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: AltModule.Alt<ReaderTaskEitherF> = {
  map,
  alt
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
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B> = /*#__PURE__*/ EitherTModule.bracket(ReaderTaskModule.Monad)

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
  /*#__PURE__*/ FunctorModule.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ FunctorModule.let(Functor)

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
  /*#__PURE__*/ ChainModule.bind(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ ApplyModule.apS(ApplyPar)

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
  /*#__PURE__*/ FunctorModule.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ ApplyModule.apT(ApplyPar)

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
    ReaderModule.traverseReadonlyNonEmptyArrayWithIndex(f),
    ReaderModule.map(TaskEitherModule.traverseReadonlyNonEmptyArrayWithIndex(SK))
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
    ReaderModule.traverseReadonlyNonEmptyArrayWithIndex(f),
    ReaderModule.map(TaskEitherModule.traverseReadonlyNonEmptyArrayWithIndexSeq(SK))
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
