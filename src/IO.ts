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

/**
 * @since 2.0.0
 */
export const URI = 'IO'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}

/**
 * @since 2.0.0
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>> {
  return {
    concat: (x, y) => () => S.concat(x(), y())
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>> {
  return { ...getSemigroup(M), empty: io.of(M.empty) }
}

/**
 * @since 2.0.0
 */
export const io: Monad1<URI> & MonadIO1<URI> = {
  URI,
  map: (ma, f) => () => f(ma()),
  of: a => () => a,
  ap: (mab, ma) => () => mab()(ma()),
  chain: (ma, f) => () => f(ma())(),
  fromIO: identity
}
