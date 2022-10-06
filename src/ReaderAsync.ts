/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as flattenable from './Flattenable'
import * as fromSync_ from './FromSync'
import * as fromReader_ from './FromReader'
import * as fromAsync_ from './FromAsync'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type * as monad from './Monad'
import * as fromIdentity from './FromIdentity'
import * as reader from './Reader'
import type { ReaderSync } from './ReaderSync'
import * as readerT from './ReaderT'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import * as async from './Async'
import type { Async } from './Async'

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderAsync<R, A> {
  (r: R): Async<A>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderAsync: <R1, R2, A>(f: (r1: R1) => ReaderAsync<R2, A>) => ReaderAsync<R1 & R2, A> =
  reader.asksReader

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderAsync<R, A> = /*#__PURE__*/ readerT.fromReader(
  async.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <A>(fa: Async<A>) => ReaderAsync<unknown, A> = /*#__PURE__*/ reader.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(fa: Sync<A>) => ReaderAsync<unknown, A> = /*#__PURE__*/ flow(async.fromSync, fromAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReaderSync: <R, A>(fa: ReaderSync<R, A>) => ReaderAsync<R, A> = reader.map(async.fromSync)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderAsync<R1, A>) => ReaderAsync<R2, A> = reader.local

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderAsync<R, A>) => ReaderAsync<R, B> = /*#__PURE__*/ readerT.map(
  async.Functor
)

/**
 * @since 3.0.0
 */
export const apPar: <R2, A>(
  fa: ReaderAsync<R2, A>
) => <R1, B>(fab: ReaderAsync<R1, (a: A) => B>) => ReaderAsync<R1 & R2, B> = /*#__PURE__*/ readerT.ap(async.ApplyPar)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => ReaderAsync<unknown, A> = /*#__PURE__*/ readerT.succeed(async.FromIdentity)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, B>(
  f: (a: A) => ReaderAsync<R2, B>
) => <R1>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B> = /*#__PURE__*/ readerT.flatMap(async.Monad)

/**
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: ReaderAsync<R1, ReaderAsync<R2, A>>) => ReaderAsync<R1 & R2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderSync =
  <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => ReaderSync<R, B>): ((...a: A) => ReaderAsync<R, B>) =>
  (...a) =>
    fromReaderSync(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderSync: <A, R2, B>(
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B> = (f) => flatMap(liftReaderSync(f))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderAsyncTypeLambda extends TypeLambda {
  readonly type: ReaderAsync<this['In1'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderAsyncTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: ReaderAsync<R, (a: A) => B>) => ReaderAsync<R, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R>(self: ReaderAsync<R, unknown>) => ReaderAsync<R, B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R>(self: ReaderAsync<R, unknown>) => ReaderAsync<R, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReaderAsyncTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: apply.Apply<ReaderAsyncTypeLambda> = {
  map,
  ap: apPar
}

/**
 * Lifts a binary function into `ReaderAsync` in parallel.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2Par: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderAsync<R1, A>, fb: ReaderAsync<R2, B>) => ReaderAsync<R1 & R2, C> =
  /*#__PURE__*/ apply.lift2(ApplyPar)

/**
 * Lifts a ternary function into `ReaderAsync` in parallel.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(
  fa: ReaderAsync<R1, A>,
  fb: ReaderAsync<R2, B>,
  fc: ReaderAsync<R3, C>
) => ReaderAsync<R1 & R2 & R3, D> = /*#__PURE__*/ apply.lift3(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeftPar: <R>(that: ReaderAsync<R, unknown>) => <A>(self: ReaderAsync<R, A>) => ReaderAsync<R, A> =
  /*#__PURE__*/ apply.zipLeftPar(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRightPar: <R, A>(that: ReaderAsync<R, A>) => (self: ReaderAsync<R, unknown>) => ReaderAsync<R, A> =
  /*#__PURE__*/ apply.zipRightPar(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<ReaderAsyncTypeLambda> = {
  map,
  ap: apPar,
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderAsyncTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, R2, C>(
  bfc: (b: B) => ReaderAsync<R2, C>
) => <A, R1>(afb: (a: A) => ReaderAsync<R1, B>) => (a: A) => ReaderAsync<R1 & R2, C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReaderAsyncTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => ReaderAsync<unknown, A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReaderAsyncTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <R2>(
  that: ReaderAsync<R2, unknown>
) => <R1, A>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, A>(
  that: ReaderAsync<R2, A>
) => <R1>(self: ReaderAsync<R1, unknown>) => ReaderAsync<R1 & R2, A> = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, A>(
  fa: ReaderAsync<R2, A>
) => <R1, B>(self: ReaderAsync<R1, (a: A) => B>) => ReaderAsync<R1 & R2, B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderAsyncTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderAsync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderAsync<R1, A>, fb: ReaderAsync<R2, B>) => ReaderAsync<R1 & R2, C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderAsync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(
  fa: ReaderAsync<R1, A>,
  fb: ReaderAsync<R2, B>,
  fc: ReaderAsync<R3, C>
) => ReaderAsync<R1 & R2 & R3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderAsyncTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, R2>(
  f: (a: A) => ReaderAsync<R2, unknown>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderAsyncTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<ReaderAsyncTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderAsync<unknown, void> =
  /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderAsync<unknown, void> =
  /*#__PURE__*/ fromSync_.logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => ReaderAsync<unknown, B> = /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderAsyncTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderAsync<R, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderAsync`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderAsync<R, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderAsync<R, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B> = /*#__PURE__*/ fromReader_.flatMapReader(
  FromReader,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<ReaderAsyncTypeLambda> = {
  fromSync: fromSync,
  fromAsync: fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => ReaderAsync<unknown, void> = /*#__PURE__*/ fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, A> =
  /*#__PURE__*/ fromAsync_.delay(FromAsync, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => (...a: A) => ReaderAsync<unknown, B> = /*#__PURE__*/ fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(f: (a: A) => Async<B>) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, B> =
  /*#__PURE__*/ fromAsync_.flatMapAsync(FromAsync, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderAsync<unknown, {}> = /*#__PURE__*/ succeed(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

/**
 * A variant of `bind` that ignores the scope in parallel.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRightPar: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(ApplyPar)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderAsync<unknown, readonly []> = /*#__PURE__*/ succeed(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, B>(
  fb: ReaderAsync<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Zips this effect with the specified effect in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlattenPar: <R2, B>(
  fb: ReaderAsync<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(ApplyPar)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, B, A, C>(
  that: ReaderAsync<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, C> = /*#__PURE__*/ apply.zipWith(Apply)

/**
 * Zips this effect with the specified effect using the specified combiner function in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWithPar = /*#__PURE__*/ apply.zipWith(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndexPar = <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsync<R, NonEmptyReadonlyArray<B>>) =>
  flow(
    reader.traverseNonEmptyReadonlyArrayWithIndex(f),
    reader.map(async.traverseNonEmptyReadonlyArrayWithIndexPar(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
): ((as: ReadonlyArray<A>) => ReaderAsync<R, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsync<R, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
): ((as: ReadonlyArray<A>) => ReaderAsync<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <R, A>(
  arr: ReadonlyArray<ReaderAsync<R, A>>
) => ReaderAsync<R, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsync<R, NonEmptyReadonlyArray<B>>) =>
  flow(reader.traverseNonEmptyReadonlyArrayWithIndex(f), reader.map(async.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
): ((as: ReadonlyArray<A>) => ReaderAsync<R, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderAsync<R, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
): ((as: ReadonlyArray<A>) => ReaderAsync<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(arr: ReadonlyArray<ReaderAsync<R, A>>) => ReaderAsync<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
