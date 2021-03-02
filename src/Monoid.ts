/**
 * `Monoid` extends the power of `Semigroup` by providing an additional `empty` value.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 *
 * interface Monoid<A> extends Semigroup<A> {
 *   readonly empty: A
 * }
 * ```
 *
 * This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `x`.
 *
 * ```ts
 * concat(x, empty) = concat(empty, x) = x
 * ```
 *
 * Many types that form a `Semigroup` also form a `Monoid`, such as `number`s (with `0`) and `string`s (with `''`).
 *
 * ```ts
 * import { Monoid } from 'fp-ts/Monoid'
 *
 * const monoidString: Monoid<string> = {
 *   concat: (x, y) => x + y,
 *   empty: ''
 * }
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
import { Bounded } from './Bounded'
import { Endomorphism, getEndomorphismMonoid as getEM, getMonoid } from './function'
import { ReadonlyRecord } from './ReadonlyRecord'
import * as Se from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monoid<A> extends Se.Semigroup<A> {
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
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.min(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
export const min = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: Se.min(B).concat,
  empty: B.top
})
/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.max(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
export const max = <A>(B: Bounded<A>): Monoid<A> => ({
  concat: Se.max(B).concat,
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
 *
 * assert.deepStrictEqual(reverse(S.Monoid).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.10.0
 */
export const reverse = <A>(M: Monoid<A>): Monoid<A> => ({
  concat: Se.reverse(M).concat,
  empty: M.empty
})

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
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
 * assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 2.10.0
 */
export const struct = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<{ readonly [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  // tslint:disable-next-line: forin
  for (const key in monoids) {
    empty[key] = monoids[key].empty
  }
  return {
    concat: Se.struct(monoids).concat,
    empty
  }
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Monoid'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const M1 = tuple(S.Monoid, N.MonoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category combinators
 * @since 2.10.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<Readonly<A>> =>
  ({
    concat: Se.tuple(...(monoids as any)).concat,
    empty: monoids.map((m) => m.empty)
  } as any)

/**
 * @category instances
 * @since 2.0.0
 */
export const monoidVoid: Monoid<void> = {
  concat: Se.semigroupVoid.concat,
  empty: undefined
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
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([]), 0)
 *
 * @since 2.10.0
 */
export const concatAll = <A>(M: Monoid<A>): ((as: ReadonlyArray<A>) => A) => Se.concatAll(M)(M.empty)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `tuple` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getTupleMonoid: <T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
) => Monoid<{ [K in keyof T]: T[K] extends Se.Semigroup<infer A> ? A : never }> = tuple as any

/**
 * Use `struct` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getStructMonoid: <O extends ReadonlyRecord<string, any>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
) => Monoid<O> = struct

/**
 * Use `reverse` instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const getDualMonoid = reverse

/**
 * Use `max` instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
export const getJoinMonoid = max

/**
 * Use `min` instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
export const getMeetMonoid = min

/**
 * Use `concatAll` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const fold = concatAll

/**
 * Use `boolean.MonoidAll` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const monoidAll: Monoid<boolean> = {
  // tslint:disable-next-line: deprecation
  concat: Se.semigroupAll.concat,
  empty: true
}

/**
 * Use `boolean.MonoidAny` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const monoidAny: Monoid<boolean> = {
  // tslint:disable-next-line: deprecation
  concat: Se.semigroupAny.concat,
  empty: false
}

/**
 * Use `function.getMonoid` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getFunctionMonoid: <M>(M: Monoid<M>) => <A = never>() => Monoid<(a: A) => M> = getMonoid

/**
 * Use `function.getEndomorphismMonoid` instead.
 *
 * **Note**. The execution order in `function.getEndomorphismMonoid` is reversed.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => reverse(getEM())

/**
 * Use `string.Monoid` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const monoidString: Monoid<string> = {
  // tslint:disable-next-line: deprecation
  concat: Se.semigroupString.concat,
  empty: ''
}

/**
 * Use `number.MonoidSum` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const monoidSum: Monoid<number> = {
  // tslint:disable-next-line: deprecation
  concat: Se.semigroupSum.concat,
  empty: 0
}

/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const monoidProduct: Monoid<number> = {
  // tslint:disable-next-line: deprecation
  concat: Se.semigroupProduct.concat,
  empty: 1
}
