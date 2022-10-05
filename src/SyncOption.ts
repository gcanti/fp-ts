/**
 * `SyncOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `Sync`.
 * If you want to represent a synchronous computation that may fail, please see `SyncResult`.
 *
 * @since 3.0.0
 */
import type * as semigroupKind from './SemigroupKind'
import * as monoidKind from './MonoidKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as categoryKind from './CategoryKind'
import type * as composableKind from './ComposableKind'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import type { Result } from './Result'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import type { LazyArg } from './Function'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import * as io from './Sync'
import type { SyncResult } from './SyncResult'
import type * as monad from './Monad'
import * as option from './Option'
import * as optionT from './OptionT'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Sync } from './Sync'
import type { Option } from './Option'

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
 * @since 3.0.0
 */
export const emptyKind: <A>() => SyncOption<A> = /*#__PURE__*/ optionT.emptyKind(io.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: SyncOption<never> = /*#__PURE__*/ emptyKind()

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => SyncOption<A> = /*#__PURE__*/ optionT.some(io.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => SyncOption<A> = io.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <A>(e: Result<unknown, A>) => Sync<option.Option<A>> = /*#__PURE__*/ optionT.fromResult(
  io.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(ma: Sync<A>) => SyncOption<A> = /*#__PURE__*/ optionT.fromKind(io.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncEither: <A>(ma: SyncResult<unknown, A>) => SyncOption<A> = /*#__PURE__*/ io.map(option.fromResult)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: SyncOption<A>) => Sync<B | C> =
  /*#__PURE__*/ optionT.match(io.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchIO: <B, A, C = B>(
  onNone: LazyArg<Sync<B>>,
  onSome: (a: A) => Sync<C>
) => (ma: SyncOption<A>) => Sync<B | C> = /*#__PURE__*/ optionT.matchKind(io.Flattenable)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: B) => <A>(self: SyncOption<A>) => Sync<A | B> = /*#__PURE__*/ optionT.getOrElse(
  io.Functor
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseIO: <B>(onNone: Sync<B>) => <A>(self: SyncOption<A>) => Sync<A | B> =
  /*#__PURE__*/ optionT.getOrElseKind(io.Monad)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUndefined: <A>(self: SyncOption<A>) => Sync<A | undefined> = io.map(option.toUndefined)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toNull: <A>(self: SyncOption<A>) => Sync<A | null> = io.map(option.toNull)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: SyncOption<A>) => SyncOption<B> = /*#__PURE__*/ optionT.map(io.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => SyncOption<A> = some

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<SyncOptionTypeLambda> = {
  succeed
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => SyncOption<B>) => (self: SyncOption<A>) => SyncOption<B> =
  /*#__PURE__*/ optionT.flatMap(io.Monad)

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
export const composeKind: <B, C>(
  bfc: (b: B) => SyncOption<C>
) => <A>(afb: (a: A) => SyncOption<B>) => (a: A) => SyncOption<C> = /*#__PURE__*/ flattenable.composeKind(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ComposableKind: composableKind.ComposableKind<SyncOptionTypeLambda> = {
  composeKind
}

/**
 * @since 3.0.0
 */
export const idKind: <A>() => (a: A) => SyncOption<A> = /*#__PURE__*/ fromIdentity.idKind(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: categoryKind.CategoryKind<SyncOptionTypeLambda> = {
  composeKind,
  idKind
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (that: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: SyncOption<A>) => (self: SyncOption<unknown>) => SyncOption<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: SyncOption<A>) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: SyncOption<SyncOption<A>>) => SyncOption<A> = /*#__PURE__*/ flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <B>(that: LazyArg<SyncOption<B>>) => <A>(self: SyncOption<A>) => SyncOption<A | B> =
  /*#__PURE__*/ optionT.catchAll(io.Monad)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: SyncOption<B>) => <A>(self: SyncOption<A>) => SyncOption<A | B> =
  /*#__PURE__*/ optionT.orElse(io.Monad)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: SyncOption<A>) => SyncOption<B> =
  /*#__PURE__*/ filterable.filterMapComposition(io.Functor, option.Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: SyncOption<A>) => readonly [SyncOption<B>, SyncOption<C>] = /*#__PURE__*/ filterable.partitionMapComposition(
  io.Functor,
  option.Filterable
)

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
export const flap: <A>(a: A) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: SyncOption<unknown>) => SyncOption<B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: SyncOption<unknown>) => SyncOption<void> = /*#__PURE__*/ functor.unit(Functor)

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
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: SyncOption<A>, fb: SyncOption<B>) => SyncOption<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `SyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: SyncOption<A>, fb: SyncOption<B>, fc: SyncOption<C>) => SyncOption<D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<SyncOptionTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => SyncOption<unknown>) => (self: SyncOption<A>) => SyncOption<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: (onNone: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A> =
  /*#__PURE__*/ optionT.tapError(io.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<SyncOptionTypeLambda> = {
  combineKind: orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidKind: monoidKind.MonoidKind<SyncOptionTypeLambda> = {
  combineKind: orElse,
  emptyKind: emptyKind
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => SyncOption<void> = /*#__PURE__*/ monoidKind.guard(MonoidKind, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<SyncOptionTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: SyncOption<option.Option<A>>) => SyncOption<A> =
  /*#__PURE__*/ compactable.compactComposition(io.Functor, option.Compactable)

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
export const separate: <A, B>(fe: SyncOption<Result<A, B>>) => readonly [SyncOption<A>, SyncOption<B>] =
  /*#__PURE__*/ compactable.separate(Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<SyncOptionTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: SyncOption<C>) => SyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => SyncOption<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: SyncOption<C>
  ) => readonly [SyncOption<C>, SyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => readonly [SyncOption<B>, SyncOption<B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<SyncOptionTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => SyncOption<void> = /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => SyncOption<void> = /*#__PURE__*/ fromSync_.logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => SyncOption<B> =
  /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: SyncOption<A>) => SyncOption<B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

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
} = /*#__PURE__*/ fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => SyncOption<B> = /*#__PURE__*/ fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => SyncOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => SyncOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: SyncOption<A>) => SyncOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullable(
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
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => SyncOption<B> = /*#__PURE__*/ fromResult_.liftEither(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: SyncOption<A>) => SyncOption<B> =
  /*#__PURE__*/ fromResult_.flatMapEither(FromResult, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: SyncOption<{}> = /*#__PURE__*/ succeed(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: SyncOption<A>) => SyncOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: SyncOption<readonly []> = /*#__PURE__*/ succeed(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: SyncOption<A>) => SyncOption<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: SyncOption<B>
) => <A extends ReadonlyArray<unknown>>(self: SyncOption<A>) => SyncOption<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: SyncOption<B>, f: (a: A, b: B) => C) => (self: SyncOption<A>) => SyncOption<C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => SyncOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => SyncOption<ReadonlyNonEmptyArray<B>>) =>
  flow(io.traverseReadonlyNonEmptyArrayWithIndex(f), io.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => SyncOption<B>
): ((as: ReadonlyArray<A>) => SyncOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => SyncOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => SyncOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
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
  /*#__PURE__*/ traverseReadonlyArray(identity)
