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
import { Endomorphism, identity } from './function'
import { ReadonlyRecord } from './ReadonlyRecord'
import * as S from './Semigroup'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidAll.concat(true, true), true)
 * assert.deepStrictEqual(M.monoidAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidAll: Monoid<boolean> = {
  concat: S.semigroupAll.concat,
  empty: true
}

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidAny.concat(true, true), true)
 * assert.deepStrictEqual(M.monoidAny.concat(true, false), true)
 * assert.deepStrictEqual(M.monoidAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidAny: Monoid<boolean> = {
  concat: S.semigroupAny.concat,
  empty: false
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.0.0
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
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidProduct: Monoid<number> = {
  concat: S.semigroupProduct.concat,
  empty: 1
}

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(M.monoidString.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.0.0
 */
export const monoidString: Monoid<string> = {
  concat: S.semigroupString.concat,
  empty: ''
}

/**
 * @category instances
 * @since 2.0.0
 */
export const monoidVoid: Monoid<void> = {
  concat: S.semigroupVoid.concat,
  empty: undefined
}

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
 * @since 2.0.0
 */
export function fold<A>(M: Monoid<A>): (as: ReadonlyArray<A>) => A {
  return S.fold(M)(M.empty)
}

/**
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/Monoid'
 *
 * const M1 = getTupleMonoid(monoidString, monoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category instances
 * @since 2.0.0
 */
export function getTupleMonoid<T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
): Monoid<{ [K in keyof T]: T[K] extends S.Semigroup<infer A> ? A : never }> {
  return {
    concat: S.getTupleSemigroup(...monoids).concat,
    empty: monoids.map((m) => m.empty)
  } as any
}

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { getDualMonoid, monoidString } from 'fp-ts/Monoid'
 *
 * assert.deepStrictEqual(getDualMonoid(monoidString).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.0.0
 */
export function getDualMonoid<A>(M: Monoid<A>): Monoid<A> {
  return {
    concat: S.getDualSemigroup(M).concat,
    empty: M.empty
  }
}

/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/function'
 * import * as M from 'fp-ts/Monoid'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = M.getFunctionMonoid(M.monoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = M.getFunctionMonoid(M.monoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.0.0
 */
export function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M> {
  return () => ({
    concat: S.getFunctionSemigroup(M)<any>().concat,
    empty: () => M.empty
  })
}

// TODO: swap execution order in v3
/**
 * Endomorphism form a monoid where the `empty` value is the identity function.
 *
 * @category instances
 * @since 2.0.0
 */
export function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>> {
  return {
    concat: (x, y) => (a) => x(y(a)),
    empty: identity
  }
}

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
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
 * assert.deepStrictEqual(monoidPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.0.0
 */
export function getStructMonoid<O extends ReadonlyRecord<string, any>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> {
  const empty: any = {}
  for (const key of Object.keys(monoids)) {
    empty[key] = monoids[key].empty
  }
  return {
    concat: S.getStructSemigroup(monoids).concat,
    empty
  }
}

/**
 * Get a monoid where `concat` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @example
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.getMeetMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 1)
 *
 * @category instances
 * @since 2.0.0
 */
export function getMeetMonoid<A>(B: Bounded<A>): Monoid<A> {
  return {
    concat: S.getMeetSemigroup(B).concat,
    empty: B.top
  }
}

/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as B from 'fp-ts/Bounded'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.getJoinMonoid(B.boundedNumber)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 2)
 *
 * @category instances
 * @since 2.0.0
 */
export function getJoinMonoid<A>(B: Bounded<A>): Monoid<A> {
  return {
    concat: S.getJoinSemigroup(B).concat,
    empty: B.bottom
  }
}
