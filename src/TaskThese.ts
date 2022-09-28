/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Flattenable } from './Flattenable'
import type { Either, ValidatedTypeLambda } from './Either'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromTask_ from './FromTask'
import * as fromThese_ from './FromThese'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type { Monad } from './Monad'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as task from './Task'
import type { Task } from './Task'
import * as these from './These'
import type { These } from './These'
import * as theseT from './TheseT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => TaskThese<E, never> = /*#__PURE__*/ theseT.left(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => TaskThese<never, A> = /*#__PURE__*/ theseT.right(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = /*#__PURE__*/ theseT.both(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A>(ma: Task<A>) => TaskThese<never, A> = /*#__PURE__*/ theseT.rightF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E>(me: Task<E>) => TaskThese<E, never> = /*#__PURE__*/ theseT.leftF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A>(ma: IO<A>) => TaskThese<never, A> = /*#__PURE__*/ flow(task.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E>(me: IO<E>) => TaskThese<E, never> = /*#__PURE__*/ flow(task.fromIO, leftTask)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = /*#__PURE__*/ task.fromIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => TaskThese<E, A> = task.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromThese: <E, A>(fa: these.These<E, A>) => TaskThese<E, A> = task.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => TaskThese<never, A> = rightIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: <A>(fa: task.Task<A>) => TaskThese<never, A> = rightTask

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D> = /*#__PURE__*/ theseT.match(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchWithEffect: <E, B, A, C = B, D = B>(
  onError: (e: E) => task.Task<B>,
  onSuccess: (a: A) => task.Task<C>,
  onBoth: (e: E, a: A) => task.Task<D>
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D> = /*#__PURE__*/ theseT.matchWithEffect(task.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: task.Task<these.These<E, A>>) => task.Task<these.These<A, E>> = /*#__PURE__*/ theseT.swap(
  task.Functor
)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = /*#__PURE__*/ theseT.map(
  task.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: TaskThese<E, A>) => TaskThese<G, B> =
  /*#__PURE__*/ theseT.mapBoth(task.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: TaskThese<E, A>) => TaskThese<G, A> =
  /*#__PURE__*/ theseT.mapLeft(task.Functor)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => TaskThese<never, A> = right

/**
 * @since 3.0.0
 */
export const unit: TaskThese<never, void> = of(undefined)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(
  A: Apply<task.TaskTypeLambda>,
  S: Semigroup<E>
): Apply<ValidatedTypeLambda<TaskTheseTypeLambda, E>> => ({
  map,
  ap: theseT.ap(A, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(
  A: Apply<task.TaskTypeLambda>,
  S: Semigroup<E>
): Applicative<ValidatedTypeLambda<TaskTheseTypeLambda, E>> => {
  const AS = getApply(A, S)
  return {
    map,
    ap: AS.ap,
    of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <E>(S: Semigroup<E>): Flattenable<ValidatedTypeLambda<TaskTheseTypeLambda, E>> => ({
  map,
  flatMap: theseT.flatMap(task.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<ValidatedTypeLambda<TaskTheseTypeLambda, E>> => {
  const C = getFlattenable(S)
  return {
    map,
    of,
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskThese<E, (a: A) => B>) => TaskThese<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TaskTheseTypeLambda> = {
  of
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
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => TaskThese<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => TaskThese<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => TaskThese<E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => TaskThese<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskThese<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableK(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: fromThese_.FromThese<TaskTheseTypeLambda> = {
  fromThese
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTheseK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => these.These<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromThese_.fromTheseK(FromThese)

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
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => TaskThese<E, B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

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
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => TaskThese<never, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const toTuple2: <E, A>(e: LazyArg<E>, a: LazyArg<A>) => (fa: TaskThese<E, A>) => task.Task<readonly [E, A]> =
  /*#__PURE__*/ theseT.toTuple2(task.Functor)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const DoT: TaskThese<never, readonly []> = /*#__PURE__*/ of(_.DoT)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplyPar, S))`.
 *
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
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndexPar(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : DoT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplyPar, S))`.
 *
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
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArrayPar(S)(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.Apply, S))`.
 *
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
          these.isLeft(ebs)
            ? acc
            : f(i + 1, a)().then((eb) => {
                if (these.isLeft(eb)) {
                  return eb
                }
                if (these.isBoth(eb)) {
                  const right = ebs.right
                  right.push(eb.right)
                  return these.isBoth(ebs)
                    ? these.both(S.combine(eb.left)(ebs.left), right)
                    : these.both(eb.left, right)
                }
                ebs.right.push(eb.right)
                return ebs
              })
        ),
      f(0, _.head(as))().then(these.map(_.singleton))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.Applicative, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : DoT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.Apply, S))`.
 *
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
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)
