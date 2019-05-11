---
title: Ord.ts
nav_order: 61
parent: Modules
---

# Overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

See [Getting started with fp-ts: Ord](https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e)

---

<h2 class="text-delta">Table of contents</h2>

- [Ord (interface)](#ord-interface)
- [ordBoolean (constant)](#ordboolean-constant)
- [ordDate (constant)](#orddate-constant)
- [ordNumber (constant)](#ordnumber-constant)
- [ordString (constant)](#ordstring-constant)
- [between (function)](#between-function)
- [clamp (function)](#clamp-function)
- [contramap (function)](#contramap-function)
- [fromCompare (function)](#fromcompare-function)
- [geq (function)](#geq-function)
- [getDualOrd (function)](#getdualord-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getTupleOrd (function)](#gettupleord-function)
- [gt (function)](#gt-function)
- [leq (function)](#leq-function)
- [lt (function)](#lt-function)
- [max (function)](#max-function)
- [min (function)](#min-function)

---

# Ord (interface)

**Signature**

```ts
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

Added in v2.0.0

# ordBoolean (constant)

**Signature**

```ts
export const ordBoolean: Ord<boolean> = ...
```

Added in v2.0.0

# ordDate (constant)

**Signature**

```ts
export const ordDate: Ord<Date> = ...
```

Added in v2.0.0

# ordNumber (constant)

**Signature**

```ts
export const ordNumber: Ord<number> = ...
```

Added in v2.0.0

# ordString (constant)

**Signature**

```ts
export const ordString: Ord<string> = ...
```

Added in v2.0.0

# between (function)

Test whether a value is between a minimum and a maximum (inclusive)

**Signature**

```ts
export function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean { ... }
```

Added in v2.0.0

# clamp (function)

Clamp a value between a minimum and a maximum

**Signature**

```ts
export function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A { ... }
```

Added in v2.0.0

# contramap (function)

**Signature**

```ts
export function contramap<A, B>(O: Ord<A>, f: (b: B) => A): Ord<B> { ... }
```

Added in v2.0.0

# fromCompare (function)

**Signature**

```ts
export function fromCompare<A>(compare: (x: A, y: A) => Ordering): Ord<A> { ... }
```

Added in v2.0.0

# geq (function)

Test whether one value is _non-strictly greater than_ another

**Signature**

```ts
export function geq<A>(O: Ord<A>): (x: A, y: A) => boolean { ... }
```

Added in v2.0.0

# getDualOrd (function)

**Signature**

```ts
export function getDualOrd<A>(O: Ord<A>): Ord<A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<A = never>(): Semigroup<Ord<A>> { ... }
```

Added in v2.0.0

# getTupleOrd (function)

Given a tuple of `Ord`s returns an `Ord` for the tuple

**Signature**

```ts
export function getTupleOrd<T extends Array<Ord<any>>>(
  ...ords: T
): Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }> { ... }
```

**Example**

```ts
import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'

const O = getTupleOrd(ordString, ordNumber, ordBoolean)
assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
```

Added in v2.0.0

# gt (function)

Test whether one value is _strictly greater than_ another

**Signature**

```ts
export function gt<A>(O: Ord<A>): (x: A, y: A) => boolean { ... }
```

Added in v2.0.0

# leq (function)

Test whether one value is _non-strictly less than_ another

**Signature**

```ts
export function leq<A>(O: Ord<A>): (x: A, y: A) => boolean { ... }
```

Added in v2.0.0

# lt (function)

Test whether one value is _strictly less than_ another

**Signature**

```ts
export function lt<A>(O: Ord<A>): (x: A, y: A) => boolean { ... }
```

Added in v2.0.0

# max (function)

Take the maximum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export function max<A>(O: Ord<A>): (x: A, y: A) => A { ... }
```

Added in v2.0.0

# min (function)

Take the minimum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export function min<A>(O: Ord<A>): (x: A, y: A) => A { ... }
```

Added in v2.0.0
