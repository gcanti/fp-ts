/**
 * `Monoid` extends the power of `Semigroup` by providing an additional `empty` value.
 *
 * ```ts
 * interface Monoid<A> extends Semigroup<A> {
 *   readonly empty: A
 * }
 * ```
 *
 * This `empty` value should be an identity for the `combine` operation, which means the following equalities hold for any choice of `a`.
 *
 * ```ts
 * a |> combine(empty) = empty |> combine(a) <-> a
 * ```
 *
 * @since 3.0.0
 */
import type { Bounded } from './Bounded'
import * as _ from './internal'
import * as semigroup from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monoid<A> extends semigroup.Semigroup<A> {
  readonly empty: A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @example
 * import { min } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = min(N.Bounded)
 *
 * assert.deepStrictEqual(pipe(1, M.combine(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(B: Bounded<A>): Monoid<A> => ({
  combine: semigroup.min(B).combine,
  empty: B.top
})

/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import { max } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = max(N.Bounded)
 *
 * assert.deepStrictEqual(pipe(1, M.combine(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(B: Bounded<A>): Monoid<A> => ({
  combine: semigroup.max(B).combine,
  empty: B.bottom
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @example
 * import { reverse } from 'fp-ts/Monoid'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = reverse(S.Monoid)
 * assert.deepStrictEqual(pipe('a', M.combine('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(M: Monoid<A>): Monoid<A> => ({
  combine: semigroup.reverse(M).combine,
  empty: M.empty
})

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const M = struct<Point>({
 *   x: N.MonoidSum,
 *   y: N.MonoidSum
 * })
 *
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, M.combine({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const struct = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<{ readonly [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  for (const k in monoids) {
    if (_.has.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return {
    combine: semigroup.struct(monoids).combine,
    empty
  }
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const M1 = tuple(S.Monoid, N.MonoidSum)
 * assert.deepStrictEqual(pipe(['a', 1], M1.combine(['b', 2])), ['ab', 3])
 *
 * const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], M2.combine(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<Readonly<A>> =>
  ({
    combine: semigroup.tuple(...monoids).combine,
    empty: monoids.map((m) => m.empty)
  } as any)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import { combineAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(combineAll(N.MonoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(combineAll(N.MonoidSum)([]), 0)
 *
 * @since 3.0.0
 */
export const combineAll = <A>(M: Monoid<A>): ((as: ReadonlyArray<A>) => A) => semigroup.combineAll(M)(M.empty)
