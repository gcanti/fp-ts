---
title: Show.ts
nav_order: 72
parent: Modules
---

## Show overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getStructShow](#getstructshow)
  - [getTupleShow](#gettupleshow)
  - [showNumber](#shownumber)
- [type classes](#type-classes)
  - [Show (interface)](#show-interface)

---

# instances

## getStructShow

**Signature**

```ts
export declare const getStructShow: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<A>
```

Added in v3.0.0

## getTupleShow

**Signature**

```ts
export declare const getTupleShow: <A extends readonly unknown[]>(...shows: { [K in keyof A]: Show<A[K]> }) => Show<A>
```

Added in v3.0.0

## showNumber

**Signature**

```ts
export declare const showNumber: Show<number>
```

Added in v3.0.0

# type classes

## Show (interface)

The `Show` type class represents those types which can be converted into
a human-readable `string` representation.

While not required, it is recommended that for any expression `x`, the
string `show(x)` be executable TypeScript code which evaluates to the same
value as the expression `x`.

**Signature**

```ts
export interface Show<A> {
  readonly show: (a: A) => string
}
```

Added in v3.0.0
