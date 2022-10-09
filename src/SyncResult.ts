/**
 * `SyncResult<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`.
 *
 * If you want to represent a synchronous computation that never fails, please see `Sync`.
 * If you want to represent a synchronous computation that may yield nothing, please see `SyncOption`.
 *
 * @since 3.0.0
 */
import * as alt from './Alt'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as flattenable from './Flattenable'
import type { Compactable } from './Compactable'
import * as result from './Result'
import type { Result } from './Result'
import * as resultT from './ResultT'
import type * as filterable from './Filterable'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import * as sync from './Sync'
import type { Sync } from './Sync'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'

/**
 * @category model
 * @since 3.0.0
 */
export interface SyncResult<E, A> extends Sync<Result<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface SyncResultTypeLambda extends TypeLambda {
  readonly type: SyncResult<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => SyncResult<E, never> = /*#__PURE__*/ resultT.fail(sync.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => SyncResult<never, A> = /*#__PURE__*/ resultT.succeed(sync.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(ma: Sync<A>) => SyncResult<never, A> = /*#__PURE__*/ resultT.fromKind(sync.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failSync: <E>(me: Sync<E>) => SyncResult<E, never> = /*#__PURE__*/ resultT.failKind(sync.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A>(fa: Result<E, A>) => SyncResult<E, A> = sync.of

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
) => (ma: SyncResult<E, A>) => Sync<B | C> = /*#__PURE__*/ resultT.match(sync.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchSync: <E, B, A, C = B>(
  onError: (e: E) => Sync<B>,
  onSuccess: (a: A) => Sync<C>
) => (ma: SyncResult<E, A>) => Sync<B | C> = /*#__PURE__*/ resultT.matchKind(sync.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onError: B) => <A>(self: SyncResult<unknown, A>) => Sync<A | B> =
  /*#__PURE__*/ resultT.getOrElse(sync.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseSync: <B>(onError: Sync<B>) => <A>(self: SyncResult<unknown, A>) => Sync<A | B> =
  /*#__PURE__*/ resultT.getOrElseKind(sync.Monad)

/**
 * Constructs a new `SyncResult` from a function that performs a side effect and might throw.
 *
 * @category interop
 * @see {@link liftThrowable}
 * @since 3.0.0
 */
export const fromThrowable =
  <A, E>(f: () => A, onThrow: (error: unknown) => E): SyncResult<E, A> =>
  () =>
    result.fromThrowable(f, onThrow)

/**
 * Lifts a function that may throw to one returning a `SyncResult`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftThrowable =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => B,
    onThrow: (error: unknown) => E
  ): ((...a: A) => SyncResult<E, B>) =>
  (...a) =>
    fromThrowable(() => f(...a), onThrow)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: SyncResult<E, A>) => Sync<E | A> = /*#__PURE__*/ resultT.toUnion(sync.Functor)

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, E2, B>(
  onError: (e: E1) => SyncResult<E2, B>
) => <A>(ma: SyncResult<E1, A>) => SyncResult<E2, A | B> = /*#__PURE__*/ resultT.catchAll(sync.Monad)

/**
 * @since 3.0.0
 */
export const reverse: <E, A>(ma: SyncResult<E, A>) => SyncResult<A, E> = /*#__PURE__*/ resultT.reverse(sync.Functor)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: SyncResult<E, A>) => SyncResult<E, B> = /*#__PURE__*/ resultT.map(
  sync.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: SyncResult<E, A>) => SyncResult<G, B> =
  /*#__PURE__*/ resultT.mapBoth(sync.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: SyncResult<E, A>) => SyncResult<G, A> =
  /*#__PURE__*/ resultT.mapError(sync.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(
  f: (a: A) => SyncResult<E2, B>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E1 | E2, B> = /*#__PURE__*/ resultT.flatMap(sync.Monad)

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @category error handling
 * @since 3.0.0
 */
export const flatMapError: <E1, E2>(f: (e: E1) => Sync<E2>) => <A>(self: SyncResult<E1, A>) => SyncResult<E2, A> =
  /*#__PURE__*/ resultT.flatMapError(sync.Monad)

/**
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: SyncResult<E1, SyncResult<E2, A>>) => SyncResult<E1 | E2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @since 3.0.0
 */
export const orElse: <E2, B>(that: SyncResult<E2, B>) => <E1, A>(self: SyncResult<E1, A>) => SyncResult<E2, A | B> =
  /*#__PURE__*/ resultT.orElse(sync.Monad)

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
): applicative.Applicative<result.ValidatedT<SyncResultTypeLambda, E>> => ({
  map,
  ap: apply.apComposition(sync.Apply, result.getValidatedApplicative(Semigroup)),
  of: succeed
})

/**
 * The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedAlt = <E>(Semigroup: Semigroup<E>): alt.Alt<result.ValidatedT<SyncResultTypeLambda, E>> => {
  return {
    orElse: resultT.getValidatedOrElse(sync.Monad, Semigroup)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <E>(onNone: E) => <A>(self: SyncResult<E, Option<A>>) => SyncResult<E, A> =
  /*#__PURE__*/ resultT.compact(sync.Functor)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <A, B>(self: SyncResult<E, Result<A, B>>) => readonly [SyncResult<E, A>, SyncResult<E, B>] =
  /*#__PURE__*/ resultT.separate(sync.Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(onNone: E): Compactable<result.ValidatedT<SyncResultTypeLambda, E>> => {
  return {
    compact: compact(onNone)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(onEmpty: E): filterable.Filterable<result.ValidatedT<SyncResultTypeLambda, E>> => {
  return {
    filterMap: (f) => filterMap(f, onEmpty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<SyncResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: SyncResult<E, (a: A) => B>) => SyncResult<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: SyncResult<E, unknown>) => SyncResult<E, B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: SyncResult<E, unknown>) => SyncResult<E, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<SyncResultTypeLambda> = {
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<SyncResultTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<SyncResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, E2, C>(
  bfc: (b: B) => SyncResult<E2, C>
) => <A, E1>(afb: (a: A) => SyncResult<E1, B>) => (a: A) => SyncResult<E2 | E1, C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<SyncResultTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => SyncResult<never, A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<SyncResultTypeLambda> = {
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
export const zipLeft: <E2>(
  that: SyncResult<E2, unknown>
) => <E1, A>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <E2, A>(
  that: SyncResult<E2, A>
) => <E1>(self: SyncResult<E1, unknown>) => SyncResult<E2 | E1, A> = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, E2>(
  f: (a: A) => SyncResult<E2, unknown>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E1 | E2, A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: SyncResult<E2, A>
) => <E1, B>(self: SyncResult<E1, (a: A) => B>) => SyncResult<E2 | E1, B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<SyncResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `SyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: SyncResult<E1, A>, fb: SyncResult<E2, B>) => SyncResult<E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `SyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: SyncResult<E1, A>, fb: SyncResult<E2, B>, fc: SyncResult<E3, C>) => SyncResult<E1 | E2 | E3, D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<SyncResultTypeLambda> = {
  map,
  ap,
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<SyncResultTypeLambda> = {
  map,
  of: succeed,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, E2>(
  onError: (e: E1) => SyncResult<E2, unknown>
) => <A>(self: SyncResult<E1, A>) => SyncResult<E1 | E2, A> = /*#__PURE__*/ resultT.tapLeft(sync.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<SyncResultTypeLambda> = {
  orElse
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <E, A>(
  startWith: SyncResult<E, A>
) => (iterable: Iterable<SyncResult<E, A>>) => SyncResult<E, A> = /*#__PURE__*/ alt.firstSuccessOf(Alt)

/**
 * Returns an effect that runs the first effect and in case of failure, runs
 * each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOfNonEmpty: <E, A>(
  head: SyncResult<E, A>,
  ...tail: ReadonlyArray<SyncResult<E, A>>
) => SyncResult<E, A> = /*#__PURE__*/ alt.firstSuccessOfNonEmpty(Alt)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<SyncResultTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => SyncResult<never, void> =
  /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => SyncResult<never, B> = /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <E>(self: SyncResult<E, A>) => SyncResult<E, B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<SyncResultTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => SyncResult<E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => SyncResult<E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, B> = /*#__PURE__*/ fromResult_.flatMapOption(
  FromResult,
  Flattenable
)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <E1>(ma: SyncResult<E1, A>) => SyncResult<E1 | E2, B> = /*#__PURE__*/ fromResult_.flatMapResult(
  FromResult,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => SyncResult<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => SyncResult<E, B>
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    ma: SyncResult<E1, C>
  ) => SyncResult<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(mb: SyncResult<E1, B>) => SyncResult<E2 | E1, B>
} = /*#__PURE__*/ fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(f: (a: A) => Option<B>, onNone: E) => (self: SyncResult<E, A>) => SyncResult<E, B> =
  /*#__PURE__*/ fromResult_.filterMap(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: SyncResult<E, C>
  ) => readonly [SyncResult<E, C>, SyncResult<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: SyncResult<E, B>
  ) => readonly [SyncResult<E, B>, SyncResult<E, B>]
} = /*#__PURE__*/ fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => (self: SyncResult<E, A>) => readonly [SyncResult<E, B>, SyncResult<E, C>] = /*#__PURE__*/ fromResult_.partitionMap(
  FromResult,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => SyncResult<E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => SyncResult<E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => SyncResult<E, NonNullable<B>> = /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, NonNullable<B>> = /*#__PURE__*/ fromResult_.flatMapNullable(
  FromResult,
  Flattenable
)

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Failure`
 *
 * @since 3.0.0
 */
export const bracket: <E1, A, E2, B, E3>(
  acquire: SyncResult<E1, A>,
  use: (a: A) => SyncResult<E2, B>,
  release: (a: A, e: Result<E2, B>) => SyncResult<E3, void>
) => SyncResult<E1 | E2 | E3, B> = /*#__PURE__*/ resultT.bracket(sync.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: SyncResult<never, {}> = /*#__PURE__*/ succeed(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: SyncResult<E, A>) => SyncResult<E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: SyncResult<E, A>) => SyncResult<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => SyncResult<E2, B>
) => <E1>(
  self: SyncResult<E1, A>
) => SyncResult<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: SyncResult<E2, B>
) => <E1>(
  self: SyncResult<E1, A>
) => SyncResult<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: SyncResult<never, readonly []> = /*#__PURE__*/ succeed(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <E, A>(self: SyncResult<E, A>) => SyncResult<E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <E2, B>(
  fb: SyncResult<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(self: SyncResult<E1, A>) => SyncResult<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <E2, B, A, C>(
  that: SyncResult<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, C> = /*#__PURE__*/ apply.zipWith(Apply)

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
export const traverseNonEmptyReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
) => (as: NonEmptyReadonlyArray<A>) => SyncResult<E, NonEmptyReadonlyArray<B>> = (f) =>
  flow(sync.traverseNonEmptyReadonlyArrayWithIndex(f), sync.map(result.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
): ((as: ReadonlyArray<A>) => SyncResult<E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <A, E, B>(
  f: (a: A) => SyncResult<E, B>
): ((as: NonEmptyReadonlyArray<A>) => SyncResult<E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, E, B>(
  f: (a: A) => SyncResult<E, B>
): ((as: ReadonlyArray<A>) => SyncResult<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <E, A>(arr: ReadonlyArray<SyncResult<E, A>>) => SyncResult<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => SyncResult<E, B>) =>
  (as: NonEmptyReadonlyArray<A>): SyncResult<E, NonEmptyReadonlyArray<B>> =>
  () => {
    const e = f(0, _.head(as))()
    if (_.isFailure(e)) {
      return e
    }
    const out: _.NonEmptyArray<B> = [e.success]
    for (let i = 1; i < as.length; i++) {
      const e = f(i, as[i])()
      if (_.isFailure(e)) {
        return e
      }
      out.push(e.success)
    }
    return _.succeed(out)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
): ((as: ReadonlyArray<A>) => SyncResult<E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, E, B>(
  f: (a: A) => SyncResult<E, B>
): ((as: NonEmptyReadonlyArray<A>) => SyncResult<E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => SyncResult<E, B>
): ((as: ReadonlyArray<A>) => SyncResult<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<SyncResult<E, A>>) => SyncResult<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
