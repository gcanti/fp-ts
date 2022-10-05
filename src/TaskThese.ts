/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Flattenable } from './Flattenable'
import type { Result, ValidatedT } from './Result'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import * as fromThese_ from './FromThese'
import { flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type { Monad } from './Monad'
import type { Option } from './Option'
import type * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as task from './Task'
import type { Task } from './Task'
import * as these from './These'
import type { These } from './These'
import * as theseT from './TheseT'

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TaskTheseTypeLambda extends TypeLambda {
  readonly type: TaskThese<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => TaskThese<E, never> = /*#__PURE__*/ theseT.fail(task.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => TaskThese<never, A> = /*#__PURE__*/ theseT.succeed(task.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = /*#__PURE__*/ theseT.both(task.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromTask: <A>(ma: Task<A>) => TaskThese<never, A> = /*#__PURE__*/ theseT.fromKind(task.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const leftTask: <E>(me: Task<E>) => TaskThese<E, never> = /*#__PURE__*/ theseT.leftKind(task.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIO: <A>(ma: IO<A>) => TaskThese<never, A> = /*#__PURE__*/ flow(task.fromIO, fromTask)

/**
 * @category conversions
 * @since 3.0.0
 */
export const leftIO: <E>(me: IO<E>) => TaskThese<E, never> = /*#__PURE__*/ flow(task.fromIO, leftTask)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = /*#__PURE__*/ task.fromIO

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Result<E, A>) => TaskThese<E, A> = task.succeed

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromThese: <E, A>(fa: these.These<E, A>) => TaskThese<E, A> = task.succeed

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (self: TaskThese<E, A>) => Task<B | C | D> = /*#__PURE__*/ theseT.match(task.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchTask: <E, B, A, C = B, D = B>(
  onError: (e: E) => Task<B>,
  onSuccess: (a: A) => Task<C>,
  onBoth: (e: E, a: A) => Task<D>
) => (self: TaskThese<E, A>) => Task<B | C | D> = /*#__PURE__*/ theseT.matchKind(task.Monad)

/**
 * @since 3.0.0
 */
export const swap: <E, A>(self: Task<these.These<E, A>>) => Task<these.These<A, E>> = /*#__PURE__*/ theseT.swap(
  task.Functor
)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = /*#__PURE__*/ theseT.map(
  task.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: TaskThese<E, A>) => TaskThese<G, B> =
  /*#__PURE__*/ theseT.mapBoth(task.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: TaskThese<E, A>) => TaskThese<G, A> =
  /*#__PURE__*/ theseT.mapError(task.Functor)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(
  Apply: Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
): Apply<ValidatedT<TaskTheseTypeLambda, E>> => ({
  map,
  ap: theseT.ap(Apply, Semigroup)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(
  Apply: Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
): Applicative<ValidatedT<TaskTheseTypeLambda, E>> => {
  const AS = getApply(Apply, Semigroup)
  return {
    map,
    ap: AS.ap,
    succeed
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <E>(S: Semigroup<E>): Flattenable<ValidatedT<TaskTheseTypeLambda, E>> => ({
  map,
  flatMap: theseT.flatMap(task.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<ValidatedT<TaskTheseTypeLambda, E>> => {
  const C = getFlattenable(S)
  return {
    map,
    succeed,
    flatMap: C.flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskTheseTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskThese<E, (a: A) => B>) => TaskThese<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: TaskThese<E, unknown>) => TaskThese<E, B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: TaskThese<E, unknown>) => TaskThese<E, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<TaskTheseTypeLambda> = {
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TaskTheseTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskTheseTypeLambda> = {
  fromEither
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => TaskThese<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.liftOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => TaskThese<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => TaskThese<E, B>
} = /*#__PURE__*/ fromEither_.liftPredicate(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.liftEither(FromEither)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => TaskThese<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => TaskThese<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.liftNullable(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: fromThese_.FromThese<TaskTheseTypeLambda> = {
  fromThese
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftThese: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => these.These<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromThese_.liftThese(FromThese)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskTheseTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => TaskThese<never, void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => TaskThese<never, void> = /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftIO: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => TaskThese<E, B> =
  /*#__PURE__*/ fromIO_.liftIO(FromIO)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<TaskTheseTypeLambda> = {
  fromIO,
  fromTask
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => TaskThese<never, void> = /*#__PURE__*/ fromTask_.sleep(FromTask)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftTask: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
) => (...a: A) => TaskThese<never, B> = /*#__PURE__*/ fromTask_.liftTask(FromTask)

/**
 * @since 3.0.0
 */
export const toTuple2: <E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => Task<readonly [E, A]> =
  /*#__PURE__*/ theseT.toTuple2(task.Functor)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: TaskThese<never, readonly []> = /*#__PURE__*/ succeed(_.Zip)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplyPar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar = <E>(
  S: Semigroup<E>
): (<A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
  const g = these.traverseReadonlyNonEmptyArrayWithIndex(S)
  return (f) => flow(task.traverseReadonlyNonEmptyArrayWithIndexPar(f), task.map(g(SK)))
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndexPar(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplyPar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <E>(S: Semigroup<E>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndexPar(S)
  return <A, B>(
    f: (a: A) => TaskThese<E, B>
  ): ((as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndexPar(S)
  return <A, B>(f: (a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArrayPar(S)(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.Apply, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskThese<E, ReadonlyNonEmptyArray<B>> =>
  () =>
    _.tail(as).reduce<Promise<These<E, _.NonEmptyArray<B>>>>(
      (acc, a, i) =>
        acc.then((ebs) =>
          these.isFailure(ebs)
            ? acc
            : f(i + 1, a)().then((eb) => {
                if (these.isFailure(eb)) {
                  return eb
                }
                if (these.isBoth(eb)) {
                  const success = ebs.success
                  success.push(eb.success)
                  return these.isBoth(ebs)
                    ? these.both(S.combine(eb.failure)(ebs.failure), success)
                    : these.both(eb.failure, success)
                }
                ebs.success.push(eb.success)
                return ebs
              })
        ),
      f(0, _.head(as))().then(these.map(_.singleton))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.Apply, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndex(S)
  return <A, B>(
    f: (a: A) => TaskThese<E, B>
  ): ((as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)
