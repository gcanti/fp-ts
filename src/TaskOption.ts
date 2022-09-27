/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import * as monoidK from './MonoidK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import type { Either } from './Either'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import * as option from './Option'
import type { Option } from './Option'
import * as optionT from './OptionT'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import * as task from './Task'
import type { Task } from './Task'
import type { TaskEither } from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => TaskOption<A> = /*#__PURE__*/ optionT.some(task.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => TaskOption<A> = task.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(fa: Either<unknown, A>) => TaskOption<A> = /*#__PURE__*/ optionT.fromEither(task.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => TaskOption<A> = (ma) => fromTask(task.fromIO(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A>(fa: task.Task<A>) => TaskOption<A> = /*#__PURE__*/ optionT.fromF(task.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <A>(fa: IOEither<unknown, A>) => TaskOption<A> = /*#__PURE__*/ flow(
  task.fromIO,
  task.map(option.fromEither)
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: <A>(fa: TaskEither<unknown, A>) => TaskOption<A> = /*#__PURE__*/ task.map(
  option.fromEither
)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: TaskOption<A>) => Task<B | C> =
  /*#__PURE__*/ optionT.match(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchWithEffect: <B, A, C = B>(
  onNone: LazyArg<Task<B>>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C> = /*#__PURE__*/ optionT.matchWithEffect(task.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: LazyArg<B>) => <A>(ma: TaskOption<A>) => Task<A | B> =
  /*#__PURE__*/ optionT.getOrElse(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseWithEffect: <B>(onNone: LazyArg<Task<B>>) => <A>(ma: TaskOption<A>) => Task<A | B> =
  /*#__PURE__*/ optionT.getOrElseWithEffect(task.Monad)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * See also [`tryCatchK`](#tryCatchK).
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch =
  <A>(f: LazyArg<Promise<A>>): TaskOption<A> =>
  async () => {
    try {
      return await f().then(_.some)
    } catch (reason) {
      return _.none
    }
  }

/**
 * Converts a function returning a `Promise` to one returning a `TaskOption`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Promise<B>): ((...a: A) => TaskOption<B>) =>
  (...a) =>
    tryCatch(() => f(...a))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<unknown, B>
): ((...a: A) => TaskOption<B>) => flow(f, fromTaskEither)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B> = /*#__PURE__*/ optionT.map(
  task.Functor
)

/**
 * @category Apply
 * @since 3.0.0
 */
export const apPar: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> =
  /*#__PURE__*/ optionT.ap(task.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => TaskOption<A> = some

/**
 * @since 3.0.0
 */
export const unit: TaskOption<void> = of(undefined)

/**
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ optionT.flatMap(task.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskEitherK: <A, B>(f: (a: A) => TaskEither<unknown, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ flow(fromTaskEitherK, flatMap)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @category SemigroupK
 * @since 3.0.0
 */
export const combineK: <B>(second: LazyArg<TaskOption<B>>) => <A>(self: TaskOption<A>) => TaskOption<A | B> =
  /*#__PURE__*/ optionT.combineK(task.Monad)

/**
 * @category MonoidK
 * @since 3.0.0
 */
export const emptyK: <A>() => TaskOption<A> = /*#__PURE__*/ optionT.emptyK(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: TaskOption<never> = /*#__PURE__*/ emptyK()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: TaskOption<option.Option<A>>) => TaskOption<A> =
  /*#__PURE__*/ compactable.getCompactComposition(task.Functor, option.Compactable)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: TaskOption<Either<A, B>>) => readonly [TaskOption<A>, TaskOption<B>] =
  /*#__PURE__*/ compactable.getSeparateComposition(task.Functor, option.Compactable, option.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ filterable.getFilterMapComposition(task.Functor, option.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => readonly [TaskOption<B>, TaskOption<C>] =
  /*#__PURE__*/ filterable.getPartitionMapComposition(task.Functor, option.Filterable)

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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TaskOptionTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: apply.Apply<TaskOptionTypeLambda> = {
  map,
  ap: apPar
}

/**
 * Lifts a binary function into `TaskOption` in parallel.
 *
 * @since 3.0.0
 */
export const lift2Par: <A, B, C>(f: (a: A, b: B) => C) => (fa: TaskOption<A>, fb: TaskOption<B>) => TaskOption<C> =
  /*#__PURE__*/ apply.lift2(ApplyPar)

/**
 * Lifts a ternary function into `TaskOption` in parallel.
 *
 * @since 3.0.0
 */
export const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: TaskOption<A>, fb: TaskOption<B>, fc: TaskOption<C>) => TaskOption<D> = /*#__PURE__*/ apply.lift3(ApplyPar)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <B>(second: TaskOption<B>) => <A>(self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ apply.zipLeftPar(ApplyPar)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <B>(second: TaskOption<B>) => <A>(self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ apply.zipRightPar(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<TaskOptionTypeLambda> = {
  map,
  ap: apPar,
  of
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
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: TaskOption<A>, fb: TaskOption<B>) => TaskOption<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `TaskOption`.
 *
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
  ap: ap,
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => TaskOption<_>) => (self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinatorsError
 * @since 3.0.0
 */
export const tapError: <_>(onNone: () => TaskOption<_>) => <A>(self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ optionT.tapNone(task.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskOptionTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<TaskOptionTypeLambda> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidK: monoidK.MonoidK<TaskOptionTypeLambda> = {
  combineK,
  emptyK
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => TaskOption<void> = /*#__PURE__*/ monoidK.guard(MonoidK, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskOptionTypeLambda> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => TaskOption<B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<TaskOptionTypeLambda> = {
  fromOption
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => TaskOption<B> =
  /*#__PURE__*/ fromOption_.fromPredicate(FromOption)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (c: C) => TaskOption<B> = /*#__PURE__*/ fromOption_.fromRefinement(FromOption)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ fromOption_.fromOptionK(FromOption)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.fromNullableK(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullableK(
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
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flattenable)

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
 * @category combinators
 * @since 3.0.0
 */
export const delay: (duration: number) => <A>(self: TaskOption<A>) => TaskOption<A> = /*#__PURE__*/ fromTask_.delay(
  FromTask,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskK: <A, B>(f: (a: A) => task.Task<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ fromTask_.flatMapTaskK(FromTask, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<TaskOptionTypeLambda> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<TaskOptionTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: TaskOption<C>) => TaskOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: TaskOption<B>) => TaskOption<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
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
 * @since 3.0.0
 */
export const Do: TaskOption<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(fa: TaskOption<A>) => TaskOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => TaskOption<B>
) => (ma: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: TaskOption<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <A>(fa: TaskOption<A>) => TaskOption<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <B>(
  fb: TaskOption<B>
) => <A extends ReadonlyArray<unknown>>(fas: TaskOption<A>) => TaskOption<readonly [...A, B]> =
  /*#__PURE__*/ apply.apT(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndexPar(f), task.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
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
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
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
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
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
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
