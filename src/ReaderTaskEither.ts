/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C } from './Applicative'
import { apComposition, Apply1 } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import * as E from './Either'
import { flow, identity, Lazy, pipe, Predicate, Refinement } from './function'
import { Functor3 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3, Monad3C } from './Monad'
import { MonadIO3 } from './MonadIO'
import { MonadTask3, MonadTask3C } from './MonadTask'
import { MonadThrow3, MonadThrow3C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import * as R from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RT from './ReaderTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TE from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either
import Task = T.Task
import TaskEither = TE.TaskEither
import Reader = R.Reader
import ReaderTask = RT.ReaderTask

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export function left<R, E = never, A = never>(e: E): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.left(e))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A> = (a) => () => TE.right(a)

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightTask<R, E = never, A = never>(ma: Task<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftTask<R, E = never, A = never>(me: Task<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftTask(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = (ma) => (r) =>
  TE.right(ma(r))

/**
 * @category constructors
 * @since 2.5.0
 */
export function leftReaderTask<R, E = never, A = never>(me: ReaderTask<R, E>): ReaderTaskEither<R, E, A> {
  return (r) => TE.leftTask(me(r))
}

/**
 * @category constructors
 * @since 2.5.0
 */
export function rightReaderTask<R, E = never, A = never>(ma: ReaderTask<R, A>): ReaderTaskEither<R, E, A> {
  return (r) => TE.rightTask(ma(r))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftReader<R, E = never, A = never>(me: Reader<R, E>): ReaderTaskEither<R, E, A> {
  return (r) => TE.left(me(r))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> {
  return (r) => TE.fromEither(ma(r))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightIO<R, E = never, A = never>(ma: IO<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftIO<R, E = never, A = never>(me: IO<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftIO(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> = () => TE.right

/**
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> = (f) => (r) =>
  pipe(TE.right(r), TE.map(f))

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: Either<E, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A> = (onNone) => (
  ma
) => (ma._tag === 'None' ? left(onNone()) : right(ma.value))

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export function fold<R, E, A, B>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> {
  return (ma) => (r) =>
    pipe(
      ma(r),
      TE.fold(
        (e) => onLeft(e)(r),
        (a) => onRight(a)(r)
      )
    )
}

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW = <R, E, B>(
  onLeft: (e: E) => ReaderTask<R, B>
): (<Q, A>(ma: ReaderTaskEither<Q, E, A>) => ReaderTask<Q & R, A | B>) => (ma) => (r) =>
  TE.getOrElseW((e: E) => onLeft(e)(r))(ma(r))

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <R, E, A>(
  onLeft: (e: E) => ReaderTask<R, A>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> = getOrElseW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.0.0
 */
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> {
  return (ma) => (r) => TE.orElse<E, A, M>((e) => onLeft(e)(r))(ma(r))
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function swap<R, E, A>(ma: ReaderTaskEither<R, E, A>): ReaderTaskEither<R, A, E> {
  return (e) => TE.swap(ma(e))
}

// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> =
  R.local

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(ma: ReaderTaskEither<R, E, A>) =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromIOEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromTaskEither(f(...a))
}

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainTaskEitherKW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainTaskEitherKW

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = (
  f
) => (fa) => flow(fa, TE.map(f))

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> = (f, g) => (fa) => bimap_(fa, f, g)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> = (
  f
) => (fa) => mapLeft_(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>
) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> = (fa) => (fab) => (r) =>
  pipe(fab(r), TE.ap(fa(r)))

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <R, E, B>(
  fb: ReaderTaskEither<R, E, B>
) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (fb) => (fa) =>
  pipe(
    fa,
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <R, E, B>(fb: ReaderTaskEither<R, E, B>) => <A>(
  fa: ReaderTaskEither<R, E, A>
): ReaderTaskEither<R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, D | E, B> = (f) => (fa) => (r) =>
  pipe(
    fa(r),
    TE.chainW((a) => f(a)(r))
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderTaskEither<R, E, A>
) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (that) => (fa) => alt_(fa, that)

/**
 * @category MonadIO
 * @since 2.0.0
 */
export const fromIO: MonadIO3<URI>['fromIO'] = rightIO

/**
 * @category MonadTask
 * @since 2.0.0
 */
export const fromTask: MonadTask3<URI>['fromTask'] = rightTask

/**
 * @category MonadThrow
 * @since 2.0.0
 */
export const throwError: MonadThrow3<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'ReaderTaskEither'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderTaskEither<R, E, A>
  }
}

const map_: Monad3<URI>['map'] = (fa, f) => pipe(fa, map(f))
const apPar_: Monad3<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const apSeq_: Monad3<URI>['ap'] = (fab, fa) => chain_(fab, (f) => map_(fa, f))
const of = right
const chain_: Monad3<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
const alt_: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>,
  that: Lazy<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, A> = (fa, that) => (r) =>
  pipe(
    fa(r),
    TE.alt(() => that()(r))
  )
const bimap_: <R, E, A, G, B>(
  fea: ReaderTaskEither<R, E, A>,
  f: (e: E) => G,
  g: (a: A) => B
) => ReaderTaskEither<R, G, B> = (ma, f, g) => (e) => pipe(ma(e), TE.bimap(f, g))
const mapLeft_: <R, E, A, G>(fea: ReaderTaskEither<R, E, A>, f: (e: E) => G) => ReaderTaskEither<R, G, A> = (ma, f) => (
  e
) => pipe(ma(e), TE.mapLeft(f))

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return R.getSemigroup(TE.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return R.getSemigroup(TE.getApplySemigroup<E, A>(S))
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderTaskEither<R, E, A>> {
  return {
    concat: getApplySemigroup<R, E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderTaskValidation<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative3C<URI, E> {
  const ap = apComposition(R.applicativeReader, TE.getApplicativeTaskValidation(A, S))
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getAltReaderTaskValidation<E>(S: Semigroup<E>): Alt3C<URI, E> {
  const A = TE.getAltTaskValidation(S)
  return {
    URI,
    _E: undefined as any,
    map: map_,
    alt: (me, that) => (r) => A.alt(me(r), () => that()(r))
  }
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
export function getReaderTaskValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E> {
  const applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(T.applicativeTaskPar, S)
  const altReaderTaskValidation = getAltReaderTaskValidation(S)
  return {
    URI,
    _E: undefined as any,
    map: map_,
    of,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    ap: applicativeReaderTaskValidation.ap,
    alt: altReaderTaskValidation.alt,
    fromIO,
    fromTask,
    throwError
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorReaderTaskEither: Functor3<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeReaderTaskEitherPar: Applicative3<URI> = {
  URI,
  map: map_,
  ap: apPar_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeReaderTaskEitherSeq: Applicative3<URI> = {
  URI,
  map: map_,
  ap: apSeq_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const bifunctorReaderTaskEither: Bifunctor3<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const altReaderTaskEither: Alt3<URI> = {
  URI,
  map: map_,
  alt: alt_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadTask3<URI> & MonadThrow3<URI> = {
  URI,
  map: map_,
  of,
  ap: apPar_,
  chain: chain_,
  alt: alt_,
  bimap: bimap_,
  mapLeft: mapLeft_,
  fromIO,
  fromTask,
  throwError
}

// TODO: remove in v3
/**
 * Like `readerTaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  URI,
  map: map_,
  of,
  ap: apSeq_,
  chain: chain_,
  alt: alt_,
  bimap: bimap_,
  mapLeft: mapLeft_,
  fromIO,
  fromTask,
  throwError
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

// TODO: remove in v3
/**
 * @since 2.0.0
 */
/* istanbul ignore next */
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> {
  return ma(r)()
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.4
 */
export function bracket<R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B> {
  return (r) =>
    TE.bracket(
      aquire(r),
      (a) => use(a)(r),
      (a, e) => release(a, e)(r)
    )
}
