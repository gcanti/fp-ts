/**
 *
 * A 'struct' is a heterogeneous `ReadonlyRecord`, often an `interface`.
 * Many of these functions have a `Record._WithIndex` counterpart.
 * e.g. struct.mapS <-> Record.mapWithIndex
 *
 * @since 2.10.0
 */
import { pipe } from './function'
import { URIS3, Kind3, URIS2, Kind2, URIS, Kind, URIS4, Kind4, HKT } from './HKT'
import * as R from './ReadonlyRecord'
import { Option, fromNullable } from './Option'
import { Monoid } from './Monoid'
import { Either } from './Either'
import { Separated } from './Separated'
import { Ord } from './Ord'
import { Ord as StringOrd } from './string'
import { Apply4, Apply3, Apply3C, Apply2, Apply2C, Apply1, Apply } from './Apply'
import { Semigroup } from './Semigroup'
import * as _ from './internal'
import { Predicate } from './Predicate'
import { Refinement } from './Refinement'

type NonEmpty<R> = keyof R extends never ? never : R extends object ? R : never
type RR = Readonly<Record<string, unknown>>

/**
 * @category destructors
 * @since 2.10.0
 */
export const keys = (O: Ord<string>) => <A>(r: A): ReadonlyArray<keyof A> =>
  Object.keys(r).sort((first, second) => O.compare(second)(first)) as Array<keyof A>

/**
 * Given a struct of functions map a corresponding struct of values.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { mapS } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     mapS({
 *       a: (a) => a.length,
 *       b: (b) => b * 2
 *     })
 *   ),
 *   { a: 1, b: 2 }
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const mapS = <A, B extends { [k in keyof A]: (val: A[k]) => unknown }>(f: B) => (
  a: NonEmpty<A>
): { [key in keyof A]: ReturnType<B[key]> } => R.mapWithIndex((k, r) => f[k as keyof A](r as any))(a as RR) as any

/**
 * Given a struct of functions reduce a corresponding struct of values
 * down to a single value.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { reduceS } from 'fp-ts/struct'
 * import { Ord } from 'fp-ts/string'
 * import { reverse } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     reduceS(Ord)('', {
 *       a: (acc, cur) => acc + cur,
 *       b: (acc, cur) => acc + cur.toString()
 *     })
 *   ),
 *   'a1'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     reduceS(reverse(Ord))('', {
 *       a: (acc, cur) => acc + cur,
 *       b: (acc, cur) => acc + cur.toString()
 *     })
 *   ),
 *   '1a'
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const reduceS = (O: Ord<string>) => <A, B>(b: B, f: { [K in keyof A]: (b: B, a: A[K]) => B }) => (
  fa: NonEmpty<A>
): B => R.reduceWithIndex(O)(b, (k, b, v) => f[k as keyof A](b, v as any))(fa as RR)

/**
 * Given a monoid and a struct of functions outputting its type parameter,
 * fold a corresponding struct of values into a single value.
 *
 * @example
 * import { pipe, identity } from 'fp-ts/function'
 * import { foldMapS } from 'fp-ts/struct'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     foldMapS(S.Ord)(S.Monoid)({
 *       a: identity,
 *       b: (b) => b.toString()
 *     })
 *   ),
 *   'a1'
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const foldMapS = (O: Ord<string>) => <M>(M: Monoid<M>) => <A>(
  f: {
    [key in keyof A]: (a: A[key]) => M
  }
) => (fa: NonEmpty<A>): M => R.foldMapWithIndex(O)(M)((k, v) => f[k as keyof A](v as any))(fa as RR)

/**
 * Given a struct of predicates, filter & potentially refine
 * a corresponding struct of values.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { filterS } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     filterS({
 *       a: (a) => a === 'b',
 *       b: (b): b is 1 => b === 1
 *     })
 *   ),
 *   { b: 1 } as const
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const filterS = <A, B extends { [K in keyof A]: Predicate<A[K]> | Refinement<A[K], any> }>(predicates: B) => (
  fa: NonEmpty<A>
): {
  [K in keyof A]?: B[K] extends (a: any) => a is infer C ? C : A[K]
} => R.filterWithIndex((k, v) => predicates[k as keyof A](v as any))(fa as RR) as any

/**
 * Given a struct mapping to heterogeneous Optional values,
 * filter & trasform a corresponding struct of values.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { filterMapS } from 'fp-ts/struct'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     filterMapS({
 *       a: () => O.none,
 *       b: (n) => n === 1 ? O.some(n + 1) : O.none
 *     })
 *   ),
 *   { b: 2 }
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const filterMapS = <A, C extends { [K in keyof A]: (v: A[K]) => Option<unknown> }>(f: C) => (
  fa: NonEmpty<A>
): {
  [K in keyof A]?: ReturnType<C[K]> extends Option<infer A> ? A : never
} => R.filterMapWithIndex((k, v) => f[k as keyof A](v as any))(fa as RR) as any

/**
 * Given a struct of predicates, split & potentially refine
 * a corresponding struct of values into a failing `left` struct
 * and a passing `right` struct.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { partitionS } from 'fp-ts/struct'
 * import { separated } from 'fp-ts/Separated'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'b', b: 1 },
 *     partitionS({
 *       a: (s) => s === 'a',
 *       b: (n): n is 1 => n === 1,
 *     })
 *   ),
 *   separated({ a: 'b' }, { b: 1 } as const)
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const partitionS = <R, B extends { [K in keyof R]: Predicate<R[K]> | Refinement<R[K], any> }>(f: B) => (
  fa: NonEmpty<R>
): Separated<Partial<R>, { [K in keyof R]?: B[K] extends (a: any) => a is infer C ? C : R[K] }> =>
  R.partitionWithIndex((k, v) => f[k as keyof R](v as any))(fa as RR) as any

/**
 * Given a struct mapping to heterogeneous Optional values,
 * trasform & split a corresponding struct of values
 * into a failing `left` struct and a passing `right` struct.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { partitionMapS } from 'fp-ts/struct'
 * import * as E from 'fp-ts/Either'
 * import { separated } from 'fp-ts/Separated'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     partitionMapS({
 *       a: () => E.left('fail'),
 *       b: (n) => n === 1 ? E.right(n + 1) : E.left(n - 1)
 *     })
 *   ),
 *   separated({ a: 'fail' }, { b: 2 })
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const partitionMapS = <R, B extends { [K in keyof R]: (val: R[K]) => Either<unknown, unknown> }>(f: B) => (
  fa: NonEmpty<R>
): Separated<
  { [K in keyof R]?: ReturnType<B[K]> extends Either<infer E, unknown> ? E : never },
  { [K in keyof R]?: ReturnType<B[K]> extends Either<unknown, infer A> ? A : never }
> => R.partitionMapWithIndex((k, v) => f[k as keyof R](v as any))(fa as RR) as any

/**
 * Given a heterogeneous struct of Options, eliminate
 * all keys that are `None` & return a struct of the
 * existing values.
 *
 * @example
 * import { compactS } from 'fp-ts/struct'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   compactS({
 *     foo: O.some(123),
 *     bar: O.none,
 *     baz: O.some('abc')
 *   }),
 *   { foo: 123, baz: 'abc' }
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const compactS: <A>(r: { [K in keyof A]: Option<A[K]> }) => Partial<A> = R.compact as any

/**
 * Wrap each key in heterogeneous struct of nullable values in `Option`.
 *
 * Note: cannot properly wrap optional/partial keys.
 *
 * @example
 * import { unCompact } from 'fp-ts/struct'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   unCompact({ foo: 123, bar: undefined, baz: 'abc' }),
 *   { foo: O.some(123), bar: O.none, baz: O.some('abc') }
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const unCompact = <A>(
  a: NonEmpty<A>
): {
  [K in keyof A]: Option<NonNullable<A[K]>>
} => {
  const ks = keys(StringOrd)(a) as Array<keyof A>
  const ops = {} as { [K in keyof A]: Option<NonNullable<A[K]>> }
  for (const key of ks) {
    ops[key] = fromNullable(a[key])
  }
  return ops
}

/**
 * Split a heterogeneous struct of Either values into a failing
 * struct of its `lefts` and a struct of its `rights`.
 *
 * @example
 * import { separateS } from 'fp-ts/struct'
 * import * as E from 'fp-ts/Either'
 * import { separated } from 'fp-ts/Separated'
 *
 * assert.deepStrictEqual(
 *   separateS({ foo: E.right(123), bar: E.left('fail'), baz: E.right('abc') }),
 *   separated({ bar: 'fail' }, { foo: 123, baz: 'abc' })
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const separateS: <R extends R.ReadonlyRecord<string, Either<unknown, unknown>>>(
  r: R
) => Separated<
  { [K in keyof R]?: R[K] extends Either<infer E, unknown> ? E : never },
  { [K in keyof R]?: R[K] extends Either<unknown, infer A> ? A : never }
> = R.separate as any

/**
 * Runs an separate action for each value in a struct, and accumulates the results.
 *
 * A pipeable version of `traverseS_`
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { traverseS } from 'fp-ts/struct'
 * import { Ord } from 'fp-ts/string'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 1, b: 'b' },
 *     traverseS(Ord)(O.Apply)({
 *       a: (n) => n <= 2 ? O.some(n.toString()) : O.none,
 *       b: (b) => b.length <= 2 ? O.some(b.length) : O.none
 *     })
 *   ),
 *   O.some({ a: '1', b: 1 })
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export function traverseS(
  O: Ord<string>
): {
  <F extends URIS4>(F: Apply4<F>): <
    S,
    R,
    E,
    A,
    B extends { [key in keyof A]: (val: A[key]) => Kind4<F, S, R, E, unknown> }
  >(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind4<
    F,
    S,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind4<F, S, R, E, infer C> ? C : never
    }
  >
  <F extends URIS3>(F: Apply3<F>): <R, E, A, B extends { [key in keyof A]: (val: A[key]) => Kind3<F, R, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind3<F, R, E, infer C> ? C : never
    }
  >
  <F extends URIS3, E>(F: Apply3C<F, E>): <
    R,
    A,
    B extends { [key in keyof A]: (val: A[key]) => Kind3<F, R, E, unknown> }
  >(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind3<F, R, E, infer C> ? C : never
    }
  >
  <F extends URIS2>(F: Apply2<F>): <E, A, B extends { [key in keyof A]: (val: A[key]) => Kind2<F, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind2<F, E, infer C> ? C : never
    }
  >
  <F extends URIS2, E>(F: Apply2C<F, E>): <A, B extends { [key in keyof A]: (val: A[key]) => Kind2<F, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind2<F, E, infer C> ? C : never
    }
  >
  <F extends URIS>(F: Apply1<F>): <A, B extends { [key in keyof A]: (val: A[key]) => Kind<F, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind<
    F,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind<F, infer C> ? C : never
    }
  >
  <F>(F: Apply<F>): <A, B extends { [key in keyof A]: (val: A[key]) => HKT<F, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => HKT<
    F,
    {
      [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
    }
  >
}
export function traverseS(
  O: Ord<string>
): <F>(
  F: Apply<F>
) => <A extends R.ReadonlyRecord<string, unknown>, B extends { [key in keyof A]: (val: A[key]) => HKT<F, unknown> }>(
  f: B
) => (
  ta: NonEmpty<A>
) => HKT<
  F,
  {
    [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
  }
> {
  return <F>(F: Apply<F>) => <A, B extends { [key in keyof A]: (val: A[key]) => HKT<F, unknown> }>(f: B) => (
    ta: NonEmpty<A>
  ) => {
    const ks = keys(O)(ta) as Array<keyof A>
    const length = ks.length
    let fr = F.map((r) => ({ [ks[0]]: r }))(f[ks[0]](ta[ks[0]] as any)) as HKT<
      F,
      {
        [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
      }
    >
    for (let i = 1; i < length; i++) {
      fr = F.ap(f[ks[i]](ta[ks[i]] as any))(
        F.map((r: any) => (b: any) => {
          r[ks[i]] = b
          return r
        })(fr)
      )
    }
    return fr as any
  }
}

/**
 * Runs an separate action for each value in a struct, and accumulates the results.
 *
 * A non-pipeable version of `traverseS`
 *
 * @example
 * import { traverseS_ } from 'fp-ts/struct'
 * import { Ord } from 'fp-ts/string'
 * import * as O from 'fp-ts/Option'
 *
 * const f = {
 *   a: (n: number) => n <= 2 ? O.some(n.toString()) : O.none,
 *   b: (b: string) => b.length <= 2 ? O.some(b.length) : O.none
 * }
 *
 * assert.deepStrictEqual(
 *   traverseS_(Ord)(O.Apply)({a: 1, b: 'b' }, f),
 *   O.some({ a: '1', b: 1 })
 * )
 * assert.deepStrictEqual(
 *   traverseS_(Ord)(O.Apply)({ a: 3, b: '2' }, f),
 *   O.none
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export function traverseS_(
  O: Ord<string>
): {
  <F extends URIS4>(F: Apply4<F>): <
    S,
    R,
    E,
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind4<
    F,
    S,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind4<F, S, R, E, infer C> ? C : never
    }
  >
  <F extends URIS3>(F: Apply3<F>): <
    R,
    E,
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind3<F, R, E, infer C> ? C : never
    }
  >
  <F extends URIS3, E>(F: Apply3C<F, E>): <
    R,
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind3<F, R, E, infer C> ? C : never
    }
  >
  <F extends URIS2>(F: Apply2<F>): <
    E,
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind2<
    F,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind2<F, E, infer C> ? C : never
    }
  >
  <F extends URIS2, E>(F: Apply2C<F, E>): <
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind2<
    F,
    E,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind2<F, E, infer C> ? C : never
    }
  >
  <F extends URIS>(F: Apply1<F>): <
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => Kind<
    F,
    {
      [key in keyof B]: ReturnType<B[key]> extends Kind<F, infer C> ? C : never
    }
  >
  <F>(F: Apply<F>): <
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    fa: NonEmpty<A>,
    f: B
  ) => HKT<
    F,
    {
      [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
    }
  >
}
export function traverseS_(
  O: Ord<string>
): <F>(
  F: Apply<F>
) => <B extends R.ReadonlyRecord<string, (v: never) => unknown>, A extends { [K in keyof B]: Parameters<B[K]>[0] }>(
  fa: NonEmpty<A>,
  f: B
) => HKT<
  F,
  {
    [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
  }
> {
  return <F>(F: Apply<F>) => <
    B extends R.ReadonlyRecord<string, (v: never) => unknown>,
    A extends { [K in keyof B]: Parameters<B[K]>[0] }
  >(
    ta: NonEmpty<A>,
    f: B
  ) => traverseS(O)(F)(f as any)(ta as never) as any
}

/**
 * Applies a traverseS and a filterMap as a single combined operation.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { witherS } from 'fp-ts/struct'
 * import * as Tr from 'fp-ts/Tree'
 * import * as O from 'fp-ts/Option'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 2, b: 'a' },
 *     witherS(S.Ord)(Tr.Apply)({
 *       a: (n) => Tr.of(n === 1 ? O.some(n.toString()) : O.none),
 *       b: (n) => Tr.of(n === 'a' ? O.some(n.length) : O.none)
 *     })
 *   ),
 *   Tr.of({ b: 1 })
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const witherS = (
  O: Ord<string>
): {
  <F extends URIS3>(F: Apply3<F>): <
    R,
    E,
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind3<F, R, E, Option<unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Option<infer C>> ? C : never
    }
  >
  <F extends URIS3, E>(F: Apply3C<F, E>): <
    R,
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind3<F, R, E, Option<unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Option<infer C>> ? C : never
    }
  >
  <F extends URIS2, E>(F: Apply2<F>): <E, A, B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Option<infer C>> ? C : never
    }
  >
  <F extends URIS2, E>(F: Apply2C<F, E>): <
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Option<unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Option<infer C>> ? C : never
    }
  >
  <F extends URIS>(F: Apply1<F>): <A, B extends { [K in keyof A]: (val: A[K]) => Kind<F, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind<
    F,
    {
      [K in keyof A]?: ReturnType<B[K]> extends Kind<F, Option<infer C>> ? C : never
    }
  >
  <F>(F: Apply<F>): <A, B extends { [K in keyof A]: (val: A[K]) => HKT<F, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => HKT<
    F,
    {
      [K in keyof A]?: ReturnType<B[K]> extends HKT<F, Option<infer C>> ? C : never
    }
  >
} => <F>(F: Apply<F>) => <A>(f: any) => (fa: NonEmpty<A>) => F.map(compactS as any)(pipe(fa, traverseS(O)(F)(f))) as any

/**
 * Applies a `traverseS` and a `partitionMap` as a single combined operation.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { wiltS } from 'fp-ts/struct'
 * import * as Tr from 'fp-ts/Tree'
 * import * as E from 'fp-ts/Either'
 * import { separated } from 'fp-ts/Separated'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 2, b: 'a' },
 *     wiltS(S.Ord)(Tr.Apply)({
 *       a: (n) => Tr.of(n === 1 ? E.right(n.toString()) : E.left(n - 1)),
 *       b: (n) => Tr.of(n === 'a' ? E.right(n.length) : E.left('fail'))
 *     })
 *   ),
 *   Tr.of(separated({ a: 1 }, { b: 1 }))
 * )
 *
 * @category combinators
 * @since 2.10.0
 */
export const wiltS = (
  O: Ord<string>
): {
  <F extends URIS3>(F: Apply3<F>): <
    R,
    E,
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind3<F, R, E, Either<unknown, unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Either<unknown, infer R>> ? R : never }
    >
  >
  <F extends URIS3, E>(F: Apply3C<F, E>): <
    R,
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind3<F, R, E, Either<unknown, unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends Kind3<F, R, E, Either<unknown, infer R>> ? R : never }
    >
  >
  <F extends URIS2>(F: Apply2<F>): <
    E,
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Either<unknown, unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Either<unknown, infer R>> ? R : never }
    >
  >
  <F extends URIS2, E>(F: Apply2C<F, E>): <
    A,
    B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Either<unknown, unknown>> }
  >(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends Kind2<F, E, Either<unknown, infer R>> ? R : never }
    >
  >
  <F extends URIS>(F: Apply1<F>): <A, B extends { [K in keyof A]: (val: A[K]) => Kind<F, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind<
    F,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends Kind<F, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends Kind<F, Either<unknown, infer R>> ? R : never }
    >
  >
  <F>(F: Apply<F>): <A, B extends { [K in keyof A]: (val: A[K]) => HKT<F, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => HKT<
    F,
    Separated<
      { [K in keyof A]?: ReturnType<B[K]> extends HKT<F, Either<infer L, unknown>> ? L : never },
      { [K in keyof A]?: ReturnType<B[K]> extends HKT<F, Either<unknown, infer R>> ? R : never }
    >
  >
} => <F>(F: Apply<F>) => <A>(f: any) => (fa: NonEmpty<A>) =>
  F.map(separateS as any)(pipe(fa, traverseS(O)(F)(f))) as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/struct'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getAssignSemigroup = <A = never>(): Semigroup<A> => ({
  concat: (second) => (first) => Object.assign({}, first, second)
})
