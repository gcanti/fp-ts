---
title: Magma.ts
nav_order: 58
parent: Modules
---

## Magma overview

A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`

See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [endo](#endo)
  - [filterFirst](#filterfirst)
  - [filterSecond](#filtersecond)
  - [reverse](#reverse)
- [type classes](#type-classes)
  - [Magma (interface)](#magma-interface)
- [utils](#utils)
  - [concatAll](#concatall)

---

# combinators

## endo

**Signature**

```ts
export declare const endo: <A>(f: Endomorphism<A>) => (M: Magma<A>) => Magma<A>
```

Added in v2.11.0

## filterFirst

**Signature**

```ts
export declare const filterFirst: <A>(predicate: Predicate<A>) => (M: Magma<A>) => Magma<A>
```

Added in v2.11.0

## filterSecond

**Signature**

```ts
export declare const filterSecond: <A>(predicate: Predicate<A>) => (M: Magma<A>) => Magma<A>
```

Added in v2.11.0

## reverse

The dual of a `Magma`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const reverse: <A>(M: Magma<A>) => Magma<A>
```

**Example**

```ts
import { reverse, concatAll } from 'fp-ts/Magma'
import * as N from 'fp-ts/number'

const subAll = concatAll(reverse(N.MagmaSub))(0)

assert.deepStrictEqual(subAll([1, 2, 3]), 2)
```

Added in v2.11.0

# type classes

## Magma (interface)

**Signature**

```ts
export interface Magma<A> {
  readonly concat: (x: A, y: A) => A
}
```

Added in v2.0.0

# utils

## concatAll

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const concatAll: <A>(M: Magma<A>) => (startWith: A) => (as: readonly A[]) => A
```

**Example**

```ts
import { concatAll } from 'fp-ts/Magma'
import * as N from 'fp-ts/number'

const subAll = concatAll(N.MagmaSub)(0)

assert.deepStrictEqual(subAll([1, 2, 3]), -6)
```

Added in v2.11.0
