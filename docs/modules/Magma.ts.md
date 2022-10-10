---
title: Magma.ts
nav_order: 46
parent: Modules
---

## Magma overview

A `Magma` is a pair `(A, combine)` in which `A` is a non-empty set and `combine` is a binary operation on `A`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Magma (interface)](#magma-interface)
- [utils](#utils)
  - [combineAll](#combineall)
  - [endo](#endo)
  - [filterFirst](#filterfirst)
  - [filterSecond](#filtersecond)
  - [reverse](#reverse)

---

# model

## Magma (interface)

**Signature**

```ts
export interface Magma<S> {
  readonly combine: (that: S) => (self: S) => S
}
```

Added in v3.0.0

# utils

## combineAll

**Signature**

```ts
export declare const combineAll: <S>(Magma: Magma<S>) => (startWith: S) => (collection: Iterable<S>) => S
```

Added in v3.0.0

## endo

**Signature**

```ts
export declare const endo: <S>(f: Endomorphism<S>) => (Magma: Magma<S>) => Magma<S>
```

Added in v3.0.0

## filterFirst

**Signature**

```ts
export declare const filterFirst: <S>(predicate: Predicate<S>) => (Magma: Magma<S>) => Magma<S>
```

Added in v3.0.0

## filterSecond

**Signature**

```ts
export declare const filterSecond: <S>(predicate: Predicate<S>) => (Magma: Magma<S>) => Magma<S>
```

Added in v3.0.0

## reverse

The dual of a `Magma`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <S>(Magma: Magma<S>) => Magma<S>
```

Added in v3.0.0
