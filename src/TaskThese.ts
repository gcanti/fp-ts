/**
 * @since 2.4.0
 */
import { Applicative2C } from './Applicative'
import { Apply1, Apply2C, getApplySemigroup } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { Either } from './Either'
import {
  FromEither2,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { FromIO2, fromIOK as fromIOK_ } from './FromIO'
import { FromTask2, fromTaskK as fromTaskK_ } from './FromTask'
import { FromThese2, fromTheseK as fromTheseK_ } from './FromThese'
import { flow, Lazy, pipe, SK } from './function'
import { flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
import { NonEmptyArray } from './NonEmptyArray'
import { Option } from './Option'
import { Pointed2 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import * as TT from './TheseT'

import These = TH.These
import Task = T.Task

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

/**
 * @category constructors
 * @since 2.4.0
 */
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> = /*#__PURE__*/ TT.left(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> = /*#__PURE__*/ TT.right(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = /*#__PURE__*/ TT.both(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> = /*#__PURE__*/ TT.rightF(T.Functor)

/**
 * @category constructors
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> = /*#__PURE__*/ TT.leftF(T.Functor)

/**
 * @category constructors
 * @since 2.4.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => TaskThese<E, A> = /*#__PURE__*/ flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 2.4.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => TaskThese<E, A> = /*#__PURE__*/ flow(T.fromIO, leftTask)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => TaskThese<E, A> = T.of

/**
 * @category natural transformations
 * @since 2.11.0
 */
export const fromThese: <E, A>(fa: These<E, A>) => TaskThese<E, A> = T.of

/**
 * @category natural transformations
 * @since 2.7.0
 */
export const fromIO: <A, E = never>(fa: IO<A>) => TaskThese<E, A> = rightIO

/**
 * @category natural transformations
 * @since 2.4.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = /*#__PURE__*/ T.fromIO

/**
 * @category natural transformations
 * @since 2.7.0
 */
export const fromTask: <A, E = never>(fa: Task<A>) => TaskThese<E, A> = rightTask

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: TaskThese<E, A>) => Task<B> = /*#__PURE__*/ TT.match(T.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchW: <E, B, A, C, D>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (ma: TaskThese<E, A>) => T.Task<B | C | D> = match as any

/**
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchE: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
) => (fa: TaskThese<E, A>) => Task<B> = /*#__PURE__*/ TT.matchE(T.Monad)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.4.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW: <E, B, A, C, D>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<C>,
  onBoth: (e: E, a: A) => Task<D>
) => (fa: TaskThese<E, A>) => Task<B | C | D> = fold as any

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchEW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> = /*#__PURE__*/ TT.swap(T.Functor)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.4.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = /*#__PURE__*/ TT.map(
  T.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> =
  /*#__PURE__*/ TT.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> = /*#__PURE__*/ TT.mapLeft(
  T.Functor
)

/**
 * @category Pointed
 * @since 2.7.0
 */
export const of: <E = never, A = never>(a: A) => TaskThese<E, A> = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.4.0
 */
export const URI = 'TaskThese'

/**
 * @category instances
 * @since 2.4.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getApply = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Apply2C<URI, E> => {
  const ap = TT.ap(A, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E> {
  const { ap } = getApply(A, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap,
    of
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export function getChain<E>(S: Semigroup<E>): Chain2C<URI, E> {
  const A = getApply(T.ApplicativePar, S)
  const chain = TT.chain(T.Monad, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    chain: (ma, f) => pipe(ma, chain(f))
  }
}

/**
 * @category instances
 * @since 2.4.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  const A = getApplicative(T.ApplicativePar, S)
  const C = getChain(S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    of,
    chain: C.chain,
    fromIO,
    fromTask
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither
}

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => TaskThese<E, A> =
  /*#__PURE__*/ fromOption_(FromEither)

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => TaskThese<E, B> =
  /*#__PURE__*/ fromOptionK_(FromEither)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => TaskThese<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => TaskThese<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => TaskThese<E, A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

/**
 * @category instances
 * @since 2.11.0
 */
export const FromThese: FromThese2<URI> = {
  URI,
  fromThese
}

/**
 * @category combinators
 * @since 2.11.0
 */
export const fromTheseK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => TH.These<E, B>
) => (...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromTheseK_(FromThese)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <E = never>(...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask2<URI> = {
  URI,
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => T.Task<B>
) => <E = never>(...a: A) => TaskThese<E, B> = /*#__PURE__*/ fromTaskK_(FromTask)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: TaskThese<E, A>) => Task<readonly [E, A]> =
  /*#__PURE__*/ TT.toTuple2(T.Functor)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const ApT: TaskThese<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.
 *
 * @since 2.11.0
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
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(T.ApplicativeSeq, S))`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): TaskThese<E, ReadonlyNonEmptyArray<B>> =>
  () =>
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
                  return TH.isBoth(ebs) ? TH.both(S.concat(ebs.left, eb.left), right) : TH.both(eb.left, right)
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
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndexSeq =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => TaskThese<E, B>): ((as: ReadonlyArray<A>) => TaskThese<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndexSeq(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
  }

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`Functor`](#functor) instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const functorTaskThese: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Use [`Bifunctor`](#bifunctor) instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const bifunctorTaskThese: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * Use [`toTuple2`](#totuple2) instead.
 *
 * @since 2.4.0
 * @deprecated
 */
export const toTuple = <E, A>(e: E, a: A): ((fa: TaskThese<E, A>) => Task<[E, A]>) =>
  toTuple2(
    () => e,
    () => a
  ) as any

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `TT.Functor` instead of `TT.taskThese`
 * (where `TT` is from `import TT from 'fp-ts/TaskThese'`)
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const taskThese: Functor2<URI> & Bifunctor2<URI> = {
  URI,
  map: _map,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const getSemigroup = <E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> =>
  getApplySemigroup(T.ApplySeq)(TH.getSemigroup(SE, SA))
