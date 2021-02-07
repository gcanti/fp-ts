/**
 * `Monoid` extends the power of `Semigroup` by providing an additional `empty` value.
 *
 * ```ts
 * interface Monoid<A> extends Semigroup<A> {
 *   readonly empty: A
 * }
 * ```
 *
 * This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `a`.
 *
 * ```ts
 * a |> concat(empty) = empty |> concat(a) <-> a
 * ```
 *
 * @since 3.0.0
 */
import { Bounded } from './Bounded'
import * as S from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get a monoid where `concat` will return the minimum, based on the provided bounded order.
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
 * assert.deepStrictEqual(pipe(1, M.concat(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: S.min(B).concat,
  empty: B.top
})

/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
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
 * assert.deepStrictEqual(pipe(1, M.concat(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: S.max(B).concat,
  empty: B.bottom
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Monoid'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = reverse(S.Monoid)
 * assert.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(M: Monoid<A>): Monoid<A> => ({
  concat: S.reverse(M).concat,
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
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, M.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const struct = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<A> => {
  const empty: A = {} as any
  // tslint:disable-next-line: forin
  for (const key in monoids) {
    empty[key] = monoids[key].empty
  }
  return {
    concat: S.struct(monoids).concat,
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
 * assert.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
 *
 * const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(...monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<A> =>
  ({
    concat: S.tuple(...monoids).concat,
    empty: monoids.map((m) => m.empty)
  } as any)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import { fold } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(fold(N.MonoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(fold(N.MonoidSum)([]), 0)
 *
 * @since 3.0.0
 */
export const fold = <A>(M: Monoid<A>): ((as: ReadonlyArray<A>) => A) => S.fold(M)(M.empty)
