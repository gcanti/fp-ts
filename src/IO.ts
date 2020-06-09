/**
 * ```ts
 * interface IO<A> {
 *   (): A
 * }
 * ```
 *
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * @since 2.0.0
 */
import { ChainRec1 } from './ChainRec'
import { identity } from './function'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Apply1 } from './Apply'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'IO'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IO<A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export interface IO<A> {
  (): A
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B> = (f) => (fa) => map_(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <B>(fb: IO<B>) => <A>(fa: IO<A>): IO<B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * @category Applicative
 * @since 2.0.0
 */
export const of = <A>(a: A): IO<A> => () => a

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B> = (f) => (ma) => chain_(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <A>(mma: IO<IO<A>>) => IO<A> = (mma) => chain_(mma, identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const map_: <A, B>(fa: IO<A>, f: (a: A) => B) => IO<B> = (ma, f) => () => f(ma())
const ap_: <A, B>(fab: IO<(a: A) => B>, fa: IO<A>) => IO<B> = (mab, ma) => () => mab()(ma())
const chain_: <A, B>(fa: IO<A>, f: (a: A) => IO<B>) => IO<B> = (ma, f) => () => f(ma())()

/**
 * @internal
 */
export const applyIO: Apply1<URI> = {
  URI,
  map: map_,
  ap: ap_
}

/**
 * @internal
 */
export const monadIO: Monad1<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>> {
  return {
    concat: (x, y) => () => S.concat(x(), y())
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>> {
  return {
    concat: getSemigroup(M).concat,
    empty: of(M.empty)
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const io: Monad1<URI> & MonadIO1<URI> & ChainRec1<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_,
  fromIO: identity,
  chainRec: (a, f) => () => {
    let e = f(a)()
    while (e._tag === 'Left') {
      e = f(e.left)()
    }
    return e.right
  }
}
