/**
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative'
import { Category2 } from './Category'
import { Choice2 } from './Choice'
import * as E from './Either'
import * as F from './function'
import { Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R>() => Reader<R, R> = () => F.identity

/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = (f) => (r) => f(r)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.0.0
 */
export const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A> = (f) => (ma) => (q) => ma(f(q))

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Monad2<URI>['map'] = (fa, f) => F.pipe(fa, map(f))
const ap_: Monad2<URI>['ap'] = (fab, fa) => F.pipe(fab, ap(fa))
/* istanbul ignore next */
const chain_: Monad2<URI>['chain'] = (ma, f) => F.pipe(ma, chain(f))
const compose_: <E, A, B>(ab: Reader<A, B>, la: Reader<E, A>) => Reader<E, B> = (ab, la) => (l) => ab(la(l))
const promap_: <E, A, D, B>(fbc: Reader<E, A>, f: (d: D) => E, g: (a: A) => B) => Reader<D, B> = (mbc, f, g) => (a) =>
  g(mbc(f(a)))
const first_: Strong2<URI>['first'] = (pab) => ([a, c]) => [pab(a), c]
const second_: Strong2<URI>['second'] = (pbc) => ([a, b]) => [a, pbc(b)]
const left_: Choice2<URI>['left'] = <A, B, C>(pab: Reader<A, B>): Reader<E.Either<A, C>, E.Either<B, C>> =>
  E.fold<A, C, E.Either<B, C>>((a) => E.left(pab(a)), E.right)
const right_: Choice2<URI>['right'] = <A, B, C>(pbc: Reader<B, C>): Reader<E.Either<A, B>, E.Either<A, C>> =>
  E.fold<A, B, E.Either<A, C>>(E.left, (b) => E.right(pbc(b)))

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
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> = (f) => (fa) => (r) => f(fa(r))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> = (fa) => (fab) => (r) =>
  fab(r)(fa(r))

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst = <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>): Reader<R, A> =>
  F.pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>): Reader<R, B> =>
  F.pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 2.0.0
 */
export const of: Applicative2<URI>['of'] = (a) => () => a

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R, A, B>(f: (a: A) => Reader<R, B>) => <Q>(ma: Reader<Q, A>) => Reader<Q & R, B> = (f) => (
  fa
) => (r) => f(fa(r))(r)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B> = chainW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A> = (f) =>
  chain((a) =>
    F.pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> =
  /*#__PURE__*/
  chain(F.identity)

/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export const compose: <E, A>(la: Reader<E, A>) => <B>(ab: Reader<A, B>) => Reader<E, B> = (la) => (ab) =>
  compose_(ab, la)

/**
 * @category Profunctor
 * @since 2.0.0
 */
export const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B> = (f, g) => (
  fbc
) => promap_(fbc, f, g)

/**
 * @category Category
 * @since 2.0.0
 */
export const id: Category2<URI>['id'] = () => F.identity

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Reader'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Reader<E, A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> {
  return {
    concat: (x, y) => (e) => S.concat(x(e), y(e))
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: () => M.empty
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Profunctor: Profunctor2<URI> = {
  URI,
  map: map_,
  promap: promap_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Category: Category2<URI> = {
  URI,
  compose: compose_,
  id
}

/**
 * @internal instances
 */
export const Strong: Strong2<URI> = {
  URI,
  map: map_,
  promap: promap_,
  first: first_,
  second: second_
}

/**
 * @internal instances
 */
export const Choice: Choice2<URI> = {
  URI,
  map: map_,
  promap: promap_,
  left: left_,
  right: right_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_,
  promap: promap_,
  compose: compose_,
  id,
  first: first_,
  second: second_,
  left: left_,
  right: right_
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N) => <R, A>(fa: Reader<R, A>): Reader<R, { [K in N]: A }> =>
  F.pipe(
    fa,
    map((a) => F.bind_({}, name, a))
  )

/**
 * @since 2.8.0
 */
export const bindW = <N extends string, A, Q, B>(name: Exclude<N, keyof A>, f: (a: A) => Reader<Q, B>) => <R>(
  fa: Reader<R, A>
): Reader<Q & R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
  F.pipe(
    fa,
    chainW((a) =>
      F.pipe(
        f(a),
        map((b) => F.bind_(a, name, b))
      )
    )
  )

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW
