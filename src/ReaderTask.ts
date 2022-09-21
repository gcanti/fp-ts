/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as chainable from './Chainable'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import * as fromTask_ from './FromTask'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type * as monad from './Monad'
import type * as pointed from './Pointed'
import * as reader from './Reader'
import type { ReaderIO } from './ReaderIO'
import * as readerT from './ReaderT'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import * as task from './Task'
import type { Task } from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTask: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A> = reader.asksReader

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderTask<R, A> = /*#__PURE__*/ readerT.fromReader(
  task.Pointed
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, R = unknown>(fa: Task<A>) => ReaderTask<R, A> = /*#__PURE__*/ reader.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, R = unknown>(fa: IO<A>) => ReaderTask<R, A> = /*#__PURE__*/ flow(task.fromIO, fromTask)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReaderIO: <R, A>(fa: ReaderIO<R, A>) => ReaderTask<R, A> = reader.map(task.fromIO)

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
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A> = reader.local

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> = /*#__PURE__*/ readerT.map(
  task.Functor
)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, A>(fa: ReaderTask<R2, A>) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B> =
  /*#__PURE__*/ readerT.ap(task.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown>(a: A) => ReaderTask<R, A> = /*#__PURE__*/ readerT.of(task.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chainable
 * @since 3.0.0
 */
export const chain: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = /*#__PURE__*/ readerT.chain(task.Monad)

/**
 * Derivable from `Chainable`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A> =
  /*#__PURE__*/ chain(identity)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderIOK =
  <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => ReaderIO<R, B>): ((...a: A) => ReaderTask<R, B>) =>
  (...a) =>
    fromReaderIO(f(...a))

/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = (f) => chain(fromReaderIOK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderIOK: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  chainReaderIOKW

/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = (f) => chainFirst(fromReaderIOK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderIOK: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> =
  chainFirstReaderIOKW

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderTaskF extends HKT {
  readonly type: ReaderTask<this['Contravariant1'], this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderTaskF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderTaskF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply<ReaderTaskF> = {
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
export const apFirst: <R, B>(second: ReaderTask<R, B>) => <A>(first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ apply.apFirst(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <R, B>(second: ReaderTask<R, B>) => <A>(first: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ apply.apSecond(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<ReaderTaskF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: chainable.Chainable<ReaderTaskF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ chainable.ap(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply<ReaderTaskF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: applicative.Applicative<ReaderTaskF> = {
  map,
  ap: apSeq,
  of
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chainable`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = /*#__PURE__*/ chainable.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderTaskF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<ReaderTaskF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ fromIO_.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ fromIO_.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderTaskF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderTask<R, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderTask`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderTask<R, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = /*#__PURE__*/ fromReader_.chainReaderK(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = /*#__PURE__*/ fromReader_.chainFirstReaderK(
  FromReader,
  Chain
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<ReaderTaskF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(f: (a: A) => task.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ fromTask_.chainTaskK(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(f: (a: A) => task.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ fromTask_.chainFirstTaskK(FromTask, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderTask<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ chainable.bind(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTask<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(fas: ReaderTask<R1, A>) => ReaderTask<R1 & R2, readonly [...A, B]> =
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
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(reader.traverseReadonlyNonEmptyArrayWithIndex(f), reader.map(task.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(reader.traverseReadonlyNonEmptyArrayWithIndex(f), reader.map(task.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArraySeq(identity)
