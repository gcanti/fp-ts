---
title: Setoid.ts
nav_order: 77
---

# Overview

The `Setoid` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `S.equals(a, a) === true`
2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Setoid](#setoid)
- [setoidBoolean](#setoidboolean)
- [setoidDate](#setoiddate)
- [setoidNumber](#setoidnumber)
- [setoidString](#setoidstring)
- [contramap](#contramap)
- [fromEquals](#fromequals)
- [getArraySetoid](#getarraysetoid)
- [~~getProductSetoid~~](#getproductsetoid)
- [~~getRecordSetoid~~](#getrecordsetoid)
- [getStructSetoid](#getstructsetoid)
- [getTupleSetoid](#gettuplesetoid)
- [strictEqual](#strictequal)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Setoid

**Signature** (interface)

```ts
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v1.0.0

# setoidBoolean

**Signature** (constant)

```ts
export const setoidBoolean: Setoid<boolean> = ...
```

Added in v1.0.0

# setoidDate

**Signature** (constant)

```ts
export const setoidDate: Setoid<Date> = ...
```

Added in v1.4.0

# setoidNumber

**Signature** (constant)

```ts
export const setoidNumber: Setoid<number> = ...
```

Added in v1.0.0

# setoidString

**Signature** (constant)

```ts
export const setoidString: Setoid<string> = ...
```

Added in v1.0.0

# contramap

Returns the `Setoid` corresponding to the partitions of `B` induced by `f`

**Signature** (function)

```ts
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => ...
```

Added in v1.2.0

# fromEquals

**Signature** (function)

```ts
export const fromEquals = <A>(equals: (x: A, y: A) => boolean): Setoid<A> => ...
```

Added in v1.14.0

# getArraySetoid

**Signature** (function)

```ts
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => ...
```

Added in v1.0.0

# ~~getProductSetoid~~

Use `getTupleSetoid` instead

**Signature** (function)

```ts
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => ...
```

Added in v1.0.0

# ~~getRecordSetoid~~

Use `getStructSetoid` instead

**Signature** (function)

```ts
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => ...
```

Added in v1.0.0

# getStructSetoid

**Signature** (function)

```ts
export const getStructSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => ...
```

Added in v1.14.2

# getTupleSetoid

**Signature** (function)

```ts
export const getTupleSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => ...
```

Added in v1.14.2

# strictEqual

**Signature** (function)

```ts
export const strictEqual = <A>(a: A, b: A): boolean => ...
```

Added in v1.0.0
