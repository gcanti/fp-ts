---
title: Ord.ts
nav_order: 62
---

# Overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Ord](#ord)
- [ordBoolean](#ordboolean)
- [ordDate](#orddate)
- [ordNumber](#ordnumber)
- [ordString](#ordstring)
- [between](#between)
- [clamp](#clamp)
- [contramap](#contramap)
- [fromCompare](#fromcompare)
- [getDualOrd](#getdualord)
- [~~getProductOrd~~](#getproductord)
- [getSemigroup](#getsemigroup)
- [getTupleOrd](#gettupleord)
- [greaterThan](#greaterthan)
- [greaterThanOrEq](#greaterthanoreq)
- [lessThan](#lessthan)
- [lessThanOrEq](#lessthanoreq)
- [max](#max)
- [min](#min)
- [unsafeCompare](#unsafecompare)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ord

**Signature** (interface)

```ts
export interface Ord<A> extends Setoid<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

Added in v1.0.0

# ordBoolean

**Signature** (constant)

```ts
export const ordBoolean: Ord<boolean> = ...
```

Added in v1.0.0

# ordDate

**Signature** (constant)

```ts
export const ordDate: Ord<Date> = ...
```

Added in v1.4.0

# ordNumber

**Signature** (constant)

```ts
export const ordNumber: Ord<number> = ...
```

Added in v1.0.0

# ordString

**Signature** (constant)

```ts
export const ordString: Ord<string> = ...
```

Added in v1.0.0

# between

Test whether a value is between a minimum and a maximum (inclusive)

**Signature** (function)

```ts
export const between = <A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => boolean) => ...
```

Added in v1.0.0

# clamp

Clamp a value between a minimum and a maximum

**Signature** (function)

```ts
export const clamp = <A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => A) => ...
```

Added in v1.0.0

# contramap

**Signature** (function)

```ts
export const contramap = <A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B> => ...
```

Added in v1.0.0

# fromCompare

**Signature** (function)

```ts
export const fromCompare = <A>(compare: (x: A, y: A) => Ordering): Ord<A> => ...
```

Added in v1.0.0

# getDualOrd

**Signature** (function)

```ts
export const getDualOrd = <A>(O: Ord<A>): Ord<A> => ...
```

Added in v1.3.0

# ~~getProductOrd~~

Use `getTupleOrd` instead

**Signature** (function)

```ts
export const getProductOrd = <A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A = never>(): Semigroup<Ord<A>> => ...
```

Added in v1.0.0

# getTupleOrd

**Signature** (function)

```ts
export const getTupleOrd = <A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]> => ...
```

Added in v1.14.3

# greaterThan

Test whether one value is _strictly greater than_ another

**Signature** (function)

```ts
export const greaterThan = <A>(O: Ord<A>) => (x: A, y: A): boolean => ...
```

Added in v1.0.0

# greaterThanOrEq

Test whether one value is _non-strictly greater than_ another

**Signature** (function)

```ts
export const greaterThanOrEq = <A>(O: Ord<A>) => (x: A, y: A): boolean => ...
```

Added in v1.0.0

# lessThan

Test whether one value is _strictly less than_ another

**Signature** (function)

```ts
export const lessThan = <A>(O: Ord<A>) => (x: A, y: A): boolean => ...
```

Added in v1.0.0

# lessThanOrEq

Test whether one value is _non-strictly less than_ another

**Signature** (function)

```ts
export const lessThanOrEq = <A>(O: Ord<A>) => (x: A, y: A): boolean => ...
```

Added in v1.0.0

# max

Take the maximum of two values. If they are considered equal, the first argument is chosen

**Signature** (function)

```ts
export const max = <A>(O: Ord<A>) => (x: A, y: A): A => ...
```

Added in v1.0.0

# min

Take the minimum of two values. If they are considered equal, the first argument is chosen

**Signature** (function)

```ts
export const min = <A>(O: Ord<A>) => (x: A, y: A): A => ...
```

Added in v1.0.0

# unsafeCompare

**Signature** (function)

```ts
export const unsafeCompare = (x: any, y: any): Ordering => ...
```

Added in v1.0.0
