/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly combine: (that: A) => (self: A) => A
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
import { identity } from '../Function'
import * as _ from '../internal'
import type { Ord } from './Ord'
import * as ord from './Ord'

/**
 * @category model
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
}

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @example
 * import { min } from 'fp-ts/typeclasses/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
 *
 * const S = min(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.combine(2)), 1)
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Ord: Ord<A>): Semigroup<A> => ({
  combine: ord.min(Ord)
})

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @example
 * import { max } from 'fp-ts/typeclasses/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
 *
 * const S = max(N.Ord)
 *
 * assert.deepStrictEqual(pipe(1, S.combine(2)), 2)
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Ord: Ord<A>): Semigroup<A> => ({
  combine: ord.max(Ord)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <S>(s: S): Semigroup<S> => ({
  combine: () => () => s
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @example
 * import { reverse } from 'fp-ts/typeclasses/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).combine('b')), 'ba')
 *
 * @since 3.0.0
 */
export const reverse = <S>(Semigroup: Semigroup<S>): Semigroup<S> => ({
  combine: (that) => (self) => Semigroup.combine(self)(that)
})

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/typeclasses/Semigroup'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
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
 * @since 3.0.0
 */
export const struct = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<{
  readonly [K in keyof A]: A[K]
}> => ({
  combine: (that) => (self) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (_.has.call(semigroups, k)) {
        r[k] = semigroups[k].combine(that[k])(self[k])
      }
    }
    return r
  }
})

/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/typeclasses/Semigroup'
 * import { pipe } from 'fp-ts/Function'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAnd)
 * assert.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<Readonly<A>> => ({
  combine: (that) => (self) => semigroups.map((s, i) => s.combine(that[i])(self[i])) as any
})

/**
 * You can glue items between and stay associative.
 *
 * @example
 * import { intercalate } from 'fp-ts/typeclasses/Semigroup'
 * import { pipe } from 'fp-ts/Function'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(pipe('a', S1.combine('b')), 'a + b')
 * assert.strictEqual(pipe('a', S1.combine('b'), S1.combine('c')), 'a + b + c')
 *
 * @since 3.0.0
 */
export const intercalate =
  <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> => ({
    combine: (that) => (self) => Semigroup.combine(Semigroup.combine(that)(separator))(self)
  })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/typeclasses/Semigroup'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(1, S.first<number>().combine(2)), 1)
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A>(): Semigroup<A> => ({
  combine: () => identity
})

/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/typeclasses/Semigroup'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(1, S.last<number>().combine(2)), 2)
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A>(): Semigroup<A> => ({
  combine: (a) => () => a
})

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { combineAll } from 'fp-ts/typeclasses/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = combineAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 3.0.0
 */
export const combineAll =
  <S>(Semigroup: Semigroup<S>) =>
  (startWith: S) =>
  (collection: Iterable<S>): S => {
    let out: S = startWith
    for (const s of collection) {
      out = Semigroup.combine(s)(out)
    }
    return out
  }
