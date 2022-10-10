/**
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as alt from './Alt'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import * as result from './Result'
import * as resultT from './ResultT'
import type * as filterable from './Filterable'
import * as fromResult_ from './FromResult'
import * as fromReader_ from './FromReader'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Reader } from './Reader'
import type { Result } from './Result'

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
export const fail: <E>(e: E) => ReaderResult<unknown, E, never> = /*#__PURE__*/ resultT.fail(reader.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => ReaderResult<unknown, never, A> = /*#__PURE__*/ resultT.succeed(reader.FromIdentity)

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
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderResult<R, never, A> = /*#__PURE__*/ resultT.fromKind(
  reader.Functor
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failReader: <R, E>(me: Reader<R, E>) => ReaderResult<R, E, never> = /*#__PURE__*/ resultT.failKind(
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
) => <R>(ma: Reader<R, Result<E, A>>) => Reader<R, B | C> = /*#__PURE__*/ resultT.match(reader.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchReader: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => Reader<R2, B>,
  onSuccess: (a: A) => Reader<R3, C>
) => <R1>(ma: Reader<R1, Result<E, A>>) => Reader<R1 & R2 & R3, B | C> = /*#__PURE__*/ resultT.matchKind(reader.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <R, A>(self: ReaderResult<R, unknown, A>) => Reader<R, A | B> =
  /*#__PURE__*/ resultT.getOrElse(reader.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseReader: <R2, B>(
  onError: Reader<R2, B>
) => <R1, A>(self: ReaderResult<R1, unknown, A>) => Reader<R1 & R2, A | B> = /*#__PURE__*/ resultT.getOrElseKind(
  reader.Monad
)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderResult<R, E, A>) => Reader<R, E | A> = /*#__PURE__*/ resultT.toUnion(
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
) => <R2, A>(ma: ReaderResult<R2, E1, A>) => ReaderResult<R1 & R2, E2, A | B> = /*#__PURE__*/ resultT.catchAll(
  reader.Monad
)

/**
 * @since 3.0.0
 */
export const reverse: <R, E, A>(ma: ReaderResult<R, E, A>) => ReaderResult<R, A, E> = /*#__PURE__*/ resultT.reverse(
  reader.Functor
)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderResult<R, E, A>) => ReaderResult<R, E, B> =
  /*#__PURE__*/ resultT.map(reader.Functor)

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
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, B> = /*#__PURE__*/ resultT.mapBoth(reader.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, A> =
  /*#__PURE__*/ resultT.mapError(reader.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, B> = /*#__PURE__*/ resultT.flatMap(
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
) => <A>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2, A> = /*#__PURE__*/ resultT.flatMapError(reader.Monad)

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
) => <A, R1, E1>(afb: (a: A) => ReaderResult<R1, E1, B>) => (a: A) => ReaderResult<R1 & R2, E2 | E1, C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

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
export const idKleisli: <A>() => (a: A) => ReaderResult<unknown, never, A> =
  /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

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
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, E2, A>(
  that: ReaderResult<R2, E2, A>
) => <R1, E1>(self: ReaderResult<R1, E1, unknown>) => ReaderResult<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderResult<R2, E2, A>
) => <R1, E1, B>(self: ReaderResult<R1, E1, (a: A) => B>) => ReaderResult<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderResult<R1, E1, ReaderResult<R2, E2, A>>
) => ReaderResult<R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * @since 3.0.0
 */
export const orElse: <R2, E2, B>(
  that: ReaderResult<R2, E2, B>
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2, A | B> = /*#__PURE__*/ resultT.orElse(
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
export const compact: <E>(onNone: E) => <R, A>(self: ReaderResult<R, E, Option<A>>) => ReaderResult<R, E, A> =
  /*#__PURE__*/ resultT.compact(reader.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <R, A, B>(self: ReaderResult<R, E, Result<A, B>>) => readonly [ReaderResult<R, E, A>, ReaderResult<R, E, B>] =
  /*#__PURE__*/ resultT.separate(reader.Functor)

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
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderResult<R, E, (a: A) => B>) => ReaderResult<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, void> =
  /*#__PURE__*/ functor.unit(Functor)

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
  /*#__PURE__*/ apply.lift2(Apply)

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
) => ReaderResult<R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

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
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2>(
  onError: (e: E1) => ReaderResult<R2, E2, unknown>
) => <R1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, A> = /*#__PURE__*/ resultT.tapLeft(
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
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <R, E, A>(
  startWith: ReaderResult<R, E, A>
) => (iterable: Iterable<ReaderResult<R, E, A>>) => ReaderResult<R, E, A> = /*#__PURE__*/ alt.firstSuccessOf(Alt)

/**
 * Returns an effect that runs the first effect and in case of failure, runs
 * each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOfNonEmpty: <R, E, A>(
  head: ReaderResult<R, E, A>,
  ...tail: ReadonlyArray<ReaderResult<R, E, A>>
) => ReaderResult<R, E, A> = /*#__PURE__*/ alt.firstSuccessOfNonEmpty(Alt)

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
export const ask: <R>() => ReaderResult<R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderResult`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderResult<R, never, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => (...a: A) => ReaderResult<R, never, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E>(ma: ReaderResult<R1, E, A>) => ReaderResult<R1 & R2, E, B> = /*#__PURE__*/ fromReader_.flatMapReader(
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
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => ReaderResult<unknown, E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => ReaderResult<unknown, E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, B> = /*#__PURE__*/ fromResult_.flatMapOption(
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
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

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
} = /*#__PURE__*/ fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, B> = /*#__PURE__*/ fromResult_.filterMap(
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
} = /*#__PURE__*/ fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => <R>(self: ReaderResult<R, E, A>) => readonly [ReaderResult<R, E, B>, ReaderResult<R, E, C>] =
  /*#__PURE__*/ fromResult_.partitionMap(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => ReaderResult<unknown, E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <R, E1>(ma: ReaderResult<R, E1, A>) => ReaderResult<R, E1 | E2, B> = /*#__PURE__*/ fromResult_.flatMapResult(
  FromResult,
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => ReaderResult<unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => ReaderResult<unknown, E, NonNullable<B>> = /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, NonNullable<B>> =
  /*#__PURE__*/ fromResult_.flatMapNullable(FromResult, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderResult<unknown, never, {}> = /*#__PURE__*/ succeed(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderResult<R, E, A>
) => ReaderResult<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

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
) => ReaderResult<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderResult<unknown, never, readonly []> = /*#__PURE__*/ succeed(_.empty)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

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
) => ReaderResult<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, E2, B, A, C>(
  that: ReaderResult<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, C> = /*#__PURE__*/ apply.zipWith(Apply)

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
) => ReaderResult<R, E, B> = /*#__PURE__*/ resultT.bracket(reader.Monad)

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
) => ReaderResult<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
