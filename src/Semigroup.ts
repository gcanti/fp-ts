/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (second: A) => (first: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * (x |> concat(y)) |> concat(z) <-> x |> concat(y |> concat(z))
 * ```
 *
 * @since 3.0.0
 */
import { Endomorphism } from './function'
import { Magma } from './Magma'
import { max, min, Ord } from './Ord'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroup<A> extends Magma<A> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = S.getMeetSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(pipe(1, S1.concat(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: min(O)
})

/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as O from 'fp-ts/Ord'
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = S.getJoinSemigroup(O.ordNumber)
 *
 * assert.deepStrictEqual(pipe(1, S1.concat(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: max(O)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const getUnitSemigroup = <A>(a: A): Semigroup<A> => ({
  concat: () => () => a
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { getDual } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', getDual(S.Semigroup).concat('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const getDual = <A>(S: Semigroup<A>): Semigroup<A> => ({
  concat: (second) => (first) => S.concat(first)(second)
})

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const semigroupPoint = S.getStructSemigroup<Point>({
 *   x: S.semigroupSum,
 *   y: S.semigroupSum
 * })
 *
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, semigroupPoint.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const getStructSemigroup = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<A> => ({
  concat: (second) => (first) => {
    const r: A = {} as any
    // tslint:disable-next-line: forin
    for (const key in semigroups) {
      r[key] = semigroups[key].concat(second[key])(first[key])
    }
    return r
  }
})

/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { getTupleSemigroup, semigroupSum } from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = getTupleSemigroup(S.Semigroup, semigroupSum)
 * assert.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])
 *
 * const S2 = getTupleSemigroup(S.Semigroup, semigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const getTupleSemigroup = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<A> => ({
  concat: (second) => (first) => semigroups.map((s, i) => s.concat(second[i])(first[i])) as any
})

/**
 * You can glue items between and stay associative.
 *
 * @example
 * import { getIntercalateSemigroup } from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = getIntercalateSemigroup(' ')(S.Semigroup)
 *
 * assert.strictEqual(pipe('a', S1.concat('b')), 'a b')
 * assert.strictEqual(pipe('a', S1.concat('b'), S1.concat('c')), 'a b c')
 *
 * @category combinators
 * @since 3.0.0
 */
export const getIntercalateSemigroup = <A>(a: A): Endomorphism<Semigroup<A>> => (S) => ({
  concat: (second) => (first) => S.concat(S.concat(second)(a))(first)
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(1, S.getFirstSemigroup<number>().concat(2)), 1)
 *
 * @category instances
 * @since 3.0.0
 */
export const getFirstSemigroup = <A = never>(): Semigroup<A> => ({
  concat: () => (first) => first
})

/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(1, S.getLastSemigroup<number>().concat(2)), 2)
 *
 * @category instances
 * @since 3.0.0
 */
export const getLastSemigroup = <A = never>(): Semigroup<A> => ({
  concat: (second) => () => second
})

/**
 * Return a semigroup for objects, preserving their type.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const S1 = S.getObjectSemigroup<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S1.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => ({
  concat: (second) => (first) => Object.assign({}, first, second)
})

/**
 * `number` semigroup under addition.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, S.semigroupSum.concat(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const semigroupSum: Semigroup<number> = {
  concat: (second) => (first) => first + second
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, S.semigroupProduct.concat(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const semigroupProduct: Semigroup<number> = {
  concat: (second) => (first) => first * second
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * const sum = S.fold(S.semigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 3.0.0
 */
export const fold = <A>(S: Semigroup<A>) => (startWith: A) => (as: ReadonlyArray<A>): A =>
  as.reduce((a, acc) => S.concat(acc)(a), startWith)
