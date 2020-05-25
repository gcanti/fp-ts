/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { identity, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3, Monad3C } from './Monad'
import { MonadTask3, MonadTask3C } from './MonadTask'
import { MonadThrow3, MonadThrow3C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { pipe } from './pipeable'
import { getSemigroup as getReaderSemigroup, Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import { getReaderM } from './ReaderT'
import { monadReaderTask, ReaderTask } from './ReaderTask'
import { Semigroup } from './Semigroup'
import { Task } from './Task'
import * as TE from './TaskEither'
import { getValidationM } from './ValidationT'

import TaskEither = TE.TaskEither

const T = /*#__PURE__*/ getReaderM(TE.monadTaskEither)

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderTaskEither: ReaderTaskEither<R, E, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'ReaderTaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

/**
 * @since 2.0.0
 */
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> {
  return ma(r)()
}

/**
 * @since 2.0.0
 */
export function left<R, E = never, A = never>(e: E): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A> = T.of

/**
 * @since 2.0.0
 */
export function rightTask<R, E = never, A = never>(ma: Task<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<R, E = never, A = never>(me: Task<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftTask(me))
}

/**
 * @since 2.0.0
 */
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> = T.fromM

/**
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = T.fromReader

/**
 * @since 2.5.0
 */
export function leftReaderTask<R, E = never, A = never>(me: ReaderTask<R, E>): ReaderTaskEither<R, E, A> {
  return (r) => TE.leftTask(me(r))
}

/**
 * @since 2.5.0
 */
export function rightReaderTask<R, E = never, A = never>(ma: ReaderTask<R, A>): ReaderTaskEither<R, E, A> {
  return (r) => TE.rightTask(ma(r))
}

/**
 * @since 2.0.0
 */
export function leftReader<R, E = never, A = never>(me: Reader<R, E>): ReaderTaskEither<R, E, A> {
  return (r) => TE.left(me(r))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> {
  return (r) => TE.fromEither(ma(r))
}

/**
 * @since 2.0.0
 */
export function rightIO<R, E = never, A = never>(ma: IO<A>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<R, E = never, A = never>(me: IO<E>): ReaderTaskEither<R, E, A> {
  return fromTaskEither(TE.leftIO(me))
}

/**
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
 * @since 2.0.0
 */
export function getOrElse<R, E, A>(
  onLeft: (e: E) => ReaderTask<R, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> {
  return (ma) => (r) => TE.getOrElse<E, A>((e) => onLeft(e)(r))(ma(r))
}

/**
 * @since 2.6.0
 */
export const getOrElseW: <Q, E, B>(
  onLeft: (e: E) => ReaderTask<Q, B>
) => <R, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R & Q, A | B> = getOrElse as any

/**
 * @since 2.0.0
 */
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> {
  return (ma) => (r) => TE.orElse<E, A, M>((e) => onLeft(e)(r))(ma(r))
}

/**
 * @since 2.0.0
 */
export function swap<R, E, A>(ma: ReaderTaskEither<R, E, A>): ReaderTaskEither<R, A, E> {
  return (e) => TE.swap(ma(e))
}

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return getReaderSemigroup(TE.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> {
  return getReaderSemigroup(TE.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderTaskEither<R, E, A>> {
  return {
    concat: getApplySemigroup<R, E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> = T.ask

/**
 * @since 2.0.0
 */
export const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> = T.asks

/**
 * @since 2.0.0
 */
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> {
  return (ma) => T.local(ma, f)
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
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

/**
 * @since 2.3.0
 */
export function getReaderTaskValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E> {
  const T = getValidationM(S, monadReaderTask)
  return {
    _E: undefined as any,
    ...readerTaskEither,
    ...T
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> {
  return chain<any, E, A, B>(fromEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> {
  return chain<any, E, A, B>(fromIOEitherK(f))
}

/**
 * @since 2.4.0
 */
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromTaskEither(f(...a))
}

/**
 * @since 2.4.0
 */
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> {
  return chain<any, E, A, B>(fromTaskEitherK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const alt_: <R, E, A>(
  fx: ReaderTaskEither<R, E, A>,
  fy: () => ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, A> = (fx, fy) => (r) =>
  pipe(
    fx(r),
    TE.alt(() => fy()(r))
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
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderTaskEither<R, E, A>
) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (that) => (fa) => alt_(fa, that)

/**
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>
) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> = (fa) => (fab) => T.ap(fab, fa)

/**
 * @since 2.0.0
 */

export const apFirst: <R, E, B>(
  fb: ReaderTaskEither<R, E, B>
) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (fb) => (fa) =>
  T.ap(
    T.map(fa, (a) => () => a),
    fb
  )

/**
 * @since 2.0.0
 */
export const apSecond: <R, E, B>(
  fb: ReaderTaskEither<R, E, B>
) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = (fb) => (fa) =>
  T.ap(
    T.map(fa, () => (b) => b),
    fb
  )

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> = (f, g) => (fa) => bimap_(fa, f, g)

/**
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = (f) => (ma) => T.chain(ma, f)

/**
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A> = (
  mma
) => T.chain(mma, identity)

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = (
  f
) => (fa) => T.map(fa, f)

/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> = (
  f
) => (fa) => mapLeft_(fa, f)

/**
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: Either<E, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

/**
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A> = (onNone) => (
  ma
) => (ma._tag === 'None' ? left(onNone()) : right(ma.value))

/**
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(ma: ReaderTaskEither<R, E, A>) =>
  T.chain(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const monadReaderTaskEither: Monad3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain
}

/**
 * @since 2.0.0
 */
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadTask3<URI> & MonadThrow3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: alt_,
  bimap: bimap_,
  mapLeft: mapLeft_,
  fromIO: rightIO,
  fromTask: rightTask,
  throwError: left
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither =
  /*@__PURE__*/
  ((): typeof readerTaskEither => {
    return {
      ...readerTaskEither,
      ap: (mab, ma) => T.chain(mab, (f) => T.map(ma, f))
    }
  })()

/**
 * @since 2.6.0
 */
export const chainW: <Q, D, A, B>(
  f: (a: A) => ReaderTaskEither<Q, D, B>
) => <R, E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R & Q, E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <R, E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E | D, B> = chainEitherK as any

/**
 * @since 2.6.1
 */
export const chainTaskEitherKW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <R, E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E | D, B> = chainTaskEitherK as any

/**
 * @since 2.6.1
 */
export const chainIOEitherKW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <R, E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E | D, B> = chainIOEitherK as any
