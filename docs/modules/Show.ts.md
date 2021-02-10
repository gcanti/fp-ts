---
title: Show.ts
nav_order: 87
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

- [combinators](#combinators)
  - [struct](#struct)
  - [tuple](#tuple)
  - [~~getStructShow~~](#getstructshow)
  - [~~getTupleShow~~](#gettupleshow)
- [instances](#instances)
  - [~~showBoolean~~](#showboolean)
  - [~~showNumber~~](#shownumber)
  - [~~showString~~](#showstring)
- [type classes](#type-classes)
  - [Show (interface)](#show-interface)

---

# combinators

## struct

**Signature**

```ts
export declare const struct: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<A>
```

Added in v2.10.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...shows: { [K in keyof A]: Show<A[K]> }) => Show<A>
```

Added in v2.10.0

## ~~getStructShow~~

Use `struct` instead.

**Signature**

```ts
export declare const getStructShow: <O extends Readonly<Record<string, any>>>(
  shows: { [K in keyof O]: Show<O[K]> }
) => Show<O>
```

Added in v2.0.0

## ~~getTupleShow~~

Use `tuple` instead.

**Signature**

```ts
export declare const getTupleShow: <T extends readonly Show<any>[]>(
  ...shows: T
) => Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never }>
```

Added in v2.0.0

# instances

## ~~showBoolean~~

Use `boolean.Show` instead.

**Signature**

```ts
export declare const showBoolean: Show<boolean>
```

Added in v2.0.0

## ~~showNumber~~

Use `number.Show` instead.

**Signature**

```ts
export declare const showNumber: Show<number>
```

Added in v2.0.0

## ~~showString~~

Use `string.Show` instead.

**Signature**

```ts
export declare const showString: Show<string>
```

Added in v2.0.0

# type classes

## Show (interface)

**Signature**

```ts
export interface Show<A> {
  readonly show: (a: A) => string
}
```

Added in v2.0.0
