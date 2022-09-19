---
title: NonEmptyArray.ts
nav_order: 63
parent: Modules
---

## NonEmptyArray overview

Data structure which represents non-empty **mutable** arrays.

This module is mainly useful while implementing features for `ReadonlyArray` and `ReadonlyNonEmptyArray`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromReadonlyNonEmptyArray](#fromreadonlynonemptyarray)
- [model](#model)
  - [NonEmptyArray (interface)](#nonemptyarray-interface)

---

# constructors

## fromReadonlyNonEmptyArray

**Signature**

```ts
export declare const fromReadonlyNonEmptyArray: <A>(as: ReadonlyNonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v3.0.0

# model

## NonEmptyArray (interface)

**Signature**

```ts
export interface NonEmptyArray<A> extends Array<A> {
  // tslint:disable-next-line: readonly-keyword
  0: A
}
```

Added in v3.0.0
