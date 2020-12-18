/**
 * @since 3.0.0
 */
import { Applicative2 } from './Applicative'
import { apFirst_, apSecond_, apS_ } from './Apply'
import { Category2 } from './Category'
import { constant, flow, identity, pipe, tuple } from './function'
import { bindTo_, Functor2 } from './Functor'
import { bind_, chainFirst_, Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Profunctor2 } from './Profunctor'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const ask: <R>() => Reader<R, R> = () => identity

/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A> = (f) => (ma) => (q) => ma(f(q))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> = (f) => (fa) => (r) => f(fa(r))

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B> = (fa) => (
  fab
) => (r) => fab(r)(fa(r))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Applicative2<URI>['ap'] = apW

/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 3.0.0
 */
export const of: Applicative2<URI>['of'] = constant

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 3.0.0
 */
export const chainW: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B> = (f) => (
  fa
) => (r) => f(fa(r))(r)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad2<URI>['chain'] = chainW

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Semigroupoid
 * @since 3.0.0
 */
export const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C> = (ab) => (bc) => flow(ab, bc)

/**
 * @category Profunctor
 * @since 3.0.0
 */
export const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B> = (f, g) => (
  fea
) => (a) => g(fea(f(a)))

/**
 * @category Category
 * @since 3.0.0
 */
export const id: Category2<URI>['id'] = () => identity

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'Reader'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Reader<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> {
  return {
    concat: (second) => (first) => (e) => S.concat(second(e))(first(e))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: () => M.empty
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <R, B>(second: Reader<R, B>) => <A>(first: Reader<R, A>) => Reader<R, A> =
  /*#__PURE__*/
  apFirst_(Applicative)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <R, B>(second: Reader<R, B>) => <A>(first: Reader<R, A>) => Reader<R, B> =
  /*#__PURE__*/
  apSecond_(Applicative)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (first: Reader<R, A>) => Reader<R, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Profunctor: Profunctor2<URI> = {
  URI,
  map,
  promap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Category: Category2<URI> = {
  URI,
  compose,
  id
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <R, A>(fa: Reader<R, A>) => Reader<R, { [K in N]: A }> =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  bind_(Monad) as any

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Reader<unknown, {}> = of({})

/**
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  apS_(Applicative) as any

/**
 * @since 3.0.0
 */
export const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apSW

// -------------------------------------------------------------------------------------
// pipeable sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Reader<unknown, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled: <R, A>(a: Reader<R, A>) => Reader<R, readonly [A]> = map(tuple)

/**
 * @since 3.0.0
 */
export const apTW = <R2, B>(fb: Reader<R2, B>) => <R1, A extends ReadonlyArray<unknown>>(
  fas: Reader<R1, A>
): Reader<R1 & R2, readonly [...A, B]> =>
  pipe(
    fas,
    map((a) => (b: B): readonly [...A, B] => [...a, b]),
    apW(fb)
  )

/**
 * @since 3.0.0
 */
export const apT: <R, B>(
  fb: Reader<R, B>
) => <A extends ReadonlyArray<unknown>>(fas: Reader<R, A>) => Reader<R, readonly [...A, B]> = apTW

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 *
 * @since 3.0.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>> = (f) => (arr) => (r) => arr.map((x, i) => f(i, x)(r))

/**
 * this function have the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized
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
 * @since 3.0.0
 */
export const traverseArray: <R, A, B>(
  f: (a: A) => Reader<R, B>
) => (arr: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * this function have the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized
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
 * @since 3.0.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<Reader<R, A>>) => Reader<R, ReadonlyArray<A>> = traverseArray(
  identity
)
