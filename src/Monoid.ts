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
import { Endomorphism, flow, identity } from './function'
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
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * const M1 = M.getDual(M.monoidString)
 * assert.deepStrictEqual(pipe('a', M1.concat('b')), 'ba')
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
 * Given a tuple of monoids returns a monoid for the tuple
 *
 * @example
 * import * as M from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * const M1 = M.getTupleMonoid(M.monoidString, M.monoidSum)
 * assert.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
 *
 * const M2 = M.getTupleMonoid(M.monoidString, M.monoidSum, M.monoidAll)
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
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @example
 * import { monoidAll } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(true, monoidAll.concat(true)), true)
 * assert.deepStrictEqual(pipe(true, monoidAll.concat(false)), false)
 *
 * @category instances
 * @since 3.0.0
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
 * import { monoidAny } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(true, monoidAny.concat(true)), true)
 * assert.deepStrictEqual(pipe(true, monoidAny.concat(false)), true)
 * assert.deepStrictEqual(pipe(false, monoidAny.concat(false)), false)
 *
 * @category instances
 * @since 3.0.0
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

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import { monoidString } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', monoidString.concat('b')), 'ab')
 *
 * @category instances
 * @since 3.0.0
 */
export const monoidString: Monoid<string> = {
  concat: S.semigroupString.concat,
  empty: ''
}

/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate, pipe } from 'fp-ts/function'
 * import * as M from 'fp-ts/Monoid'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = M.getFunctionMonoid(M.monoidAll)<number>()
 *
 * assert.deepStrictEqual(pipe(f, M1.concat(g))(1), true)
 * assert.deepStrictEqual(pipe(f, M1.concat(g))(3), false)
 *
 * const M2 = M.getFunctionMonoid(M.monoidAny)<number>()
 *
 * assert.deepStrictEqual(pipe(f, M2.concat(g))(1), true)
 * assert.deepStrictEqual(pipe(f, M2.concat(g))(3), true)
 *
 * @category instances
 * @since 3.0.0
 */
export const getFunctionMonoid = <M>(M: Monoid<M>): (<A = never>() => Monoid<(a: A) => M>) => {
  const empty = () => M.empty
  return () => ({
    concat: S.getFunctionSemigroup(M)<any>().concat,
    empty
  })
}

/**
 * Endomorphism form a monoid where the `empty` value is the identity function.
 *
 * @category instances
 * @since 3.0.0
 */
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => ({
  concat: (second) => (first) => flow(first, second),
  empty: identity
})

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
