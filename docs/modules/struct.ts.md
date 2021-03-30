---
title: struct.ts
nav_order: 92
parent: Modules
---

## struct overview

A 'struct' is a heterogeneous `ReadonlyRecord`, often an `interface`.
Many of these functions have a `Record._WithIndex` counterpart.
e.g. struct.mapS <-> Record.mapWithIndex

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [compactS](#compacts)
  - [filterMapS](#filtermaps)
  - [filterS](#filters)
  - [foldMapS](#foldmaps)
  - [mapS](#maps)
  - [partitionMapS](#partitionmaps)
  - [partitionS](#partitions)
  - [reduceS](#reduces)
  - [separateS](#separates)
  - [traverseS](#traverses)
  - [traverseS\_](#traverses_)
  - [unCompact](#uncompact)
  - [wiltS](#wilts)
  - [witherS](#withers)
- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)

---

# combinators

## compactS

Given a heterogeneous struct of Options, eliminate
all keys that are `None` & return a struct of the
existing values.

**Signature**

```ts
export declare const compactS: <A>(r: { [K in keyof A]: Option<A[K]> }) => Partial<A>
```

**Example**

```ts
import { compactS } from 'fp-ts/struct'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(
  compactS({
    foo: O.some(123),
    bar: O.none,
    baz: O.some('abc'),
  }),
  { foo: 123, baz: 'abc' }
)
```

Added in v3.0.0

## filterMapS

Given a struct mapping to heterogeneous Optional values,
filter & trasform a corresponding struct of values.

**Signature**

```ts
export declare const filterMapS: <A, B extends { [K in keyof A]?: ((v: A[K]) => Option<unknown>) | undefined }>(
  f: B
) => (
  fa: NonEmpty<A>
) => { [K in Exclude<keyof A, keyof B>]: A[K] } &
  { [K in keyof B]?: (B[K] extends (a: never) => Option<infer A> ? A : never) | undefined }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { filterMapS } from 'fp-ts/struct'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    filterMapS({
      a: () => O.none,
      b: (n) => (n === 1 ? O.some(n + 1) : O.none),
    })
  ),
  { b: 2, c: 'abc' }
)
```

Added in v3.0.0

## filterS

Given a struct of predicates, filter & potentially refine
a corresponding struct of values.

**Signature**

```ts
export declare const filterS: <A, B extends { [K in keyof A]?: Predicate<A[K]> | Refinement<A[K], any> | undefined }>(
  predicates: B
) => (
  fa: NonEmpty<A>
) => { [K in Exclude<keyof A, keyof B>]: A[K] } &
  { [K in Extract<keyof B, keyof A>]?: (B[K] extends (a: any) => a is infer C ? C : A[K]) | undefined }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { filterS } from 'fp-ts/struct'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    filterS({
      a: (a) => a === 'b',
      b: (b): b is 1 => b === 1,
    })
  ),
  { b: 1, c: 'abc' } as const
)
```

Added in v3.0.0

## foldMapS

Given a monoid and a struct of functions outputting its type parameter,
fold a corresponding struct of values into a single value.

**Signature**

```ts
export declare const foldMapS: (
  O: Ord<string>
) => <M>(M: Monoid<M>) => <A>(f: { [key in keyof A]?: ((a: A[key]) => M) | undefined }) => (fa: NonEmpty<A>) => M
```

**Example**

```ts
import { pipe, identity } from 'fp-ts/function'
import { foldMapS } from 'fp-ts/struct'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    foldMapS(S.Ord)(S.Monoid)({
      a: identity,
      b: (b) => b.toString(),
    })
  ),
  'a1'
)
```

Added in v3.0.0

## mapS

Given a struct of functions map a corresponding struct of values.

**Signature**

```ts
export declare const mapS: <A, B extends { [k in keyof A]?: ((val: A[k]) => unknown) | undefined }>(
  f: B
) => (a: NonEmpty<A>) => { [key in keyof A]: B[key] extends (a: never) => infer C ? C : A[key] }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { mapS } from 'fp-ts/struct'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: true, c: 'abc' },
    mapS({
      a: (s) => s.length,
      b: (b) => !b,
    })
  ),
  { a: 1, b: false, c: 'abc' }
)
```

Added in v3.0.0

## partitionMapS

Given a struct mapping to heterogeneous Optional values,
trasform & split a corresponding struct of values
into a failing `left` struct and a passing `right` struct.

**Signature**

```ts
export declare const partitionMapS: <
  R,
  B extends { [K in keyof R]?: ((val: R[K]) => Either<unknown, unknown>) | undefined }
>(
  f: B
) => (
  fa: NonEmpty<R>
) => Separated<
  { [K in keyof B]?: (B[K] extends (a: any) => Either<infer E, unknown> ? E : never) | undefined },
  { [K in Exclude<keyof R, keyof B>]: R[K] } &
    { [K in keyof B]?: (B[K] extends (a: any) => Either<unknown, infer A> ? A : never) | undefined }
>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { partitionMapS } from 'fp-ts/struct'
import * as E from 'fp-ts/Either'
import { separated } from 'fp-ts/Separated'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    partitionMapS({
      a: () => E.left('fail'),
      b: (n) => (n === 1 ? E.right(n + 1) : E.left(n - 1)),
    })
  ),
  separated({ a: 'fail' }, { b: 2, c: 'abc' })
)
```

Added in v3.0.0

## partitionS

Given a struct of predicates, split & potentially refine
a corresponding struct of values into a failing `left` struct
and a passing `right` struct.

**Signature**

```ts
export declare const partitionS: <
  R,
  B extends { [K in keyof R]?: Predicate<R[K]> | Refinement<R[K], R[K]> | undefined }
>(
  f: B
) => (
  fa: NonEmpty<R>
) => Separated<
  { [K in Extract<keyof B, keyof R>]?: R[K] | undefined },
  { [K in Exclude<keyof R, keyof B>]: R[K] } &
    { [K in Extract<keyof B, keyof R>]?: (B[K] extends (a: any) => a is infer C ? C : R[K]) | undefined }
>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { partitionS } from 'fp-ts/struct'
import { separated } from 'fp-ts/Separated'

assert.deepStrictEqual(
  pipe(
    { a: 'b', b: 1, c: 'abc' },
    partitionS({
      a: (s) => s === 'a',
      b: (n): n is 1 => n === 1,
    })
  ),
  separated({ a: 'b' }, { b: 1, c: 'abc' } as const)
)
```

Added in v3.0.0

## reduceS

Given a struct of functions reduce a corresponding struct of values
down to a single value.

**Signature**

```ts
export declare const reduceS: (
  O: Ord<string>
) => <A, B>(b: B, f: { [K in keyof A]?: ((b: B, a: A[K]) => B) | undefined }) => (fa: NonEmpty<A>) => B
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { reduceS } from 'fp-ts/struct'
import { Ord } from 'fp-ts/string'
import { reverse } from 'fp-ts/Ord'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    reduceS(Ord)('', {
      a: (acc, cur) => acc + cur,
      b: (acc, cur) => acc + cur.toString(),
    })
  ),
  'a1'
)

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: 'abc' },
    reduceS(reverse(Ord))('', {
      a: (acc, cur) => acc + cur,
      b: (acc, cur) => acc + cur.toString(),
    })
  ),
  '1a'
)
```

Added in v3.0.0

## separateS

Split a heterogeneous struct of Either values into a failing
struct of its `lefts` and a struct of its `rights`.

**Signature**

```ts
export declare const separateS: <R extends Readonly<Record<string, Either<unknown, unknown>>>>(
  r: R
) => Separated<
  { [K in keyof R]?: (R[K] extends Either<infer E, unknown> ? E : never) | undefined },
  { [K in keyof R]?: (R[K] extends Either<unknown, infer A> ? A : never) | undefined }
>
```

**Example**

```ts
import { separateS } from 'fp-ts/struct'
import * as E from 'fp-ts/Either'
import { separated } from 'fp-ts/Separated'

assert.deepStrictEqual(
  separateS({ foo: E.right(123), bar: E.left('fail'), baz: E.right('abc') }),
  separated({ bar: 'fail' }, { foo: 123, baz: 'abc' })
)
```

Added in v3.0.0

## traverseS

Runs an separate action for each value in a struct, and accumulates the results.

A pipeable version of `traverseS_`

**Signature**

```ts
export declare function traverseS(
  O: Ord<string>
): {
  <F extends URIS4>(F: Apply4<F>): <
    S,
    R,
    E,
    A,
    B extends { [key in keyof A]?: (val: A[key]) => Kind4<F, S, R, E, unknown> }
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
      [key in keyof A]: B[key] extends (a: never) => Kind4<F, S, R, E, infer C> ? C : A[key]
    }
  >
  <F extends URIS3>(F: Apply3<F>): <R, E, A, B extends { [key in keyof A]?: (val: A[key]) => Kind3<F, R, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof A]: B[key] extends (a: never) => Kind3<F, R, E, infer C> ? C : A[key]
    }
  >
  <F extends URIS3, E>(F: Apply3C<F, E>): <
    R,
    A,
    B extends { [key in keyof A]?: (val: A[key]) => Kind3<F, R, E, unknown> }
  >(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind3<
    F,
    R,
    E,
    {
      [key in keyof A]: B[key] extends (a: never) => Kind3<F, R, E, infer C> ? C : A[key]
    }
  >
  <F extends URIS2>(F: Apply2<F>): <E, A, B extends { [key in keyof A]?: (val: A[key]) => Kind2<F, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [key in keyof A]: B[key] extends (a: never) => Kind2<F, E, infer C> ? C : A[key]
    }
  >
  <F extends URIS2, E>(F: Apply2C<F, E>): <A, B extends { [key in keyof A]?: (val: A[key]) => Kind2<F, E, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    {
      [key in keyof A]: B[key] extends (a: never) => Kind2<F, E, infer C> ? C : A[key]
    }
  >
  <F extends URIS>(F: Apply1<F>): <A, B extends { [key in keyof A]?: (val: A[key]) => Kind<F, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => Kind<
    F,
    {
      [key in keyof A]: B[key] extends (a: never) => Kind<F, infer C> ? C : A[key]
    }
  >
  <F>(F: Apply<F>): <A, B extends { [key in keyof A]?: (val: A[key]) => HKT<F, unknown> }>(
    f: B
  ) => (
    ta: NonEmpty<A>
  ) => HKT<
    F,
    {
      [key in keyof A]: B[key] extends (a: never) => HKT<F, infer C> ? C : A[key]
    }
  >
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { traverseS } from 'fp-ts/struct'
import { Ord } from 'fp-ts/string'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    { a: 1, b: 'b', c: 'abc' },
    traverseS(Ord)(O.Apply)({
      a: (n) => (n <= 2 ? O.some(n.toString()) : O.none),
      b: (b) => (b.length <= 2 ? O.some(b.length) : O.none),
    })
  ),
  O.some({ a: '1', b: 1, c: 'abc' })
)
```

Added in v3.0.0

## traverseS\_

Runs an separate action for each value in a struct, and accumulates the results.

A non-pipeable version of `traverseS`

**Signature**

```ts
export declare function traverseS_(
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
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
    } &
      { [key in Exclude<keyof A, keyof B>]: A[key] }
  >
}
```

**Example**

```ts
import { traverseS_ } from 'fp-ts/struct'
import { Ord } from 'fp-ts/string'
import * as O from 'fp-ts/Option'

const f = {
  a: (n: number) => (n <= 2 ? O.some(n.toString()) : O.none),
  b: (b: string) => (b.length <= 2 ? O.some(b.length) : O.none),
}

assert.deepStrictEqual(traverseS_(Ord)(O.Apply)({ a: 1, b: 'b' }, f), O.some({ a: '1', b: 1 }))
assert.deepStrictEqual(traverseS_(Ord)(O.Apply)({ a: 3, b: '2' }, f), O.none)
```

Added in v3.0.0

## unCompact

Wrap each key in heterogeneous struct of nullable values in `Option`.

Note: cannot properly wrap optional/partial keys.

**Signature**

```ts
export declare const unCompact: <A>(a: NonEmpty<A>) => { [K in keyof A]: Option<NonNullable<A[K]>> }
```

**Example**

```ts
import { unCompact } from 'fp-ts/struct'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(unCompact({ foo: 123, bar: undefined, baz: 'abc' }), {
  foo: O.some(123),
  bar: O.none,
  baz: O.some('abc'),
})
```

Added in v3.0.0

## wiltS

Applies a `traverseS` and a `partitionMap` as a single combined operation.

**Signature**

```ts
export declare const wiltS: (
  O: Ord<string>
) => {
  <F extends 'ReaderEither' | 'ReaderTaskEither'>(F: Apply3<F>): <
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
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
  <F extends 'ReaderEither' | 'ReaderTaskEither', E>(F: Apply3C<F, E>): <
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
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
  <
    F extends
      | 'Const'
      | 'Separated'
      | 'Either'
      | 'Reader'
      | 'State'
      | 'These'
      | 'IOEither'
      | 'ReaderTask'
      | 'TaskEither'
      | 'Tuple2'
      | 'ReadonlyMap'
      | 'Store'
      | 'TaskThese'
      | 'Traced'
      | 'Writer'
  >(
    F: Apply2<F>
  ): <E, A, B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    Separated<
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
  <
    F extends
      | 'Const'
      | 'Separated'
      | 'Either'
      | 'Reader'
      | 'State'
      | 'These'
      | 'IOEither'
      | 'ReaderTask'
      | 'TaskEither'
      | 'Tuple2'
      | 'ReadonlyMap'
      | 'Store'
      | 'TaskThese'
      | 'Traced'
      | 'Writer',
    E
  >(
    F: Apply2C<F, E>
  ): <A, B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<
    F,
    E,
    Separated<
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
  <
    F extends
      | 'Eq'
      | 'TaskOption'
      | 'Predicate'
      | 'ReadonlyRecord'
      | 'ReadonlyNonEmptyArray'
      | 'Option'
      | 'Ord'
      | 'IO'
      | 'Task'
      | 'Identity'
      | 'ReadonlyArray'
      | 'Tree'
  >(
    F: Apply1<F>
  ): <A, B extends { [K in keyof A]: (val: A[K]) => Kind<F, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind<
    F,
    Separated<
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind<F, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends Kind<F, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
  <F>(F: Apply<F>): <A, B extends { [K in keyof A]: (val: A[K]) => HKT<F, Either<unknown, unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => HKT<
    F,
    Separated<
      { [K in keyof A]?: (ReturnType<B[K]> extends HKT<F, Either<infer L, unknown>> ? L : never) | undefined },
      { [K in keyof A]?: (ReturnType<B[K]> extends HKT<F, Either<unknown, infer R>> ? R : never) | undefined }
    >
  >
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { wiltS } from 'fp-ts/struct'
import * as Tr from 'fp-ts/Tree'
import * as E from 'fp-ts/Either'
import { separated } from 'fp-ts/Separated'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(
  pipe(
    { a: 2, b: 'a' },
    wiltS(S.Ord)(Tr.Apply)({
      a: (n) => Tr.of(n === 1 ? E.right(n.toString()) : E.left(n - 1)),
      b: (n) => Tr.of(n === 'a' ? E.right(n.length) : E.left('fail')),
    })
  ),
  Tr.of(separated({ a: 1 }, { b: 1 }))
)
```

Added in v3.0.0

## witherS

Applies a traverseS and a filterMap as a single combined operation.

**Signature**

```ts
export declare const witherS: (
  O: Ord<string>
) => {
  <F extends 'ReaderEither' | 'ReaderTaskEither'>(F: Apply3<F>): <
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
    { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Option<infer C>> ? C : never) | undefined }
  >
  <F extends 'ReaderEither' | 'ReaderTaskEither', E>(F: Apply3C<F, E>): <
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
    { [K in keyof A]?: (ReturnType<B[K]> extends Kind3<F, R, E, Option<infer C>> ? C : never) | undefined }
  >
  <
    F extends
      | 'Const'
      | 'Separated'
      | 'Either'
      | 'Reader'
      | 'State'
      | 'These'
      | 'IOEither'
      | 'ReaderTask'
      | 'TaskEither'
      | 'Tuple2'
      | 'ReadonlyMap'
      | 'Store'
      | 'TaskThese'
      | 'Traced'
      | 'Writer',
    E
  >(
    F: Apply2<F>
  ): <E, A, B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<F, E, { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Option<infer C>> ? C : never) | undefined }>
  <
    F extends
      | 'Const'
      | 'Separated'
      | 'Either'
      | 'Reader'
      | 'State'
      | 'These'
      | 'IOEither'
      | 'ReaderTask'
      | 'TaskEither'
      | 'Tuple2'
      | 'ReadonlyMap'
      | 'Store'
      | 'TaskThese'
      | 'Traced'
      | 'Writer',
    E
  >(
    F: Apply2C<F, E>
  ): <A, B extends { [K in keyof A]: (val: A[K]) => Kind2<F, E, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind2<F, E, { [K in keyof A]?: (ReturnType<B[K]> extends Kind2<F, E, Option<infer C>> ? C : never) | undefined }>
  <
    F extends
      | 'Eq'
      | 'TaskOption'
      | 'Predicate'
      | 'ReadonlyRecord'
      | 'ReadonlyNonEmptyArray'
      | 'Option'
      | 'Ord'
      | 'IO'
      | 'Task'
      | 'Identity'
      | 'ReadonlyArray'
      | 'Tree'
  >(
    F: Apply1<F>
  ): <A, B extends { [K in keyof A]: (val: A[K]) => Kind<F, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => Kind<F, { [K in keyof A]?: (ReturnType<B[K]> extends Kind<F, Option<infer C>> ? C : never) | undefined }>
  <F>(F: Apply<F>): <A, B extends { [K in keyof A]: (val: A[K]) => HKT<F, Option<unknown>> }>(
    f: B
  ) => (
    fa: NonEmpty<A>
  ) => HKT<F, { [K in keyof A]?: (ReturnType<B[K]> extends HKT<F, Option<infer C>> ? C : never) | undefined }>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { witherS } from 'fp-ts/struct'
import * as Tr from 'fp-ts/Tree'
import * as O from 'fp-ts/Option'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(
  pipe(
    { a: 2, b: 'a' },
    witherS(S.Ord)(Tr.Apply)({
      a: (n) => Tr.of(n === 1 ? O.some(n.toString()) : O.none),
      b: (n) => Tr.of(n === 'a' ? O.some(n.length) : O.none),
    })
  ),
  Tr.of({ b: 1 })
)
```

Added in v3.0.0

# instances

## getAssignSemigroup

Return a semigroup which works like `Object.assign`.

**Signature**

```ts
export declare const getAssignSemigroup: <A = never>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/struct'
import { pipe } from 'fp-ts/function'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
```

Added in v3.0.0
