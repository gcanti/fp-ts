/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
import { getSemigroup, identity } from './function'
import * as _ from './internal'
import * as M from './Magma'
import * as Or from './Ord'
import { ReadonlyRecord } from './ReadonlyRecord'

import Ord = Or.Ord
import Magma = M.Magma

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Semigroup<A> extends Magma<A> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.min(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
export const min = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: Or.min(O)
})

/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.max(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
export const max = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: Or.max(O)
})

/**
 * @category constructors
 * @since 2.10.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  concat: () => a
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
 *
 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
 *
 * @since 2.10.0
 */
export const reverse: <A>(S: Semigroup<A>) => Semigroup<A> = M.reverse

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
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
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @since 2.10.0
 */
export const struct = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<{
  readonly [K in keyof A]: A[K]
}> => ({
  concat: (first, second) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (_.has.call(semigroups, k)) {
        r[k] = semigroups[k].concat(first[k], second[k])
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
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.10.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<Readonly<A>> => ({
  concat: (first, second) => semigroups.map((s, i) => s.concat(first[i], second[i])) as any
})

/**
 * Between each pair of elements insert `middle`.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
 *
 * @since 2.10.0
 */
export const intercalate =
  <A>(middle: A) =>
  (S: Semigroup<A>): Semigroup<A> => ({
    concat: (x, y) => S.concat(x, S.concat(middle, y))
  })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
export const first = <A = never>(): Semigroup<A> => ({ concat: identity })

/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.10.0
 */
export const last = <A = never>(): Semigroup<A> => ({ concat: (_, y) => y })

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = concatAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.10.0
 */
export const concatAll: <A>(S: Semigroup<A>) => (startWith: A) => (as: ReadonlyArray<A>) => A = M.concatAll

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `void` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupVoid: Semigroup<void> = constant<void>(undefined)

/**
 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => ({
  concat: (first, second) => Object.assign({}, first, second)
})

/**
 * Use [`last`](#last) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getLastSemigroup = last

/**
 * Use [`first`](#first) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getFirstSemigroup = first

/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getTupleSemigroup: <T extends ReadonlyArray<Semigroup<any>>>(
  ...semigroups: T
) => Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> = tuple as any

/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getStructSemigroup: <O extends ReadonlyRecord<string, any>>(semigroups: {
  [K in keyof O]: Semigroup<O[K]>
}) => Semigroup<O> = struct

/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getDualSemigroup = reverse

/**
 * Use [`max`](#max) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getJoinSemigroup = max

/**
 * Use [`min`](#min) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getMeetSemigroup = min

/**
 * Use [`intercalate`](#intercalate) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
export const getIntercalateSemigroup = intercalate

/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function fold<A>(S: Semigroup<A>): {
  (startWith: A): (as: ReadonlyArray<A>) => A
  (startWith: A, as: ReadonlyArray<A>): A
}
export function fold<A>(S: Semigroup<A>): (startWith: A, as?: ReadonlyArray<A>) => A | ((as: ReadonlyArray<A>) => A) {
  const concatAllS = concatAll(S)
  return (startWith, as?) => (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as))
}

/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

/**
 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getFunctionSemigroup: <S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S> = getSemigroup

/**
 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

/**
 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

/**
 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}
