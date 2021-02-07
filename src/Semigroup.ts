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
import { Endomorphism, identity } from './function'
import { Magma } from './Magma'
import * as O from './Ord'

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
 * import { min } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = min(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.concat(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(o: O.Ord<A>): Semigroup<A> => ({
  concat: O.min(o)
})

/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import { max } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = max(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.concat(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(o: O.Ord<A>): Semigroup<A> => ({
  concat: O.max(o)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  concat: () => () => a
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).concat('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(S: Semigroup<A>): Semigroup<A> => ({
  concat: (second) => (first) => S.concat(first)(second)
})

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = struct<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, S.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const struct = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<A> => ({
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
 * import { tuple } from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<A> => ({
  concat: (second) => (first) => semigroups.map((s, i) => s.concat(second[i])(first[i])) as any
})

/**
 * You can glue items between and stay associative.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(pipe('a', S1.concat('b')), 'a + b')
 * assert.strictEqual(pipe('a', S1.concat('b'), S1.concat('c')), 'a + b + c')
 *
 * @category combinators
 * @since 3.0.0
 */
export const intercalate = <A>(middle: A): Endomorphism<Semigroup<A>> => (S) => ({
  concat: (second) => (first) => S.concat(S.concat(second)(middle))(first)
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
 * assert.deepStrictEqual(pipe(1, S.first<number>().concat(2)), 1)
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A = never>(): Semigroup<A> => ({
  concat: () => identity
})

/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(1, S.last<number>().concat(2)), 2)
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A = never>(): Semigroup<A> => ({
  concat: (a) => () => a
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
 * const S1 = S.object<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S1.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const object = <A extends object = never>(): Semigroup<A> => ({
  concat: (second) => (first) => Object.assign({}, first, second)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { fold } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = fold(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 3.0.0
 */
export const fold = <A>(S: Semigroup<A>) => (startWith: A) => (as: ReadonlyArray<A>): A =>
  as.reduce((a, acc) => S.concat(acc)(a), startWith)
