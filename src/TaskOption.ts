/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import * as monoidK from './MonoidK'
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as flat from './Flat'
import * as compactable from './Compactable'
import type { Either } from './Either'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as formTask_ from './FromTask'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
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
import type { Separated } from './Separated'
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
export const matchE: <B, A, C = B>(
  onNone: LazyArg<Task<B>>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C> = /*#__PURE__*/ optionT.matchE(task.Monad)

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
export const getOrElseE: <B>(onNone: LazyArg<Task<B>>) => <A>(ma: TaskOption<A>) => Task<A | B> =
  /*#__PURE__*/ optionT.getOrElseE(task.Monad)

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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
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
export const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> =
  /*#__PURE__*/ optionT.ap(task.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => TaskOption<A> = some

/**
 * @category Flat
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
 * Derivable from `Flat`.
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
export const compact: <A>(foa: TaskOption<option.Option<A>>) => TaskOption<A> = /*#__PURE__*/ compactable.compact(
  task.Functor,
  option.Compactable
)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>> =
  /*#__PURE__*/ compactable.separate(task.Functor, option.Compactable, option.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ filterable.filterMap(task.Functor, option.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>> = /*#__PURE__*/ filterable.partitionMap(
  task.Functor,
  option.Filterable
)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TaskOptionF extends HKT {
  readonly type: TaskOption<this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskOptionF> = {
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
export const Pointed: pointed.Pointed<TaskOptionF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply<TaskOptionF> = {
  map,
  ap
}

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
export const ApplicativePar: Applicative<TaskOptionF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flat: flat.Flat<TaskOptionF> = {
  map,
  flatMap
}

const apSeq = /*#__PURE__*/ flat.ap(Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply<TaskOptionF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative<TaskOptionF> = {
  map,
  ap: apSeq,
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => TaskOption<_>) => (self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ flat.tap(Flat)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinatorsError
 * @since 3.0.0
 */
export const tapError: <_>(onNone: () => TaskOption<_>) => <A>(self: TaskOption<A>) => TaskOption<A> =
  /*#__PURE__*/ optionT.tapError(task.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskOptionF> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<TaskOptionF> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidK: monoidK.MonoidK<TaskOptionF> = {
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
export const FromIO: fromIO_.FromIO<TaskOptionF> = {
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
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<TaskOptionF> = {
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
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.flatMapNullableK(FromOption, Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskOptionF> = {
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
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: formTask_.FromTask<TaskOptionF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskOption<B> = /*#__PURE__*/ formTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskK: <A, B>(f: (a: A) => task.Task<B>) => (self: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/ formTask_.flatMapTaskK(FromTask, Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<TaskOptionF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<TaskOptionF> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: <B extends A, A = B>(predicate: Predicate<A>) => (fb: TaskOption<B>) => TaskOption<B> =
  /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @since 3.0.0
 */
export const refine: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: TaskOption<C>) => TaskOption<B> = /*#__PURE__*/ filterable.refine(Filterable)

/**
 * @since 3.0.0
 */
export const partition: <B extends A, A = B>(
  predicate: Predicate<A>
) => (fb: TaskOption<B>) => Separated<TaskOption<B>, TaskOption<B>> = /*#__PURE__*/ filterable.partition(Filterable)

/**
 * @since 3.0.0
 */
export const refinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: TaskOption<C>) => Separated<TaskOption<C>, TaskOption<B>> = /*#__PURE__*/ filterable.refinement(Filterable)

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
  /*#__PURE__*/ flat.bind(Flat)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: TaskOption<B>
) => (fa: TaskOption<A>) => TaskOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(ApplyPar)

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
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) =>
  flow(task.traverseReadonlyNonEmptyArrayWithIndex(f), task.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
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
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq =
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, B>(
  f: (a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <A>(arr: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArraySeq(identity)
