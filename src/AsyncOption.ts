/**
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import type * as alt from './Alt'
import * as alternative from './Alternative'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import type { Result } from './Result'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import * as fromAsync_ from './FromAsync'
import type { LazyArg } from './Function'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type { SyncResult } from './SyncResult'
import type * as monad from './Monad'
import * as option from './Option'
import type { Option } from './Option'
import * as optionT from './OptionT'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import * as async from './Async'
import type { Async } from './Async'
import type { AsyncResult } from './AsyncResult'

/**
 * @category model
 * @since 3.0.0
 */
export interface AsyncOption<A> extends Async<Option<A>> {}

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: AsyncOption<never> = /*#__PURE__*/ optionT.none(async.FromIdentity)()

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => AsyncOption<A> = /*#__PURE__*/ optionT.some(async.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => AsyncOption<A> = async.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <A>(fa: Result<unknown, A>) => AsyncOption<A> = /*#__PURE__*/ optionT.fromResult(
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
export const fromAsync: <A>(fa: Async<A>) => AsyncOption<A> = /*#__PURE__*/ optionT.fromKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <A>(fa: SyncResult<unknown, A>) => AsyncOption<A> = /*#__PURE__*/ flow(
  async.fromSync,
  async.map(option.fromResult)
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncResult: <A>(fa: AsyncResult<unknown, A>) => AsyncOption<A> = /*#__PURE__*/ async.map(
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
  /*#__PURE__*/ optionT.match(async.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchAsync: <B, A, C = B>(
  onNone: LazyArg<Async<B>>,
  onSome: (a: A) => Async<C>
) => (ma: AsyncOption<A>) => Async<B | C> = /*#__PURE__*/ optionT.matchKind(async.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: B) => <A>(self: AsyncOption<A>) => Async<A | B> = /*#__PURE__*/ optionT.getOrElse(
  async.Functor
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseAsync: <B>(onNone: Async<B>) => <A>(self: AsyncOption<A>) => Async<A | B> =
  /*#__PURE__*/ optionT.getOrElseKind(async.Monad)

/**
 * Converts a `Promise` that may reject to a `AsyncOption`.
 *
 * @category interop
 * @see {@link liftRejectable}
 * @since 3.0.0
 */
export const fromRejectable =
  <A>(f: LazyArg<Promise<A>>): AsyncOption<A> =>
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
export const liftRejectable =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Promise<B>): ((...a: A) => AsyncOption<B>) =>
  (...a) =>
    fromRejectable(() => f(...a))

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
export const map: <A, B>(f: (a: A) => B) => (fa: AsyncOption<A>) => AsyncOption<B> = /*#__PURE__*/ optionT.map(
  async.Functor
)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => AsyncOption<B>) => (self: AsyncOption<A>) => AsyncOption<B> =
  /*#__PURE__*/ optionT.flatMap(async.Monad)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsyncResult: <A, B>(
  f: (a: A) => AsyncResult<unknown, B>
) => (ma: AsyncOption<A>) => AsyncOption<B> = /*#__PURE__*/ flow(liftAsyncResult, flatMap)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: AsyncOption<AsyncOption<A>>) => AsyncOption<A> = /*#__PURE__*/ flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <B>(that: LazyArg<AsyncOption<B>>) => <A>(self: AsyncOption<A>) => AsyncOption<A | B> =
  /*#__PURE__*/ optionT.catchAll(async.Monad)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: AsyncOption<B>) => <A>(self: AsyncOption<A>) => AsyncOption<A | B> =
  /*#__PURE__*/ optionT.orElse(async.Monad)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: AsyncOption<A>) => AsyncOption<B> =
  /*#__PURE__*/ filterable.filterMapComposition(async.Functor, option.Filterable)

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
export const flap: <A>(a: A) => <B>(fab: AsyncOption<(a: A) => B>) => AsyncOption<B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: AsyncOption<unknown>) => AsyncOption<B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: AsyncOption<unknown>) => AsyncOption<void> = /*#__PURE__*/ functor.unit(Functor)

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
) => <A>(afb: (a: A) => AsyncOption<B>) => (a: A) => AsyncOption<C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

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
export const idKleisli: <A>() => (a: A) => AsyncOption<A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

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
export const zipLeft: (that: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: AsyncOption<A>) => (self: AsyncOption<unknown>) => AsyncOption<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: AsyncOption<A>) => <B>(self: AsyncOption<(a: A) => B>) => AsyncOption<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

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
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `AsyncOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: AsyncOption<A>, fb: AsyncOption<B>, fc: AsyncOption<C>) => AsyncOption<D> = /*#__PURE__*/ apply.lift3(Apply)

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
export const tap: <A>(f: (a: A) => AsyncOption<unknown>) => (self: AsyncOption<A>) => AsyncOption<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: (onNone: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A> =
  /*#__PURE__*/ optionT.tapError(async.Monad)

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
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <A>(collection: Iterable<AsyncOption<A>>) => AsyncOption<A> =
  /*#__PURE__*/ alternative.firstSuccessOf(Alternative)

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => AsyncOption<void> = /*#__PURE__*/ alternative.guard(Alternative, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<AsyncOptionTypeLambda> = {
  fromSync: fromSync
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => AsyncOption<B> =
  /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: AsyncOption<A>) => AsyncOption<B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

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
} = /*#__PURE__*/ fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => AsyncOption<B> = /*#__PURE__*/ fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => AsyncOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AsyncOption<A>) => AsyncOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullable(
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
) => (...a: A) => AsyncOption<B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: AsyncOption<A>) => AsyncOption<B> =
  /*#__PURE__*/ fromResult_.flatMapResult(FromResult, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<AsyncOptionTypeLambda> = {
  fromSync: fromSync,
  fromAsync: fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => AsyncOption<void> = /*#__PURE__*/ fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <A>(self: AsyncOption<A>) => AsyncOption<A> = /*#__PURE__*/ fromAsync_.delay(
  FromAsync,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Async<B>) => (...a: A) => AsyncOption<B> =
  /*#__PURE__*/ fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(f: (a: A) => Async<B>) => (self: AsyncOption<A>) => AsyncOption<B> =
  /*#__PURE__*/ fromAsync_.flatMapAsync(FromAsync, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: AsyncOption<Option<A>>) => AsyncOption<A> = /*#__PURE__*/ compactable.compactComposition(
  async.Functor,
  option.Compactable
)

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
export const separate: <A, B>(fe: AsyncOption<Result<A, B>>) => readonly [AsyncOption<A>, AsyncOption<B>] =
  /*#__PURE__*/ compactable.separate(Functor, Compactable)

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
) => (fa: AsyncOption<A>) => readonly [AsyncOption<B>, AsyncOption<C>] =
  /*#__PURE__*/ filterable.partitionMap(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: AsyncOption<C>) => AsyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => AsyncOption<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: AsyncOption<C>
  ) => readonly [AsyncOption<C>, AsyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => readonly [AsyncOption<B>, AsyncOption<B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: AsyncOption<{}> = /*#__PURE__*/ some(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: AsyncOption<A>) => AsyncOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
  f: (a: A) => AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: AsyncOption<readonly []> = /*#__PURE__*/ some(_.empty)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: AsyncOption<A>) => AsyncOption<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: AsyncOption<B>
) => <A extends ReadonlyArray<unknown>>(self: AsyncOption<A>) => AsyncOption<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(
  that: AsyncOption<B>,
  f: (a: A, b: B) => C
) => (self: AsyncOption<A>) => AsyncOption<C> = /*#__PURE__*/ apply.zipWith(Apply)

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
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => AsyncOption<B>) =>
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
      f(0, _.head(as))().then(option.map(_.toNonEmptyArray))
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
  /*#__PURE__*/ traverseReadonlyArray(identity)
