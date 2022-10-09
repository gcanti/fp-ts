---
title: Magma.ts
nav_order: 48
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
  - [combineAllNonEmpty](#combineallnonempty)
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

Given a sequence of `as`, combine them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const combineAll: <S>(Magma: Magma<S>) => (startWith: S) => (collection: Iterable<S>) => S
```

**Example**

```ts
import { combineAll } from 'fp-ts/Magma'
import * as N from 'fp-ts/number'

const subAll = combineAll(N.MagmaSub)(0)

assert.deepStrictEqual(subAll([1, 2, 3]), -6)
```

Added in v3.0.0

## combineAllNonEmpty

**Signature**

```ts
export declare const combineAllNonEmpty: <S>(Magma: Magma<S>) => (head: S, ...tail: readonly S[]) => S
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

**Example**

```ts
import { reverse, combineAll } from 'fp-ts/Magma'
import * as N from 'fp-ts/number'

const subAll = combineAll(reverse(N.MagmaSub))(0)

assert.deepStrictEqual(subAll([1, 2, 3]), 2)
```

Added in v3.0.0
