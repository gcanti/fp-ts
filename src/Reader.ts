/**
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative'
import { Category2 } from './Category'
import { Choice2 } from './Choice'
import * as E from './Either'
import { bindTo_, bind_, flow, identity, pipe, constant } from './function'
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
export const ask: <R>() => Reader<R, R> = () => identity

/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = identity

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

/* istanbul ignore next */
const _map: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
const _compose: Category2<URI>['compose'] = (bc, ab) => pipe(bc, compose(ab))
const _promap: Profunctor2<URI>['promap'] = (fea, f, g) => pipe(fea, promap(f, g))
const _first: Strong2<URI>['first'] = (pab) => ([a, c]) => [pab(a), c]
const _second: Strong2<URI>['second'] = (pbc) => ([a, b]) => [a, pbc(b)]
const _left: Choice2<URI>['left'] = <A, B, C>(pab: Reader<A, B>): Reader<E.Either<A, C>, E.Either<B, C>> =>
  E.fold<A, C, E.Either<B, C>>((a) => E.left(pab(a)), E.right)
const _right: Choice2<URI>['right'] = <A, B, C>(pbc: Reader<B, C>): Reader<E.Either<A, B>, E.Either<A, C>> =>
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
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <Q, A>(fa: Reader<Q, A>) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<Q & R, B> = (fa) => (
  fab
) => (r) => fab(r)(fa(r))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> = apW

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A> = (fb) =>
  flow(
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond = <R, B>(fb: Reader<R, B>): (<A>(fa: Reader<R, A>) => Reader<R, B>) =>
  flow(
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export const of: Applicative2<URI>['of'] = constant

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
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C> = (ab) => (bc) => flow(ab, bc)

/**
 * @category Profunctor
 * @since 2.0.0
 */
export const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B> = (f, g) => (
  fea
) => (a) => g(fea(f(a)))

/**
 * @category Category
 * @since 2.0.0
 */
export const id: Category2<URI>['id'] = () => identity

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
  map: _map
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Profunctor: Profunctor2<URI> = {
  URI,
  map: _map,
  promap: _promap
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Category: Category2<URI> = {
  URI,
  compose: _compose,
  id
}

/**
 * @category instances
 * @since 2.8.3
 */
export const Strong: Strong2<URI> = {
  URI,
  map: _map,
  promap: _promap,
  first: _first,
  second: _second
}

/**
 * @category instances
 * @since 2.8.3
 */
export const Choice: Choice2<URI> = {
  URI,
  map: _map,
  promap: _promap,
  left: _left,
  right: _right
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  promap: _promap,
  compose: _compose,
  id,
  first: _first,
  second: _second,
  left: _left,
  right: _right
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N): (<R, A>(fa: Reader<R, A>) => Reader<R, { [K in N]: A }>) =>
  map(bindTo_(name))

/**
 * @since 2.8.0
 */
export const bindW = <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<Q, B>
): (<R>(fa: Reader<R, A>) => Reader<Q & R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  chainW((a) =>
    pipe(
      f(a),
      map((b) => bind_(a, name, b))
    )
  )

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: Reader<unknown, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const apSW = <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<Q, B>
): (<R>(fa: Reader<R, A>) => Reader<Q & R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    map((a) => (b: B) => bind_(a, name, b)),
    apW(fb)
  )

/**
 * @since 2.8.0
 */
export const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apSW

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 *
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>> = (f) => (arr) => (r) => arr.map((x, i) => f(i, x)(r))

/**
 * this function has the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export const traverseArray: <R, A, B>(
  f: (a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * this function has the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, Reader } from 'fp-ts/Reader'
 * import { pipe } from 'fp-ts/function'
 *
 * const add: (x: number) => Reader<{value:number}, number> = x => config => x + config.value
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)({value: 3}), pipe(arr, RA.map(x => x + 3)))
 *
 * @since 2.9.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<Reader<R, A>>) => Reader<R, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)
