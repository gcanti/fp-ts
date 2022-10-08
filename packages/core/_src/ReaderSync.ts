/**
 * @since 3.0.0
 */
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromReader_ from '@fp-ts/core/FromReader'
import * as fromSync_ from '@fp-ts/core/FromSync'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import * as reader from '@fp-ts/core/Reader'
import * as readerT from '@fp-ts/core/ReaderT'
import type { Sync } from '@fp-ts/core/Sync'
import * as sync from '@fp-ts/core/Sync'

/**
 * @category model
 * @since 3.0.0
 */

export interface ReaderSync<R, A> {
  (r: R): Sync<A>
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderSync<R, A> = readerT.fromReader(
  sync.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(fa: sync.Sync<A>) => ReaderSync<unknown, A> = reader.of

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderSync<R1, A>) => ReaderSync<R2, A> = reader.local

/**
 * Effectfully accesses the environment.
 *
 * @since 3.0.0
 */
export const asksReaderSync: <R1, R2, A>(f: (r1: R1) => ReaderSync<R2, A>) => ReaderSync<R1 & R2, A> = reader.asksReader

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderSync<R, A>) => ReaderSync<R, B> = readerT.map(
  sync.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReaderSync<unknown, A> = readerT.of(sync.FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReaderSyncTypeLambda> = {
  of
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, B>(
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, B> = readerT.flatMap(sync.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderSyncTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, R2, C>(
  bfc: (b: B) => ReaderSync<R2, C>
) => <A, R1>(afb: (a: A) => ReaderSync<R1, B>) => (a: A) => ReaderSync<R1 & R2, C> = flattenable
  .composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReaderSyncTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => ReaderSync<unknown, A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReaderSyncTypeLambda> = {
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
  that: ReaderSync<R2, unknown>
) => <R1, A>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, A> = flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, A>(
  that: ReaderSync<R2, A>
) => <R1>(self: ReaderSync<R1, unknown>) => ReaderSync<R1 & R2, A> = flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, A>(
  fa: ReaderSync<R2, A>
) => <R1, B>(self: ReaderSync<R1, (a: A) => B>) => ReaderSync<R1 & R2, B> = flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: ReaderSync<R1, ReaderSync<R2, A>>) => ReaderSync<R1 & R2, A> = flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderSyncTypeLambda extends TypeLambda {
  readonly type: ReaderSync<this['In1'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderSyncTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: ReaderSync<R, (a: A) => B>) => ReaderSync<R, B> = functor
  .flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R>(self: ReaderSync<R, unknown>) => ReaderSync<R, B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R>(self: ReaderSync<R, unknown>) => ReaderSync<R, void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderSyncTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderSync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderSync<R1, A>, fb: ReaderSync<R2, B>) => ReaderSync<R1 & R2, C> = apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderSync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderSync<R1, A>, fb: ReaderSync<R2, B>, fc: ReaderSync<R3, C>) => ReaderSync<R1 & R2 & R3, D> =
  apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderSyncTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderSyncTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, R2>(
  f: (a: A) => ReaderSync<R2, unknown>
) => <R1>(ma: ReaderSync<R1, A>) => ReaderSync<R1 & R2, A> = flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<ReaderSyncTypeLambda> = {
  fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderSync<unknown, void> = fromSync_
  .log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => ReaderSync<unknown, void> = fromSync_.logError(
  FromSync
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => sync.Sync<B>
) => (...a: A) => ReaderSync<unknown, B> = fromSync_.liftSync(FromSync)

/**
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => sync.Sync<B>) => <R>(self: ReaderSync<R, A>) => ReaderSync<R, B> =
  fromSync_.flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderSyncTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderSync<R, R> = fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderSync`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderSync<R, A> = fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderSync<R, B> = fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderSync<R1, A>) => ReaderSync<R1 & R2, B> = fromReader_.flatMapReader(
  FromReader,
  Flattenable
)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderSync<unknown, {}> = of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderSync<R, A>) => ReaderSync<R, { readonly [K in N]: A }> = functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderSync<R, A>) => ReaderSync<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  functor.let(Functor)

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
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(
  self: ReaderSync<R1, A>
) => ReaderSync<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderSync<R2, B>
) => <R1>(
  self: ReaderSync<R1, A>
) => ReaderSync<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apply.bindRight(
  Apply
)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderSync<unknown, readonly []> = of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, A>(self: ReaderSync<R, A>) => ReaderSync<R, readonly [A]> = functor.tupled(
  Functor
)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, B>(
  fb: ReaderSync<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, readonly [...A, B]> = apply
  .zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, B, A, C>(
  that: ReaderSync<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, C> = apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderSync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderSync<R, NonEmptyReadonlyArray<B>>) =>
  flow(reader.traverseNonEmptyReadonlyArrayWithIndex(f), reader.map(sync.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderSync<R, B>
): ((as: ReadonlyArray<A>) => ReaderSync<R, ReadonlyArray<B>>) => {
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
  f: (a: A) => ReaderSync<R, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderSync<R, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderSync<R, B>
): ((as: ReadonlyArray<A>) => ReaderSync<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(arr: ReadonlyArray<ReaderSync<R, A>>) => ReaderSync<R, ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
