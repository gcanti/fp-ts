/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import * as eitherT from './EitherT'
import { Lazy } from './function'
import { IO, io } from './IO'
import { Monad2 } from './Monad'
import { MonadThrow2 } from './MonadThrow'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    IOEither: IOEither<L, A>
  }
}

export const URI = 'IOEither'

export type URI = typeof URI

const T = eitherT.getEitherT(io)
const foldT = eitherT.fold(io)

/**
 * @since 1.6.0
 */
export interface IOEither<L, A> extends IO<E.Either<L, A>> {}

/**
 * @since 2.0.0
 */
export const run = <L, A>(fa: IOEither<L, A>): E.Either<L, A> => {
  return fa()
}

const map = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => B): IOEither<L, B> => {
  return T.map(fa, f)
}

/**
 * @since 2.0.0
 */
export const make = <A>(a: A): IOEither<never, A> => {
  return T.of(a)
}

const ap = <L, A, B>(fab: IOEither<L, (a: A) => B>, fa: IOEither<L, A>): IOEither<L, B> => {
  return T.ap(fab, fa)
}

const chain = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => IOEither<L, B>): IOEither<L, B> => {
  return T.chain(fa, f)
}

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(fa: IOEither<L, A>, f: (l: L) => IOEither<M, A>): IOEither<M, A> {
  return io.chain(fa, e => E.fold<L, A, IOEither<M, A>>(e, f, T.of))
}

/**
 * @since 2.0.0
 */
export const mapLeft = <L, A, M>(ma: IOEither<L, A>, f: (l: L) => M): IOEither<M, A> => {
  return io.map(ma, e => E.mapLeft(e, f))
}

/**
 * @since 2.0.0
 */
export const fold = <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): IO<R> => {
  return foldT(ma, onLeft, onRight)
}

const alt = <L, A>(fx: IOEither<L, A>, fy: IOEither<L, A>): IOEither<L, A> => {
  return orElse(fx, () => fy)
}

const bimap = <L, V, A, B>(fa: IOEither<L, A>, f: (l: L) => V, g: (a: A) => B): IOEither<V, B> => {
  return io.map(fa, e => E.either.bimap(e, f, g))
}

/**
 * @since 1.6.0
 */
export const right = <A>(fa: IO<A>): IOEither<never, A> => {
  return io.map(fa, E.right)
}

/**
 * @since 1.6.0
 */
export const left = <L>(fa: IO<L>): IOEither<L, never> => {
  return io.map(fa, E.left)
}

/**
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: E.Either<L, A>): IOEither<L, A> => {
  return io.of(fa)
}

/**
 * @since 1.6.0
 */
export const fromLeft = <L>(l: L): IOEither<L, never> => {
  return fromEither(E.left(l))
}

/**
 * @since 1.11.0
 */
export const tryCatch = <L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A> => {
  return () => E.tryCatch(f, onError)
}

const throwError = fromLeft

/**
 * @since 1.6.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  bimap,
  map,
  of: make,
  ap,
  chain,
  alt,
  throwError,
  fromEither,
  fromOption: (o, e) => (o._tag === 'None' ? throwError(e) : make(o.value))
}
