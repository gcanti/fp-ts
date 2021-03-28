/**
 *
 * A 'struct' is a heterogeneous `ReadonlyRecord`, often an `interface`.
 * Many of these functions have a `Record._WithIndex` counterpart.
 * e.g. struct.mapS <-> Record.mapWithIndex
 *
 * @since 2.10.0
 */
import { pipe, Predicate, Refinement } from './function'
import { URIS3, Kind3, URIS2, Kind2, URIS, Kind, URIS4, Kind4, HKT } from './HKT'
import { ReadonlyRecord } from './ReadonlyRecord'
import { Option, isSome, fromNullable } from './Option'
import { Monoid } from './Monoid'
import { Either, isLeft } from './Either'
import { Separated, separated } from './Separated'
import { Ord } from './Ord'
import { Ord as StringOrd } from './string'
import { Apply4, Apply3, Apply3C, Apply2, Apply2C, Apply1, Apply } from './Apply'
import { Show } from './Show'
import { Eq, fromEquals } from './Eq'
import { getObjectSemigroup, Semigroup } from './Semigroup'
import * as _ from './internal'

type NonEmpty<R> = keyof R extends never ? never : R extends object ? R : never

/**
 * @category destructors
 * @since 2.10.0
 */
export const keys = (O: Ord<string>) => <A>(r: A): ReadonlyArray<keyof A> =>
  Object.keys(r).sort(O.compare) as Array<keyof A>

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
export function mapS<A, B extends { [k in keyof A]: (val: A[k]) => unknown }>(
  f: B
): (a: NonEmpty<A>) => { [key in keyof A]: ReturnType<B[key]> } {
  return (r) => {
    const out: any = {}
    for (const k in r) {
      if (_.hasOwnProperty.call(r, k)) {
        out[k] = (f as any)[k](r[k])
      }
    }
    return out as { [key in keyof A]: ReturnType<B[key]> }
  }
}

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
): B => {
  let out = b
  const ks = keys(O)(fa) as Array<keyof A>
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = f[k](out, fa[k])
  }
  return out
}

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
) => (fa: NonEmpty<A>): M => {
  let out = M.empty
  const ks = keys(O)(fa) as Array<keyof A>
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = M.concat(out, f[k](fa[k]))
  }
  return out
}

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
} => {
  const out: any = {}
  let changed = false
  for (const key in fa) {
    if (_.hasOwnProperty.call(fa, key)) {
      const a = fa[key]
      if ((predicates as any)[key](a)) {
        out[key] = a as any
      } else {
        changed = true
      }
    }
  }
  return changed
    ? (out as {
        [K in keyof A]?: B[K] extends (a: any) => a is infer C ? C : A[K]
      })
    : (fa as any)
}

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
) => {
  const out: Record<string, unknown> = {}
  for (const k in fa) {
    if (_.hasOwnProperty.call(fa, k)) {
      const ob = (f as any)[k](fa[k])
      if (isSome(ob)) {
        out[k] = ob.value
      }
    }
  }
  return out as {
    [K in keyof A]?: ReturnType<C[K]> extends Option<infer A> ? A : never
  }
}
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
): Separated<Partial<R>, { [K in keyof R]?: B[K] extends (a: any) => a is infer C ? C : R[K] }> => {
  const left: any = {}
  const right: any = {}
  for (const k in fa) {
    if (_.hasOwnProperty.call(fa, k)) {
      const a = fa[k]
      if ((f as any)[k](a)) {
        right[k] = a
      } else {
        left[k] = a
      }
    }
  }
  return separated(left, right)
}

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
) => {
  const left: any = {}
  const right: any = {}
  for (const k in fa) {
    if (_.hasOwnProperty.call(fa, k)) {
      const e = (f as any)[k](fa[k])
      switch (e._tag) {
        case 'Left':
          left[k] = e.left
          break
        case 'Right':
          right[k] = e.right
          break
      }
    }
  }
  return separated(
    left as {
      [K in keyof R]?: ReturnType<B[K]> extends Either<infer E, unknown> ? E : never
    },
    right as {
      [K in keyof R]?: ReturnType<B[K]> extends Either<unknown, infer A> ? A : never
    }
  )
}

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
export const compactS = <A>(r: { [K in keyof A]: Option<A[K]> }): Partial<A> => {
  const out: Partial<A> = {}
  for (const k in r) {
    if (_.hasOwnProperty.call(r, k)) {
      const oa = r[k]
      if (isSome(oa)) {
        out[k] = oa.value
      }
    }
  }
  return out
}

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
export const separateS = <R extends ReadonlyRecord<string, Either<unknown, unknown>>>(r: R) => {
  const left = {} as { [K in keyof R]?: R[K] extends Either<infer E, unknown> ? E : never }
  const right = {} as { [K in keyof R]?: R[K] extends Either<unknown, infer A> ? A : never }
  for (const k in r) {
    if (_.hasOwnProperty.call(r, k)) {
      const e: Either<unknown, unknown> = r[k]
      if (isLeft(e)) {
        left[k] = e.left as any
      } else {
        right[k] = e.right as any
      }
    }
  }
  return separated(left, right)
}

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
) => <A extends ReadonlyRecord<string, unknown>, B extends { [key in keyof A]: (val: A[key]) => HKT<F, unknown> }>(
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
    let fr = F.map(f[ks[0]](ta[ks[0]] as any), (r) => ({ [ks[0]]: r })) as HKT<
      F,
      {
        [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
      }
    >
    for (let i = 1; i < length; i++) {
      fr = F.ap(
        F.map(fr, (r) => (b: any) => {
          r[ks[i]] = b
          return r
        }),
        f[ks[i]](ta[ks[i]] as any)
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
) => <B extends ReadonlyRecord<string, (v: never) => unknown>, A extends { [K in keyof B]: Parameters<B[K]>[0] }>(
  fa: NonEmpty<A>,
  f: B
) => HKT<
  F,
  {
    [key in keyof B]: ReturnType<B[key]> extends HKT<F, infer C> ? C : never
  }
> {
  return <F>(F: Apply<F>) => <
    B extends ReadonlyRecord<string, (v: never) => unknown>,
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
} => <F>(F: Apply<F>) => <A>(f: any) => (fa: NonEmpty<A>) => F.map(pipe(fa, traverseS(O)(F)(f)), compactS as any) as any

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
  F.map(pipe(fa, traverseS(O)(F)(f)), separateS as any) as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const getShow = <A>(shows: { [K in keyof A]: Show<A[K]> }): Show<{ readonly [K in keyof A]: A[K] }> => ({
  show: (a) => {
    let s = '{'
    for (const k in shows) {
      if (_.hasOwnProperty.call(shows, k)) {
        s += ` ${k}: ${shows[k].show(a[k])},`
      }
    }
    if (s.length > 1) {
      s = s.slice(0, -1) + ' '
    }
    s += '}'
    return s
  }
})

/**
 * @category instances
 * @since 2.10.0
 */
export const getEq = <A>(eqs: { [K in keyof A]: Eq<A[K]> }): Eq<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((first, second) => {
    for (const key in eqs) {
      if (!eqs[key].equals(first[key], second[key])) {
        return false
      }
    }
    return true
  })

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { getSemigroup } from 'fp-ts/struct'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = getSemigroup<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.10.0
 */
export const getSemigroup = <A>(
  semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<{ readonly [K in keyof A]: A[K] }> => ({
  concat: (first, second) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (_.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].concat(first[k], second[k])
      }
    }
    return r
  }
})

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/struct'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const getAssignSemigroup: <A extends object = never>() => Semigroup<A> = getObjectSemigroup

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { getMonoid } from 'fp-ts/struct'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const M = getMonoid<Point>({
 *   x: N.MonoidSum,
 *   y: N.MonoidSum
 * })
 *
 * assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.10.0
 */
export const getMonoid = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<{ readonly [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  for (const k in monoids) {
    if (_.hasOwnProperty.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return {
    concat: getSemigroup(monoids).concat,
    empty
  }
}
