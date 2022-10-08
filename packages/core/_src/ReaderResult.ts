/**
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type * as bifunctor from '@fp-ts/core/Bifunctor'
import type { Compactable } from '@fp-ts/core/Compactable'
import type * as filterable from '@fp-ts/core/Filterable'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromReader_ from '@fp-ts/core/FromReader'
import * as fromResult_ from '@fp-ts/core/FromResult'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Option } from '@fp-ts/core/Option'
import type { Predicate } from '@fp-ts/core/Predicate'
import * as reader from '@fp-ts/core/Reader'
import type { Refinement } from '@fp-ts/core/Refinement'
import * as result from '@fp-ts/core/Result'
import * as resultT from '@fp-ts/core/ResultT'
import type { Semigroup } from '@fp-ts/core/Semigroup'

import Result = result.Result
import Reader = reader.Reader

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderResult<R, E, A> extends Reader<R, Result<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderResultTypeLambda extends TypeLambda {
  readonly type: ReaderResult<this['In1'], this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => ReaderResult<unknown, E, never> = resultT.fail(reader.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => ReaderResult<unknown, never, A> = resultT.succeed(reader.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderResult: <R1, R2, E, A>(f: (r1: R1) => ReaderResult<R2, E, A>) => ReaderResult<R1 & R2, E, A> =
  reader.asksReader

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderResult<R, never, A> = resultT.fromKind(
  reader.Functor
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failReader: <R, E>(me: Reader<R, E>) => ReaderResult<R, E, never> = resultT.failKind(
  reader.Functor
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A>(fa: Result<E, A>) => ReaderResult<unknown, E, A> = reader.of

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
) => <R>(ma: Reader<R, result.Result<E, A>>) => Reader<R, B | C> = resultT.match(reader.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchReader: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => Reader<R2, B>,
  onSuccess: (a: A) => Reader<R3, C>
) => <R1>(ma: Reader<R1, result.Result<E, A>>) => Reader<R1 & R2 & R3, B | C> = resultT.matchKind(
  reader.Monad
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <R, A>(self: ReaderResult<R, unknown, A>) => Reader<R, A | B> = resultT
  .getOrElse(reader.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseReader: <R2, B>(
  onError: Reader<R2, B>
) => <R1, A>(self: ReaderResult<R1, unknown, A>) => Reader<R1 & R2, A | B> = resultT.getOrElseKind(
  reader.Monad
)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderResult<R, E, A>) => Reader<R, E | A> = resultT.toUnion(
  reader.Functor
)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderResult<R1, E, A>) => ReaderResult<R2, E, A> =
  reader.local

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, R1, E2, B>(
  onError: (e: E1) => ReaderResult<R1, E2, B>
) => <R2, A>(ma: ReaderResult<R2, E1, A>) => ReaderResult<R1 & R2, E2, A | B> = resultT.catchAll(
  reader.Monad
)

/**
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderResult<R, E, A>) => ReaderResult<R, A, E> = resultT.swap(
  reader.Functor
)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderResult<R, E, A>) => ReaderResult<R, E, B> = resultT.map(
  reader.Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReaderResultTypeLambda> = {
  of: succeed
}

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
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, B> = resultT.mapBoth(reader.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, A> = resultT
  .mapError(reader.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, B> = resultT.flatMap(
  reader.Monad
)

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @category error handling
 * @since 3.0.0
 */
export const flatMapError: <E1, R, E2>(
  f: (e: E1) => Reader<R, E2>
) => <A>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2, A> = resultT.flatMapError(reader.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, R2, E2, C>(
  bfc: (b: B) => ReaderResult<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderResult<R1, E1, B>) => (a: A) => ReaderResult<R1 & R2, E2 | E1, C> = flattenable
  .composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReaderResultTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => ReaderResult<unknown, never, A> = fromIdentity.idKleisli(
  FromIdentity
)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReaderResultTypeLambda> = {
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
export const zipLeft: <R2, E2>(
  that: ReaderResult<R2, E2, unknown>
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, A> = flattenable
  .zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, E2, A>(
  that: ReaderResult<R2, E2, A>
) => <R1, E1>(self: ReaderResult<R1, E1, unknown>) => ReaderResult<R1 & R2, E2 | E1, A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderResult<R2, E2, A>
) => <R1, E1, B>(self: ReaderResult<R1, E1, (a: A) => B>) => ReaderResult<R1 & R2, E1 | E2, B> = flattenable.ap(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderResult<R1, E1, ReaderResult<R2, E2, A>>
) => ReaderResult<R1 & R2, E1 | E2, A> = flatMap(identity)

/**
 * @since 3.0.0
 */
export const orElse: <R2, E2, B>(
  that: ReaderResult<R2, E2, B>
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2, A | B> = resultT.orElse(
  reader.Monad
)

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
  Semigroup: Semigroup<E>
): applicative.Applicative<result.ValidatedT<ReaderResultTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(reader.Apply, result.getValidatedApplicative(Semigroup)),
  of: succeed
})

/**
 * The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedAlt = <E>(Semigroup: Semigroup<E>): alt.Alt<result.ValidatedT<ReaderResultTypeLambda, E>> => {
  return {
    orElse: resultT.getValidatedOrElse(reader.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(onNone: E) => <R, A>(self: ReaderResult<R, E, Option<A>>) => ReaderResult<R, E, A> = resultT
  .compact(reader.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <R, A, B>(self: ReaderResult<R, E, Result<A, B>>) => readonly [ReaderResult<R, E, A>, ReaderResult<R, E, B>] =
  resultT.separate(reader.Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(onNone: E): Compactable<result.ValidatedT<ReaderResultTypeLambda, E>> => {
  return {
    compact: compact(onNone)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(onEmpty: E): filterable.Filterable<result.ValidatedT<ReaderResultTypeLambda, E>> => {
  return {
    filterMap: (f) => filterMap(f, onEmpty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderResult<R, E, (a: A) => B>) => ReaderResult<R, E, B> = functor.flap(
  Functor
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, B> = functor
  .as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, void> = functor.unit(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(fa: ReaderResult<R1, E1, A>, fb: ReaderResult<R2, E2, B>) => ReaderResult<R1 & R2, E1 | E2, C> =
  apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderResult<R1, E1, A>,
  fb: ReaderResult<R2, E2, B>,
  fc: ReaderResult<R3, E3, C>
) => ReaderResult<R1 & R2 & R3, E1 | E2 | E3, D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderResultTypeLambda> = {
  map,
  ap,
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderResultTypeLambda> = {
  map,
  of: succeed,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, R2, E2>(
  f: (a: A) => ReaderResult<R2, E2, unknown>
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, A> = flattenable.tap(
  Flattenable
)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2>(
  onError: (e: E1) => ReaderResult<R2, E2, unknown>
) => <R1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, A> = resultT.tapLeft(
  reader.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderResultTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<ReaderResultTypeLambda> = {
  orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderResultTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderResult<R, never, R> = fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderResult`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderResult<R, never, A> = fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => (...a: A) => ReaderResult<R, never, B> = fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E>(ma: ReaderResult<R1, E, A>) => ReaderResult<R1 & R2, E, B> = fromReader_.flatMapReader(
  FromReader,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<ReaderResultTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => ReaderResult<unknown, E, A> = fromResult_
  .fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => ReaderResult<unknown, E, B> = fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, B> = fromResult_.flatMapOption(
  FromResult,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => ReaderResult<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => ReaderResult<unknown, E, B>
} = fromResult_.liftPredicate(FromResult)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <R, E1>(
    ma: ReaderResult<R, E1, C>
  ) => ReaderResult<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <R, E1>(
    mb: ReaderResult<R, E1, B>
  ) => ReaderResult<R, E2 | E1, B>
} = fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, B> = fromResult_.filterMap(
  FromResult,
  Flattenable
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <R>(
    self: ReaderResult<R, E, C>
  ) => readonly [ReaderResult<R, E, C>, ReaderResult<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <R>(
    self: ReaderResult<R, E, B>
  ) => readonly [ReaderResult<R, E, B>, ReaderResult<R, E, B>]
} = fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => <R>(self: ReaderResult<R, E, A>) => readonly [ReaderResult<R, E, B>, ReaderResult<R, E, C>] = fromResult_
  .partitionMap(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => result.Result<E, B>
) => (...a: A) => ReaderResult<unknown, E, B> = fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <R, E1>(ma: ReaderResult<R, E1, A>) => ReaderResult<R, E1 | E2, B> = fromResult_.flatMapResult(
  FromResult,
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => ReaderResult<unknown, E, NonNullable<A>> = fromResult_
  .fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => ReaderResult<unknown, E, NonNullable<B>> = fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, NonNullable<B>> = fromResult_
  .flatMapNullable(FromResult, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderResult<unknown, never, {}> = succeed(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, { readonly [K in N]: A }> = functor
  .bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderResult<R, E, A>
) => ReaderResult<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
  Functor
)

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
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = flattenable.bind(
  Flattenable
)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderResult<unknown, never, readonly []> = succeed(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, readonly [A]> = functor
  .tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, E2, B>(
  fb: ReaderResult<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E1 | E2, readonly [...A, B]> = apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, E2, B, A, C>(
  that: ReaderResult<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, C> = apply.zipWith(Apply)

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Failure`
 *
 * @since 3.0.0
 */
export const bracket: <R, E, A, B>(
  aquire: ReaderResult<R, E, A>,
  use: (a: A) => ReaderResult<R, E, B>,
  release: (a: A, e: Result<E, B>) => ReaderResult<R, E, void>
) => ReaderResult<R, E, B> = resultT.bracket(reader.Monad)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderResult<R, E, NonEmptyReadonlyArray<B>>) =>
  flow(reader.traverseNonEmptyReadonlyArrayWithIndex(f), reader.map(result.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderResult<R, E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderResult<R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => ReaderResult<R, E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderResult<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderResult<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderResult<R, E, A>>
) => ReaderResult<R, E, ReadonlyArray<A>> = traverseReadonlyArray(identity)
