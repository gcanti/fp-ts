/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly combine: (second: A) => (self: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * (x |> combine(y)) |> combine(z) <-> x |> combine(y |> combine(z))
 * ```
 *
 * @since 3.0.0
 */
import type { Endomorphism } from './Endomorphism'
import { identity } from './function'
import * as _ from './internal'
import type { Magma } from './Magma'
import * as magma from './Magma'
import * as ord from './Ord'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroup<S> extends Magma<S> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @example
 * import { min } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = min(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.combine(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <S>(O: ord.Ord<S>): Semigroup<S> => ({
  combine: ord.min(O)
})

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @example
 * import { max } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = max(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.combine(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <S>(O: ord.Ord<S>): Semigroup<S> => ({
  combine: ord.max(O)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <S>(s: S): Semigroup<S> => ({
  combine: () => () => s
})

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `combine`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).combine('b')), 'ba')
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse: <S>(S: Semigroup<S>) => Semigroup<S> = magma.reverse

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
 * assert.deepStrictEqual(pipe({ x: 1, y: 2 }, S.combine({ x: 3, y: 4 })), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 3.0.0
 */
export const struct = <S>(semigroups: { [K in keyof S]: Semigroup<S[K]> }): Semigroup<{
  readonly [K in keyof S]: S[K]
}> => ({
  combine: (second) => (first) => {
    const r: S = {} as any
    for (const k in semigroups) {
      if (_.has.call(semigroups, k)) {
        r[k] = semigroups[k].combine(second[k])(first[k])
      }
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
 * assert.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
 *
 * @category combinators
 * @since 3.0.0
 */
export const tuple = <S extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof S]: Semigroup<S[K]> }
): Semigroup<Readonly<S>> => ({
  combine: (second) => (first) => semigroups.map((s, i) => s.combine(second[i])(first[i])) as any
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
 * assert.strictEqual(pipe('a', S1.combine('b')), 'a + b')
 * assert.strictEqual(pipe('a', S1.combine('b'), S1.combine('c')), 'a + b + c')
 *
 * @category combinators
 * @since 3.0.0
 */
export const intercalate =
  <S>(middle: S): Endomorphism<Semigroup<S>> =>
  (S) => ({
    combine: (second) => (first) => S.combine(S.combine(second)(middle))(first)
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
 * assert.deepStrictEqual(pipe(1, S.first<number>().combine(2)), 1)
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <S>(): Semigroup<S> => ({
  combine: () => identity
})

/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(1, S.last<number>().combine(2)), 2)
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <S>(): Semigroup<S> => ({
  combine: (a) => () => a
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { combineAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = combineAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 3.0.0
 */
export const combineAll: <S>(S: Semigroup<S>) => (startWith: S) => (elements: ReadonlyArray<S>) => S = magma.combineAll
