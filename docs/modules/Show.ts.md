---
title: Show.ts
nav_order: 98
parent: Modules
---

## Show overview

The `Show` type class represents those types which can be converted into
a human-readable `string` representation.

While not required, it is recommended that for any expression `x`, the
string `show(x)` be executable TypeScript code which evaluates to the same
value as the expression `x`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Show (interface)](#show-interface)
- [utils](#utils)
  - [struct](#struct)
  - [tuple](#tuple)
- [zone of death](#zone-of-death)
  - [~~getStructShow~~](#getstructshow)
  - [~~getTupleShow~~](#gettupleshow)
  - [~~showBoolean~~](#showboolean)
  - [~~showNumber~~](#shownumber)
  - [~~showString~~](#showstring)

---

# model

## Show (interface)

**Signature**

```ts
export interface Show<A> {
  readonly show: (a: A) => string
}
```

Added in v2.0.0

# utils

## struct

**Signature**

```ts
export declare const struct: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<{ readonly [K in keyof A]: A[K] }>
```

Added in v2.10.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...shows: { [K in keyof A]: Show<A[K]> }
) => Show<Readonly<A>>
```

Added in v2.10.0

# zone of death

## ~~getStructShow~~

Use [`struct`](#struct) instead.

**Signature**

```ts
export declare const getStructShow: <O extends Readonly<Record<string, any>>>(shows: {
  [K in keyof O]: Show<O[K]>
}) => Show<O>
```

Added in v2.0.0

## ~~getTupleShow~~

Use [`tuple`](#tuple) instead.

**Signature**

```ts
export declare const getTupleShow: <T extends readonly Show<any>[]>(
  ...shows: T
) => Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never }>
```

Added in v2.0.0

## ~~showBoolean~~

Use [`Show`](./boolean.ts.html#show) instead.

**Signature**

```ts
export declare const showBoolean: Show<boolean>
```

Added in v2.0.0

## ~~showNumber~~

Use [`Show`](./number.ts.html#show) instead.

**Signature**

```ts
export declare const showNumber: Show<number>
```

Added in v2.0.0

## ~~showString~~

Use [`Show`](./string.ts.html#show) instead.

**Signature**

```ts
export declare const showString: Show<string>
```

Added in v2.0.0
