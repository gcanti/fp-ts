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
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * const M1 = M.getMeetMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(pipe(1, M1.concat(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: S.getMeetSemigroup(B).concat,
  empty: B.top
})

/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * const M1 = M.getJoinMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(pipe(1, M1.concat(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: S.getJoinSemigroup(B).concat,
  empty: B.bottom
})

/**
 * @category constructors
 * @since 2.10.0
 */
export const getUnitMonoid = <A>(a: A): Monoid<A> => ({
  concat: S.getUnitSemigroup(a).concat,
  empty: a
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { getDual } from 'fp-ts/Monoid'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getDual(S.Monoid)
 * assert.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const getDual = <A>(M: Monoid<A>): Monoid<A> => ({
  concat: S.getDual(M).concat,
  empty: M.empty
})

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const monoidPoint = M.getStructMonoid<Point>({
 *   x: M.monoidSum,
 *   y: M.monoidSum
 * })
 *
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, monoidPoint.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const getStructMonoid = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<A> => {
  const empty: A = {} as any
  // tslint:disable-next-line: forin
  for (const key in monoids) {
    empty[key] = monoids[key].empty
  }
  return {
    concat: S.getStructSemigroup(monoids).concat,
    empty
  }
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 *
 * const M1 = M.getTupleMonoid(S.Monoid, M.monoidSum)
 * assert.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
 *
 * const M2 = M.getTupleMonoid(S.Monoid, M.monoidSum, B.MonoidAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const getTupleMonoid = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<A> =>
  ({
    concat: S.getTupleSemigroup(...monoids).concat,
    empty: monoids.map((m) => m.empty)
  } as any)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { monoidSum } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, monoidSum.concat(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const monoidSum: Monoid<number> = {
  concat: S.semigroupSum.concat,
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { monoidProduct } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, monoidProduct.concat(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const monoidProduct: Monoid<number> = {
  concat: S.semigroupProduct.concat,
  empty: 1
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.fold(M.monoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(M.fold(M.monoidSum)([]), 0)
 *
 * @since 3.0.0
 */
export const fold = <A>(M: Monoid<A>): ((as: ReadonlyArray<A>) => A) => S.fold(M)(M.empty)
