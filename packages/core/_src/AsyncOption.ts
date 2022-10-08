/**
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import * as alternative from '@fp-ts/core/Alternative'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type { Async } from '@fp-ts/core/Async'
import * as async from '@fp-ts/core/Async'
import type { AsyncResult } from '@fp-ts/core/AsyncResult'
import * as compactable from '@fp-ts/core/Compactable'
import * as filterable from '@fp-ts/core/Filterable'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as fromAsync_ from '@fp-ts/core/FromAsync'
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
import type { SyncResult } from '@fp-ts/core/SyncResult'

/**
 * @category model
 * @since 3.0.0
 */
export interface AsyncOption<A> extends Async<Option<A>> {}

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: AsyncOption<never> = optionT.none(async.FromIdentity)()

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => AsyncOption<A> = optionT.some(async.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => AsyncOption<A> = async.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <A>(fa: Result<unknown, A>) => AsyncOption<A> = optionT.fromResult(
  async.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(fa: Sync<A>) => AsyncOption<A> = (fa) => fromAsync(async.fromSync(fa))

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <A>(fa: Async<A>) => AsyncOption<A> = optionT.fromKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <A>(fa: SyncResult<unknown, A>) => AsyncOption<A> = flow(
  async.fromSync,
  async.map(option.fromResult)
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncResult: <A>(fa: AsyncResult<unknown, A>) => AsyncOption<A> = async.map(
  option.fromResult
)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: AsyncOption<A>) => Async<B | C> =
  optionT.match(async.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchAsync: <B, A, C = B>(
  onNone: LazyArg<Async<B>>,
  onSome: (a: A) => Async<C>
) => (ma: AsyncOption<A>) => Async<B | C> = optionT.matchKind(async.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: B) => <A>(self: AsyncOption<A>) => Async<A | B> = optionT.getOrElse(
  async.Functor
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseAsync: <B>(onNone: Async<B>) => <A>(self: AsyncOption<A>) => Async<A | B> = optionT
  .getOrElseKind(async.Monad)

/**
 * Converts a `Promise` that may reject to a `AsyncOption`.
 *
 * @category interop
 * @see {@link liftRejectable}
 * @since 3.0.0
 */
export const fromRejectable = <A>(f: LazyArg<Promise<A>>): AsyncOption<A> =>
  async () => {
    try {
      return await f().then(_.some)
    } catch (reason) {
      return _.none
    }
  }

/**
 * Lifts a function returning a `Promise` to one returning a `AsyncOption`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftRejectable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>
): ((...a: A) => AsyncOption<B>) => (...a) => fromRejectable(() => f(...a))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsyncResult = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => AsyncResult<unknown, B>
): ((...a: A) => AsyncOption<B>) => flow(f, fromAsyncResult)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: AsyncOption<A>) => AsyncOption<B> = optionT.map(
  async.Functor
)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => AsyncOption<B>) => (self: AsyncOption<A>) => AsyncOption<B> = optionT.flatMap(
  async.Monad
)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsyncResult: <A, B>(
  f: (a: A) => AsyncResult<unknown, B>
) => (ma: AsyncOption<A>) => AsyncOption<B> = flow(liftAsyncResult, flatMap)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: AsyncOption<AsyncOption<A>>) => AsyncOption<A> = flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <B>(that: LazyArg<AsyncOption<B>>) => <A>(self: AsyncOption<A>) => AsyncOption<A | B> = optionT
  .catchAll(async.Monad)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: AsyncOption<B>) => <A>(self: AsyncOption<A>) => AsyncOption<A | B> = optionT.orElse(
  async.Monad
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: AsyncOption<A>) => AsyncOption<B> = filterable
  .filterMapComposition(async.Functor, option.Filterable)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface AsyncOptionTypeLambda extends TypeLambda {
  readonly type: AsyncOption<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<AsyncOptionTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: AsyncOption<(a: A) => B>) => AsyncOption<B> = functor.flap(
  Functor
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: AsyncOption<unknown>) => AsyncOption<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: AsyncOption<unknown>) => AsyncOption<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<AsyncOptionTypeLambda> = {
  of: some
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<AsyncOptionTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(
  bfc: (b: B) => AsyncOption<C>
) => <A>(afb: (a: A) => AsyncOption<B>) => (a: A) => AsyncOption<C> = flattenable.composeKleisli(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<AsyncOptionTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => AsyncOption<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<AsyncOptionTypeLambda> = {
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
export const zipLeft: (that: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A> = flattenable.zipLeft(
  Flattenable
)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: AsyncOption<A>) => (self: AsyncOption<unknown>) => AsyncOption<A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: AsyncOption<A>) => <B>(self: AsyncOption<(a: A) => B>) => AsyncOption<B> = flattenable.ap(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<AsyncOptionTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `AsyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: AsyncOption<A>, fb: AsyncOption<B>) => AsyncOption<C> =
  apply.lift2(Apply)

/**
 * Lifts a ternary function into `AsyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: AsyncOption<A>, fb: AsyncOption<B>, fc: AsyncOption<C>) => AsyncOption<D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<AsyncOptionTypeLambda> = {
  map,
  ap,
  of: some
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => AsyncOption<unknown>) => (self: AsyncOption<A>) => AsyncOption<A> = flattenable.tap(
  Flattenable
)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: (onNone: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A> = optionT.tapError(
  async.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<AsyncOptionTypeLambda> = {
  map,
  of: some,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<AsyncOptionTypeLambda> = {
  orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: alternative.Alternative<AsyncOptionTypeLambda> = {
  orElse,
  none: () => none
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => AsyncOption<void> = alternative.guard(Alternative, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<AsyncOptionTypeLambda> = {
  fromSync
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => AsyncOption<B> =
  fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: AsyncOption<A>) => AsyncOption<B> = fromSync_
  .flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<AsyncOptionTypeLambda> = {
  fromOption
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => AsyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => AsyncOption<B>
} = fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => AsyncOption<B> = fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => AsyncOption<NonNullable<A>> = fromOption_.fromNullable(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncOption<NonNullable<B>> = fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AsyncOption<A>) => AsyncOption<NonNullable<B>> = fromOption_.flatMapNullable(
  FromOption,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<AsyncOptionTypeLambda> = {
  fromResult
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => AsyncOption<B> = fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: AsyncOption<A>) => AsyncOption<B> = fromResult_
  .flatMapResult(FromResult, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<AsyncOptionTypeLambda> = {
  fromSync,
  fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => AsyncOption<void> = fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <A>(self: AsyncOption<A>) => AsyncOption<A> = fromAsync_.delay(
  FromAsync,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Async<B>) => (...a: A) => AsyncOption<B> =
  fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(f: (a: A) => Async<B>) => (self: AsyncOption<A>) => AsyncOption<B> = fromAsync_
  .flatMapAsync(FromAsync, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: AsyncOption<option.Option<A>>) => AsyncOption<A> = compactable
  .compactComposition(async.Functor, option.Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<AsyncOptionTypeLambda> = {
  compact
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <A, B>(fe: AsyncOption<Result<A, B>>) => readonly [AsyncOption<A>, AsyncOption<B>] = compactable
  .separate(Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<AsyncOptionTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: AsyncOption<A>) => readonly [AsyncOption<B>, AsyncOption<C>] = filterable.partitionMap(
  Filterable
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: AsyncOption<C>) => AsyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => AsyncOption<B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: AsyncOption<C>
  ) => readonly [AsyncOption<C>, AsyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => readonly [AsyncOption<B>, AsyncOption<B>]
} = filterable.partition(Filterable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: AsyncOption<{}> = some(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: AsyncOption<A>) => AsyncOption<{ readonly [K in N]: A }> =
  functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
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
  f: (a: A) => AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: AsyncOption<readonly []> = some(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: AsyncOption<A>) => AsyncOption<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: AsyncOption<B>
) => <A extends ReadonlyArray<unknown>>(self: AsyncOption<A>) => AsyncOption<readonly [...A, B]> = apply
  .zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(
  that: AsyncOption<B>,
  f: (a: A, b: B) => C
) => (self: AsyncOption<A>) => AsyncOption<C> = apply.zipWith(Apply)

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
export const traverseNonEmptyReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
): ((as: NonEmptyReadonlyArray<A>) => AsyncOption<NonEmptyReadonlyArray<B>>) =>
  flow(async.traverseNonEmptyReadonlyArrayWithIndexPar(f), async.map(option.traverseNonEmptyReadonlyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
): ((as: ReadonlyArray<A>) => AsyncOption<ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <A, B>(
  f: (a: A) => AsyncOption<B>
): ((as: NonEmptyReadonlyArray<A>) => AsyncOption<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, B>(
  f: (a: A) => AsyncOption<B>
): ((as: ReadonlyArray<A>) => AsyncOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <A>(arr: ReadonlyArray<AsyncOption<A>>) => AsyncOption<ReadonlyArray<A>> =
  traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => AsyncOption<B>) =>
  (as: NonEmptyReadonlyArray<A>): AsyncOption<NonEmptyReadonlyArray<B>> =>
    () =>
      _.tail(as).reduce<Promise<Option<_.NonEmptyArray<B>>>>(
        (acc, a, i) =>
          acc.then((obs) =>
            _.isNone(obs)
              ? acc
              : f(i + 1, a)().then((ob) => {
                if (_.isNone(ob)) {
                  return ob
                }
                obs.value.push(ob.value)
                return obs
              })
          ),
        f(0, _.head(as))().then(option.map(_.singleton))
      )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
): ((as: ReadonlyArray<A>) => AsyncOption<ReadonlyArray<B>>) => {
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
  f: (a: A) => AsyncOption<B>
): ((as: NonEmptyReadonlyArray<A>) => AsyncOption<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => AsyncOption<B>
): ((as: ReadonlyArray<A>) => AsyncOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<AsyncOption<A>>) => AsyncOption<ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
