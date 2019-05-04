/**
 * @file `IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 */
import { identity } from './function'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'

declare module './HKT' {
  interface URI2HKT<A> {
    IO: IO<A>
  }
}

export const URI = 'IO'

export type URI = typeof URI

export interface IO<A> {
  (): A
}

const map = <A, B>(fa: IO<A>, f: (a: A) => B): IO<B> => {
  return () => f(fa())
}

const of = <A>(a: A): IO<A> => {
  return () => a
}

const ap = <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => {
  return () => fab()(fa())
}

const chain = <A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> => {
  return () => f(fa())()
}

/**
 * @since 2.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => {
  return {
    concat: (x, y) => () => S.concat(x(), y())
  }
}

/**
 * @since 2.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => {
  return { ...getSemigroup(M), empty: of(M.empty) }
}

/**
 * @since 2.0.0
 */
export const io: Monad1<URI> & MonadIO1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO: identity
}
