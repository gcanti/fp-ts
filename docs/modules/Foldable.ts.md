---
title: Foldable.ts
nav_order: 27
parent: Modules
---

## Foldable overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Foldable (interface)](#foldable-interface)
  - [Foldable1 (interface)](#foldable1-interface)
  - [Foldable2 (interface)](#foldable2-interface)
  - [Foldable2C (interface)](#foldable2c-interface)
  - [Foldable3 (interface)](#foldable3-interface)
  - [Foldable3C (interface)](#foldable3c-interface)
  - [Foldable4 (interface)](#foldable4-interface)
- [utils](#utils)
  - [intercalate](#intercalate)
  - [reduceM](#reducem)
  - [toArray](#toarray)

---

# type classes

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

Added in v2.0.0

## Foldable1 (interface)

**Signature**

```ts
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

Added in v2.0.0

## Foldable2 (interface)

**Signature**

```ts
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}
```

Added in v2.0.0

## Foldable2C (interface)

**Signature**

```ts
export interface Foldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}
```

Added in v2.0.0

## Foldable3 (interface)

**Signature**

```ts
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v2.0.0

## Foldable3C (interface)

**Signature**

```ts
export interface Foldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v2.2.0

## Foldable4 (interface)

**Signature**

```ts
export interface Foldable4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

Added in v2.0.0

# utils

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature**

```ts
export declare function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable3<F>
): <R, E>(sep: M) => (fm: Kind3<F, R, E, M>) => M
export declare function intercalate<M, F extends URIS2>(
  M: Monoid<M>,
  F: Foldable2<F>
): <E>(sep: M) => (fm: Kind2<F, E, M>) => M
export declare function intercalate<M, F extends URIS2, E>(
  M: Monoid<M>,
  F: Foldable2C<F, E>
): (sep: M) => (fm: Kind2<F, E, M>) => M
export declare function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable1<F>): (sep: M) => (fm: Kind<F, M>) => M
export declare function intercalate<M, F>(M: Monoid<M>, F: Foldable<F>): (sep: M) => (fm: HKT<F, M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/Foldable'
import { monoidString } from 'fp-ts/Monoid'
import { make, Foldable } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const t = make('a', [make('b', []), make('c', []), make('d', [])])
assert.strictEqual(pipe(t, intercalate(monoidString, Foldable)('|')), 'a|b|c|d')
```

Added in v2.0.0

## reduceM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export declare function reduceM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable1<F>
): <B, A, R, E>(b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => (fa: Kind<F, A>) => Kind3<M, R, E, B>
export declare function reduceM<M extends URIS3, F extends URIS, E>(
  M: Monad3C<M, E>,
  F: Foldable1<F>
): <B, A, R>(b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => (fa: Kind<F, A>) => Kind3<M, R, E, B>
export declare function reduceM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable1<F>
): <B, A, E>(b: B, f: (b: B, a: A) => Kind2<M, E, B>) => (fa: Kind<F, A>) => Kind2<M, E, B>
export declare function reduceM<M extends URIS2, F extends URIS, E>(
  M: Monad2C<M, E>,
  F: Foldable1<F>
): <B, A>(b: B, f: (b: B, a: A) => Kind2<M, E, B>) => (fa: Kind<F, A>) => Kind2<M, E, B>
export declare function reduceM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable1<F>
): <B, A>(b: B, f: (b: B, a: A) => Kind<M, B>) => (fa: Kind<F, A>) => Kind<M, B>
export declare function reduceM<M, F>(
  M: Monad<M>,
  F: Foldable<F>
): <B, A>(b: B, f: (b: B, a: A) => HKT<M, B>) => (fa: HKT<F, A>) => HKT<M, B>
```

**Example**

```ts
import { reduceM } from 'fp-ts/Foldable'
import { Monad, some } from 'fp-ts/Option'
import { make, Foldable } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const t = make(1, [make(2, []), make(3, []), make(4, [])])
assert.deepStrictEqual(
  pipe(
    t,
    reduceM(Monad, Foldable)(0, (b, a) => (a > 2 ? some(b + a) : some(b)))
  ),
  some(7)
)
```

Added in v2.8.0

## toArray

Transforms a `Foldable` into a read-only array.

**Signature**

```ts
export declare function toArray<F extends URIS4>(
  F: Foldable4<F>
): <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => ReadonlyArray<A>
export declare function toArray<F extends URIS3>(F: Foldable3<F>): <R, E, A>(fa: Kind3<F, R, E, A>) => ReadonlyArray<A>
export declare function toArray<F extends URIS3, E>(
  F: Foldable3C<F, E>
): <R, A>(fa: Kind3<F, R, E, A>) => ReadonlyArray<A>
export declare function toArray<F extends URIS2>(F: Foldable2<F>): <E, A>(fa: Kind2<F, E, A>) => ReadonlyArray<A>
export declare function toArray<F extends URIS2, E>(F: Foldable2C<F, E>): <A>(fa: Kind2<F, E, A>) => ReadonlyArray<A>
export declare function toArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Kind<F, A>) => ReadonlyArray<A>
export declare function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => ReadonlyArray<A>
```

**Example**

```ts
import { toArray } from 'fp-ts/Foldable'
import { Foldable, make } from 'fp-ts/Tree'

const t = make(1, [make(2, []), make(3, []), make(4, [])])
assert.deepStrictEqual(toArray(Foldable)(t), [1, 2, 3, 4])
```

Added in v2.8.0
