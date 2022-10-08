/**
 * `SyncOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `Sync`.
 * If you want to represent a synchronous computation that may fail, please see `SyncResult`.
 *
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import * as alternative from '@fp-ts/core/Alternative'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import * as compactable from '@fp-ts/core/Compactable'
import * as filterable from '@fp-ts/core/Filterable'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromOption_ from '@fp-ts/core/FromOption'
import * as fromResult_ from '@fp-ts/core/FromResult'
import * as fromSync_ from '@fp-ts/core/FromSync'
import type { LazyArg } from '@fp-ts/core/Function'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Option } from '@fp-ts/core/Option'
import * as option from '@fp-ts/core/Option'
import * as optionT from '@fp-ts/core/OptionT'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Sync } from '@fp-ts/core/Sync'
import * as sync from '@fp-ts/core/Sync'
import type { SyncResult } from '@fp-ts/core/SyncResult'

/**
 * @category model
 * @since 3.0.0
 */
export interface SyncOption<A> extends Sync<Option<A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface SyncOptionTypeLambda extends TypeLambda {
  readonly type: SyncOption<this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: SyncOption<never> = optionT.none(sync.FromIdentity)()

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => SyncOption<A> = optionT.some(sync.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => SyncOption<A> = sync.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <A>(e: Result<unknown, A>) => Sync<option.Option<A>> = optionT.fromResult(
  sync.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(ma: Sync<A>) => SyncOption<A> = optionT.fromKind(sync.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <A>(ma: SyncResult<unknown, A>) => SyncOption<A> = sync.map(
  option.fromResult
)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: SyncOption<A>) => Sync<B | C> =
  optionT.match(sync.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchSync: <B, A, C = B>(
  onNone: LazyArg<Sync<B>>,
  onSome: (a: A) => Sync<C>
) => (ma: SyncOption<A>) => Sync<B | C> = optionT.matchKind(sync.Flattenable)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: B) => <A>(self: SyncOption<A>) => Sync<A | B> = optionT.getOrElse(
  sync.Functor
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseSync: <B>(onNone: Sync<B>) => <A>(self: SyncOption<A>) => Sync<A | B> = optionT
  .getOrElseKind(sync.Monad)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUndefined: <A>(self: SyncOption<A>) => Sync<A | undefined> = sync.map(option.toUndefined)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toNull: <A>(self: SyncOption<A>) => Sync<A | null> = sync.map(option.toNull)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: SyncOption<A>) => SyncOption<B> = optionT.map(
  sync.Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<SyncOptionTypeLambda> = {
  of: some
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => SyncOption<B>) => (self: SyncOption<A>) => SyncOption<B> = optionT.flatMap(
  sync.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<SyncOptionTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(
  bfc: (b: B) => SyncOption<C>
) => <A>(afb: (a: A) => SyncOption<B>) => (a: A) => SyncOption<C> = flattenable.composeKleisli(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<SyncOptionTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => SyncOption<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<SyncOptionTypeLambda> = {
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
export const zipLeft: (that: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A> = flattenable.zipLeft(
  Flattenable
)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: SyncOption<A>) => (self: SyncOption<unknown>) => SyncOption<A> = flattenable.zipRight(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: SyncOption<A>) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B> = flattenable.ap(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: SyncOption<SyncOption<A>>) => SyncOption<A> = flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <B>(that: LazyArg<SyncOption<B>>) => <A>(self: SyncOption<A>) => SyncOption<A | B> = optionT
  .catchAll(sync.Monad)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: SyncOption<B>) => <A>(self: SyncOption<A>) => SyncOption<A | B> = optionT
  .orElse(sync.Monad)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: SyncOption<A>) => SyncOption<B> = filterable
  .filterMapComposition(sync.Functor, option.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<SyncOptionTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B> = functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: SyncOption<unknown>) => SyncOption<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: SyncOption<unknown>) => SyncOption<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<SyncOptionTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `SyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: SyncOption<A>, fb: SyncOption<B>) => SyncOption<C> = apply
  .lift2(Apply)

/**
 * Lifts a ternary function into `SyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: SyncOption<A>, fb: SyncOption<B>, fc: SyncOption<C>) => SyncOption<D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<SyncOptionTypeLambda> = {
  map,
  ap,
  of: some
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => SyncOption<unknown>) => (self: SyncOption<A>) => SyncOption<A> = flattenable.tap(
  Flattenable
)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: (onNone: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A> = optionT.tapError(
  sync.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<SyncOptionTypeLambda> = {
  orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: alternative.Alternative<SyncOptionTypeLambda> = {
  orElse,
  none: () => none
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => SyncOption<void> = alternative.guard(Alternative, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<SyncOptionTypeLambda> = {
  map,
  of: some,
  flatMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: SyncOption<option.Option<A>>) => SyncOption<A> = compactable
  .compactComposition(sync.Functor, option.Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<SyncOptionTypeLambda> = {
  compact
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <A, B>(fe: SyncOption<Result<A, B>>) => readonly [SyncOption<A>, SyncOption<B>] = compactable
  .separate(Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<SyncOptionTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: SyncOption<A>) => readonly [SyncOption<B>, SyncOption<C>] = filterable.partitionMap(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: SyncOption<C>) => SyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => SyncOption<B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: SyncOption<C>
  ) => readonly [SyncOption<C>, SyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => readonly [SyncOption<B>, SyncOption<B>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<SyncOptionTypeLambda> = {
  fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => SyncOption<void> = fromSync_.log(
  FromSync
)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => SyncOption<void> = fromSync_
  .logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => SyncOption<B> =
  fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: SyncOption<A>) => SyncOption<B> = fromSync_
  .flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<SyncOptionTypeLambda> = {
  fromOption
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => SyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => SyncOption<B>
} = fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => SyncOption<B> = fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => SyncOption<NonNullable<A>> = fromOption_.fromNullable(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => SyncOption<NonNullable<B>> = fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: SyncOption<A>) => SyncOption<NonNullable<B>> = fromOption_.flatMapNullable(
  FromOption,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<SyncOptionTypeLambda> = {
  fromResult
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => SyncOption<B> = fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: SyncOption<A>) => SyncOption<B> = fromResult_
  .flatMapResult(FromResult, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: SyncOption<{}> = some(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: SyncOption<A>) => SyncOption<{ readonly [K in N]: A }> =
  functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
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
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: SyncOption<readonly []> = some(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: SyncOption<A>) => SyncOption<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: SyncOption<B>
) => <A extends ReadonlyArray<unknown>>(self: SyncOption<A>) => SyncOption<readonly [...A, B]> = apply
  .zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: SyncOption<B>, f: (a: A, b: B) => C) => (self: SyncOption<A>) => SyncOption<C> =
  apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => SyncOption<B>
): ((as: NonEmptyReadonlyArray<A>) => SyncOption<NonEmptyReadonlyArray<B>>) =>
  flow(sync.traverseNonEmptyReadonlyArrayWithIndex(f), sync.map(option.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => SyncOption<B>
): ((as: ReadonlyArray<A>) => SyncOption<ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, B>(
  f: (a: A) => SyncOption<B>
): ((as: NonEmptyReadonlyArray<A>) => SyncOption<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => SyncOption<B>
): ((as: ReadonlyArray<A>) => SyncOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<SyncOption<A>>) => SyncOption<ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
