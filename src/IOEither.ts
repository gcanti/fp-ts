/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { getEitherM } from './EitherT'
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

const eitherT = getEitherM(io)

/**
 * @since 2.0.0
 */
export interface IOEither<L, A> extends IO<E.Either<L, A>> {}

/**
 * @since 2.0.0
 */
export function run<L, A>(fa: IOEither<L, A>): E.Either<L, A> {
  return fa()
}

/**
 * @since 2.0.0
 */
export const fromRight: <A>(a: A) => IOEither<never, A> = eitherT.of

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(fa: IOEither<L, A>, f: (l: L) => IOEither<M, A>): IOEither<M, A> {
  return io.chain(fa, e => E.fold<L, A, IOEither<M, A>>(e, f, eitherT.of))
}

/**
 * @since 2.0.0
 */
export function mapLeft<L, A, M>(ma: IOEither<L, A>, f: (l: L) => M): IOEither<M, A> {
  return io.map(ma, e => E.mapLeft(e, f))
}

/**
 * @since 2.0.0
 */
export const fold: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => IO<R> = eitherT.fold

/**
 * @since 2.0.0
 */
export function right<A>(fa: IO<A>): IOEither<never, A> {
  return io.map(fa, E.right)
}

/**
 * @since 2.0.0
 */
export function left<L>(fa: IO<L>): IOEither<L, never> {
  return io.map(fa, E.left)
}

/**
 * @since 2.0.0
 */
export function fromLeft<L>(l: L): IOEither<L, never> {
  return io.of(E.left(l))
}

/**
 * @since 2.0.0
 */
export function tryCatch<L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A> {
  return () => E.tryCatch(f, onError)
}

/**
 * @since 2.0.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  bimap: (ma, f, g) => io.map(ma, e => E.either.bimap(e, f, g)),
  map: eitherT.map,
  of: fromRight,
  ap: eitherT.ap,
  chain: eitherT.chain,
  alt: orElse,
  throwError: fromLeft,
  fromEither: io.of,
  fromOption: (o, onNone) => (o._tag === 'None' ? fromLeft(onNone()) : fromRight(o.value))
}
