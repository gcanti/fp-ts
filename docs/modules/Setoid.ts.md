---
title: Setoid.ts
nav_order: 77
parent: Modules
---

# Overview

The `Setoid` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `S.equals(a, a) === true`
2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`

See [Getting started with fp-ts: Setoid](https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3)

---

<h2 class="text-delta">Table of contents</h2>

- [Setoid (interface)](#setoid-interface)
- [setoidBoolean (constant)](#setoidboolean-constant)
- [setoidDate (constant)](#setoiddate-constant)
- [setoidNumber (constant)](#setoidnumber-constant)
- [setoidString (constant)](#setoidstring-constant)
- [contramap (function)](#contramap-function)
- [fromEquals (function)](#fromequals-function)
- [getArraySetoid (function)](#getarraysetoid-function)
- [~~getProductSetoid~~ (function)](#getproductsetoid-function)
- [~~getRecordSetoid~~ (function)](#getrecordsetoid-function)
- [getStructSetoid (function)](#getstructsetoid-function)
- [getTupleSetoid (function)](#gettuplesetoid-function)
- [strictEqual (function)](#strictequal-function)

---

# Setoid (interface)

**Signature**

```ts
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v1.0.0

# setoidBoolean (constant)

**Signature**

```ts
export const setoidBoolean: Setoid<boolean> = ...
```

Added in v1.0.0

# setoidDate (constant)

**Signature**

```ts
export const setoidDate: Setoid<Date> = ...
```

Added in v1.4.0

# setoidNumber (constant)

**Signature**

```ts
export const setoidNumber: Setoid<number> = ...
```

Added in v1.0.0

# setoidString (constant)

**Signature**

```ts
export const setoidString: Setoid<string> = ...
```

Added in v1.0.0

# contramap (function)

Returns the `Setoid` corresponding to the partitions of `B` induced by `f`

**Signature**

```ts
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => ...
```

Added in v1.2.0

# fromEquals (function)

**Signature**

```ts
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => ...
```

Added in v1.14.0

# getArraySetoid (function)

**Signature**

```ts
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => ...
```

Added in v1.0.0

# ~~getProductSetoid~~ (function)

Use `getTupleSetoid` instead

**Signature**

```ts
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => ...
```

Added in v1.0.0

# ~~getRecordSetoid~~ (function)

Use `getStructSetoid` instead

**Signature**

```ts
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => ...
```

Added in v1.0.0

# getStructSetoid (function)

**Signature**

```ts
export const getStructSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => ...
```

Added in v1.14.2

# getTupleSetoid (function)

**Signature**

```ts
export const getTupleSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => ...
```

Added in v1.14.2

# strictEqual (function)

**Signature**

```ts
export const strictEqual = <A>(a: A, b: A): boolean => ...
```

Added in v1.0.0
