---
title: FoldableWithIndex.ts
nav_order: 29
parent: Modules
---

## FoldableWithIndex overview

A `Foldable` with an additional index.
A `FoldableWithIndex` instance must be compatible with its `Foldable` instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)
  - [FoldableWithIndex1 (interface)](#foldablewithindex1-interface)
  - [FoldableWithIndex2 (interface)](#foldablewithindex2-interface)
  - [FoldableWithIndex2C (interface)](#foldablewithindex2c-interface)
  - [FoldableWithIndex3 (interface)](#foldablewithindex3-interface)
  - [FoldableWithIndex3C (interface)](#foldablewithindex3c-interface)
  - [FoldableWithIndex4 (interface)](#foldablewithindex4-interface)

---

# type classes

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F, I> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

Added in v2.0.0

## FoldableWithIndex1 (interface)

**Signature**

```ts
export interface FoldableWithIndex1<F extends URIS, I> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

Added in v2.0.0

## FoldableWithIndex2 (interface)

**Signature**

```ts
export interface FoldableWithIndex2<F extends URIS2, I> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}
```

Added in v2.0.0

## FoldableWithIndex2C (interface)

**Signature**

```ts
export interface FoldableWithIndex2C<F extends URIS2, I, E> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}
```

Added in v2.0.0

## FoldableWithIndex3 (interface)

**Signature**

```ts
export interface FoldableWithIndex3<F extends URIS3, I> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v2.0.0

## FoldableWithIndex3C (interface)

**Signature**

```ts
export interface FoldableWithIndex3C<F extends URIS3, I, E> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}
```

Added in v2.2.0

## FoldableWithIndex4 (interface)

**Signature**

```ts
export interface FoldableWithIndex4<F extends URIS4, I> {
  readonly URI: F
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}
```

Added in v2.0.0
