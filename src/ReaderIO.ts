/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import * as I from './IO'
import type * as monad from './Monad'
import type * as pointed from './Pointed'
import * as reader from './Reader'
import * as readerT from './ReaderT'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

/**
 * @category model
 * @since 3.0.0
 */

export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderIO<R, A> = /*#__PURE__*/ readerT.fromReader(I.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(fa: I.IO<A>) => ReaderIO<unknown, A> = /*#__PURE__*/ reader.of

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
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A> = reader.local

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 3.0.0
 */
export const asksReaderIO: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A> = reader.asksReader

/**
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B> = /*#__PURE__*/ readerT.map(
  I.Functor
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, R2, B>(f: (a: A) => ReaderIO<R2, B>) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> =
  /*#__PURE__*/ readerT.flatMap(I.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderIOTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <R2, _>(that: ReaderIO<R2, _>) => <R1, A>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <R2, A>(that: ReaderIO<R2, A>) => <R1, _>(self: ReaderIO<R1, _>) => ReaderIO<R1 & R2, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <R2, A>(fa: ReaderIO<R2, A>) => <R1, B>(self: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReaderIO<unknown, A> = /*#__PURE__*/ readerT.of(I.Pointed)

/**
 * @since 3.0.0
 */
export const unit: ReaderIO<unknown, void> = of(undefined)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A> =
  /*#__PURE__*/ flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderIOTypeLambda extends TypeLambda {
  readonly type: ReaderIO<this['In1'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderIOTypeLambda> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderIOTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderIOTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderIO`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>) => ReaderIO<R1 & R2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderIO`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>, fc: ReaderIO<R3, C>) => ReaderIO<R1 & R2 & R3, D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderIOTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderIOTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, R2, _>(f: (a: A) => ReaderIO<R2, _>) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<ReaderIOTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void> =
  /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => I.IO<B>
) => (...a: A) => ReaderIO<unknown, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => I.IO<B>) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderIOTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderIO<R, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderIO`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderIO<R, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> = /*#__PURE__*/ fromReader_.flatMapReaderK(
  FromReader,
  Flattenable
)

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: ReaderIO<unknown, {}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const DoTuple: ReaderIO<unknown, readonly []> = /*#__PURE__*/ of(_.DoTuple)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const bindTupleRight: <R2, B>(
  fb: ReaderIO<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, readonly [...A, B]> =
  /*#__PURE__*/ apply.bindTupleRight(Apply)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const bindTuple: <A extends ReadonlyArray<unknown>, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, readonly [...A, B]> = /*#__PURE__*/ flattenable.bindT(Flattenable)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>) =>
  flow(reader.traverseReadonlyNonEmptyArrayWithIndex(f), reader.map(I.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : DoTuple)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(arr: ReadonlyArray<ReaderIO<R, A>>) => ReaderIO<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
