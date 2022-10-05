/**
 * @since 3.0.0
 */
import type * as categoryKind from './CategoryKind'
import type * as composableKind from './ComposableKind'
import type * as semigroupKind from './SemigroupKind'
import * as monoidKind from './MonoidKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import type { Result } from './Result'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './Function'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import * as option from './Option'
import type { Option } from './Option'
import * as optionT from './OptionT'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import * as task from './Task'
import type { Task } from './Task'
import type { TaskEither } from './TaskEither'

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

/**
 * @since 3.0.0
 */
export const emptyKind: <A>() => TaskOption<A> = /*#__PURE__*/ optionT.emptyKind(task.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: TaskOption<never> = /*#__PURE__*/ emptyKind()

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => TaskOption<A> = /*#__PURE__*/ optionT.some(task.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => TaskOption<A> = task.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEither: <A>(fa: Result<unknown, A>) => TaskOption<A> = /*#__PURE__*/ optionT.fromEither(
  task.FromIdentity
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIO: <A>(fa: Sync<A>) => TaskOption<A> = (ma) => fromTask(task.fromIO(ma))

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTask: <A>(fa: Task<A>) => TaskOption<A> = /*#__PURE__*/ optionT.fromKind(task.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIOEither: <A>(fa: IOEither<unknown, A>) => TaskOption<A> = /*#__PURE__*/ flow(
  task.fromIO,
  task.map(option.fromEither)
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A> = /*#__PURE__*/ task.map(
  option.fromEither
)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: TaskOption<A>) => Task<B | C> =
  /*#__PURE__*/ optionT.match(task.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchTask: <B, A, C = B>(
  onNone: LazyArg<Task<B>>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C> = /*#__PURE__*/ optionT.matchKind(task.Monad)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: B) => <A>(self: TaskOption<A>) => Task<A | B> = /*#__PURE__*/ optionT.getOrElse(
  task.Functor
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseTask: <B>(onNone: Task<B>) => <A>(self: TaskOption<A>) => Task<A | B> =
  /*#__PURE__*/ optionT.getOrElseKind(task.Monad)

/**
 * Converts a `Promise` that may reject to a `TaskOption`.
 *
 * @category interop
 * @see {@link liftRejectable}
 * @since 3.0.0
 */
export const fromRejectable =
  <A>(f: LazyArg<Promise<A>>): TaskOption<A> =>
  async () => {
    try {
      return await f().then(_.some)
    } catch (reason) {
      return _.none
    }
  }

/**
 * Lifts a function returning a `Promise` to one returning a `TaskOption`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftRejectable =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Promise<B>): ((...a: A) => TaskOption<B>) =>
  (...a) =>
    fromRejectable(() => f(...a))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTaskEither = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<unknown, B>
): ((...a: A) => TaskOption<B>) => flow(f, fromTaskEither)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B> = /*#__PURE__*/ optionT.map(
  task.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => TaskOption<A> = some

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => TaskOption<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ optionT.flatMap(task.Monad)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTaskEither: <A, B>(f: (a: A) => TaskEither<unknown, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ flow(liftTaskEither, flatMap)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> = /*#__PURE__*/ flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <B>(that: LazyArg<TaskOption<B>>) => <A>(self: TaskOption<A>) => TaskOption<A | B> =
  /*#__PURE__*/ optionT.catchAll(task.Monad)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: TaskOption<B>) => <A>(self: TaskOption<A>) => TaskOption<A | B> =
  /*#__PURE__*/ optionT.orElse(task.Monad)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ filterable.filterMapComposition(task.Functor, option.Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: TaskOption<A>) => readonly [TaskOption<B>, TaskOption<C>] = /*#__PURE__*/ filterable.partitionMapComposition(
  task.Functor,
  option.Filterable
)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TaskOptionTypeLambda extends TypeLambda {
  readonly type: TaskOption<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskOptionTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: TaskOption<unknown>) => TaskOption<B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: TaskOption<unknown>) => TaskOption<void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<TaskOptionTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<TaskOptionTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKind: <B, C>(
  bfc: (b: B) => TaskOption<C>
) => <A>(afb: (a: A) => TaskOption<B>) => (a: A) => TaskOption<C> = /*#__PURE__*/ flattenable.composeKind(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const ComposableKind: composableKind.ComposableKind<TaskOptionTypeLambda> = {
  composeKind
}

/**
 * @since 3.0.0
 */
export const idKind: <A>() => (a: A) => TaskOption<A> = /*#__PURE__*/ fromIdentity.idKind(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: categoryKind.CategoryKind<TaskOptionTypeLambda> = {
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
export const zipLeft: (that: TaskOption<unknown>) => <A>(self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: TaskOption<A>) => (self: TaskOption<unknown>) => TaskOption<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: TaskOption<A>) => <B>(self: TaskOption<(a: A) => B>) => TaskOption<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<TaskOptionTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `TaskOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: TaskOption<A>, fb: TaskOption<B>) => TaskOption<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `TaskOption`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: TaskOption<A>, fb: TaskOption<B>, fc: TaskOption<C>) => TaskOption<D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<TaskOptionTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => TaskOption<unknown>) => (self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: (onNone: TaskOption<unknown>) => <A>(self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ optionT.tapError(task.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskOptionTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<TaskOptionTypeLambda> = {
  combineKind: orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidKind: monoidKind.MonoidKind<TaskOptionTypeLambda> = {
  combineKind: orElse,
  emptyKind: emptyKind
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => TaskOption<void> = /*#__PURE__*/ monoidKind.guard(MonoidKind, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskOptionTypeLambda> = {
  fromIO
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => TaskOption<B> =
  /*#__PURE__*/ fromIO_.liftSync(FromIO)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromIO_.flatMapSync(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<TaskOptionTypeLambda> = {
  fromOption
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => TaskOption<B>
} = /*#__PURE__*/ fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullable(
  FromOption,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskOptionTypeLambda> = {
  fromEither
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ fromEither_.liftEither(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromEither_.flatMapEither(FromEither, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<TaskOptionTypeLambda> = {
  fromIO,
  fromTask
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => TaskOption<void> = /*#__PURE__*/ fromTask_.sleep(FromTask)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (duration: number) => <A>(self: TaskOption<A>) => TaskOption<A> = /*#__PURE__*/ fromTask_.delay(
  FromTask,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTask: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => TaskOption<B> =
  /*#__PURE__*/ fromTask_.liftTask(FromTask)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapTask: <A, B>(f: (a: A) => Task<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromTask_.flatMapTask(FromTask, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: TaskOption<option.Option<A>>) => TaskOption<A> =
  /*#__PURE__*/ compactable.compactComposition(task.Functor, option.Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<TaskOptionTypeLambda> = {
  compact
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <A, B>(fe: TaskOption<Result<A, B>>) => readonly [TaskOption<A>, TaskOption<B>] =
  /*#__PURE__*/ compactable.separate(Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<TaskOptionTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: TaskOption<C>) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => TaskOption<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: TaskOption<C>
  ) => readonly [TaskOption<C>, TaskOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => readonly [TaskOption<B>, TaskOption<B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: TaskOption<{}> = /*#__PURE__*/ succeed(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
  f: (a: A) => TaskOption<B>
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (self: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: TaskOption<readonly []> = /*#__PURE__*/ succeed(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: TaskOption<A>) => TaskOption<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: TaskOption<B>
) => <A extends ReadonlyArray<unknown>>(self: TaskOption<A>) => TaskOption<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: TaskOption<B>, f: (a: A, b: B) => C) => (self: TaskOption<A>) => TaskOption<C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndexPar(f), task.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => TaskOption<B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskOption<ReadonlyNonEmptyArray<B>> =>
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
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
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
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
