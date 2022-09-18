/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import type { Bifunctor as Bifunctor_ } from './Bifunctor'
import type { Chain } from './Chain'
import type { Either } from './Either'
import * as FromEitherModule from './FromEither'
import { FromIO as FromIO_, fromIOK as fromIOK_ } from './FromIO'
import { FromTask as FromTask_, fromTaskK as fromTaskK_ } from './FromTask'
import { FromThese as FromThese_, fromTheseK as fromTheseK_ } from './FromThese'
import { flow, identity, Lazy, SK } from './function'
import { flap as flap_, Functor as Functor_ } from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type { Monad } from './Monad'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import * as TT from './TheseT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import These = TH.These
import Task = T.Task

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => TaskThese<E, A> = /*#__PURE__*/ TT.left(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskThese<E, A> = /*#__PURE__*/ TT.right(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = /*#__PURE__*/ TT.both(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskThese<E, A> = /*#__PURE__*/ TT.rightF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskThese<E, A> = /*#__PURE__*/ TT.leftF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskThese<E, A> = /*#__PURE__*/ flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskThese<E, A> = /*#__PURE__*/ flow(T.fromIO, leftTask)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = /*#__PURE__*/ T.fromIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => TaskThese<E, A> = T.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromThese: <E, A>(fa: TH.These<E, A>) => TaskThese<E, A> = T.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: <A, E = never>(fa: IO<A>) => TaskThese<E, A> = rightIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: <A, E = never>(fa: T.Task<A>) => TaskThese<E, A> = rightTask

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
) => (ma: T.Task<TH.These<E, A>>) => T.Task<B | C | D> = /*#__PURE__*/ TT.match(T.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>,
  onBoth: (e: E, a: A) => T.Task<D>
) => (ma: T.Task<TH.These<E, A>>) => T.Task<B | C | D> = /*#__PURE__*/ TT.matchE(T.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: T.Task<TH.These<E, A>>) => T.Task<TH.These<A, E>> = /*#__PURE__*/ TT.swap(T.Functor)

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = /*#__PURE__*/ TT.map(
  T.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fea: TaskThese<E, A>) => TaskThese<G, B> = /*#__PURE__*/ TT.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: TaskThese<E, A>) => TaskThese<G, A> = /*#__PURE__*/ TT.mapLeft(
  T.Functor
)

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
export const getApply = <E>(A: Apply<T.TaskF>, S: Semigroup<E>): Apply<TaskTheseFFixedE<E>> => ({
  map,
  ap: TT.ap(A, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(A: Apply<T.TaskF>, S: Semigroup<E>): Applicative<TaskTheseFFixedE<E>> => {
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
export const getChain = <E>(S: Semigroup<E>): Chain<TaskTheseFFixedE<E>> => ({
  map,
  chain: TT.chain(T.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<TaskTheseFFixedE<E>> => {
  const C = getChain(S)
  return {
    map,
    of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<TaskTheseF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: TaskThese<E, (a: A) => B>) => TaskThese<E, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<TaskTheseF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<TaskTheseF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<TaskTheseF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(
  onNone: Lazy<E>
) => <A>(fa: Option<A>) => TaskThese<E, A> = /*#__PURE__*/ FromEitherModule.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ FromEitherModule.fromOptionK(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(
  predicate: Predicate<A>
) => (b: B) => TaskThese<B, B> = /*#__PURE__*/ FromEitherModule.fromPredicate(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (c: C) => TaskThese<C, B> = /*#__PURE__*/ FromEitherModule.fromRefinement(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ FromEitherModule.fromEitherK(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: FromThese_<TaskTheseF> = {
  fromThese
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTheseK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => TH.These<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromTheseK_(FromThese)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<TaskTheseF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <E>(...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_<TaskTheseF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => T.Task<B>
) => <E = never>(...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromTaskK_(FromTask)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const toTuple2: <E, A>(
  e: Lazy<E>,
  a: Lazy<A>
) => (fa: TaskThese<E, A>) => T.Task<readonly [E, A]> = /*#__PURE__*/ TT.toTuple2(T.Functor)

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
  const g = TH.traverseReadonlyNonEmptyArrayWithIndex(S)
  return (f) => flow(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(g(SK)))
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <E>(S: Semigroup<E>) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
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
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <E>(S: Semigroup<E>) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
) => (as: ReadonlyNonEmptyArray<A>): TaskThese<E, ReadonlyNonEmptyArray<B>> => () =>
  _.tail(as).reduce<Promise<These<E, NonEmptyArray<B>>>>(
    (acc, a, i) =>
      acc.then((ebs) =>
        TH.isLeft(ebs)
          ? acc
          : f(i + 1, a)().then((eb) => {
              if (TH.isLeft(eb)) {
                return eb
              }
              if (TH.isBoth(eb)) {
                const right = ebs.right
                right.push(eb.right)
                return TH.isBoth(ebs) ? TH.both(S.concat(eb.left)(ebs.left), right) : TH.both(eb.left, right)
              }
              ebs.right.push(eb.right)
              return ebs
            })
      ),
    f(0, _.head(as))().then(TH.map(_.singleton))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <E>(S: Semigroup<E>) => <A, B>(
  f: (index: number, a: A) => TaskThese<E, B>
): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
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
