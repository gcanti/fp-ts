/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Flat } from './Flat'
import type { Either } from './Either'
import * as fromEither_ from './FromEither'
import * as FromIO_ from './FromIO'
import * as FromTask_ from './FromTask'
import * as FromThese_ from './FromThese'
import type { Lazy } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
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

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => TaskThese<E, A> = /*#__PURE__*/ theseT.left(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskThese<E, A> = /*#__PURE__*/ theseT.right(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = /*#__PURE__*/ theseT.both(task.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskThese<E, A> = /*#__PURE__*/ theseT.rightF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskThese<E, A> = /*#__PURE__*/ theseT.leftF(task.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskThese<E, A> = /*#__PURE__*/ flow(task.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskThese<E, A> = /*#__PURE__*/ flow(task.fromIO, leftTask)

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
export const fromIO: <A, E = never>(fa: IO<A>) => TaskThese<E, A> = rightIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: <A, E = never>(fa: task.Task<A>) => TaskThese<E, A> = rightTask

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D> = /*#__PURE__*/ theseT.match(task.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => task.Task<B>,
  onRight: (a: A) => task.Task<C>,
  onBoth: (e: E, a: A) => task.Task<D>
) => (ma: task.Task<these.These<E, A>>) => task.Task<B | C | D> = /*#__PURE__*/ theseT.matchE(task.Monad)

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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = /*#__PURE__*/ theseT.map(
  task.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: TaskThese<E, A>) => TaskThese<G, B> =
  /*#__PURE__*/ theseT.bimap(task.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: TaskThese<E, A>) => TaskThese<G, A> =
  /*#__PURE__*/ theseT.mapLeft(task.Functor)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => TaskThese<E, A> = right

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TaskTheseF extends HKT {
  readonly type: TaskThese<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TaskTheseFFixedE<E> extends HKT {
  readonly type: TaskThese<E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(A: Apply<task.TaskF>, S: Semigroup<E>): Apply<TaskTheseFFixedE<E>> => ({
  map,
  ap: theseT.ap(A, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(A: Apply<task.TaskF>, S: Semigroup<E>): Applicative<TaskTheseFFixedE<E>> => {
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
export const getFlat = <E>(S: Semigroup<E>): Flat<TaskTheseFFixedE<E>> => ({
  map,
  flatMap: theseT.flatMap(task.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<TaskTheseFFixedE<E>> => {
  const C = getFlat(S)
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
export const Functor: functor.Functor<TaskTheseF> = {
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
export const Pointed: pointed.Pointed<TaskTheseF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TaskTheseF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TaskTheseF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskThese<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.fromOptionKOrElse(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => (b: B) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => (c: C) => TaskThese<E, B> = /*#__PURE__*/ fromEither_.fromRefinementOrElse(FromEither)

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
export const fromNullableOrElse: <E>(onNullable: Lazy<E>) => <A>(a: A) => TaskThese<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskThese<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableKOrElse(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: FromThese_.FromThese<TaskTheseF> = {
  fromThese
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTheseK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => these.These<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ FromThese_.fromTheseK(FromThese)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_.FromIO<TaskTheseF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => TaskThese<E, B> =
  /*#__PURE__*/ FromIO_.fromIOK(FromIO)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_.FromTask<TaskTheseF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => task.Task<B>
) => <E = never>(...a: A) => TaskThese<E, B> = /*#__PURE__*/ FromTask_.fromTaskK(FromTask)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: TaskThese<E, A>) => task.Task<readonly [E, A]> =
  /*#__PURE__*/ theseT.toTuple2(task.Functor)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: TaskThese<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplyPar, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <E>(
  S: Semigroup<E>
): (<A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
  const g = these.traverseReadonlyNonEmptyArrayWithIndex(S)
  return (f) => flow(task.traverseReadonlyNonEmptyArrayWithIndex(f), task.map(g(SK)))
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplyPar, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndex(S)
  return <A, B>(
    f: (a: A) => TaskThese<E, B>
  ): ((as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativePar, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativePar, S))`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(T.ApplySeq, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq =
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndexSeq(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(T.ApplySeq, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <E>(S: Semigroup<E>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndexSeq(S)
  return <A, B>(
    f: (a: A) => TaskThese<E, B>
  ): ((as: ReadonlyNonEmptyArray<A>) => TaskThese<E, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativeSeq, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndexSeq(S)
  return <A, B>(f: (a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativeSeq, S))`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<TaskThese<E, A>>) => TaskThese<E, ReadonlyArray<A>>) => traverseReadonlyArraySeq(S)(identity)
