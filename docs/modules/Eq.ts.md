---
title: Eq.ts
nav_order: 27
parent: Modules
---

# Eq overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `E.equals(a, a) === true`
2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`

See [Getting started with fp-ts: Eq](https://gcanti.github.io/fp-ts/getting-started/Eq.html)

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Eq (interface)](#eq-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [eq (constant)](#eq-constant)
- [eqBoolean (constant)](#eqboolean-constant)
- [eqDate (constant)](#eqdate-constant)
- [eqNumber (constant)](#eqnumber-constant)
- [eqString (constant)](#eqstring-constant)
- [fromEquals (function)](#fromequals-function)
- [getStructEq (function)](#getstructeq-function)
- [getTupleEq (function)](#gettupleeq-function)
- [strictEqual (function)](#strictequal-function)
- [contramap (export)](#contramap-export)

---

# Eq (interface)

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI: "Eq" = ...
```

Added in v2.0.0

# eq (constant)

**Signature**

```ts
export const eq: Contravariant1<URI> = ...
```

Added in v2.0.0

# eqBoolean (constant)

**Signature**

```ts
export const eqBoolean: Eq<boolean> = ...
```

Added in v2.0.0

# eqDate (constant)

**Signature**

```ts
export const eqDate: Eq<Date> = ...
```

Added in v2.0.0

# eqNumber (constant)

**Signature**

```ts
export const eqNumber: Eq<number> = ...
```

Added in v2.0.0

# eqString (constant)

**Signature**

```ts
export const eqString: Eq<string> = ...
```

Added in v2.0.0

# fromEquals (function)

**Signature**

```ts
export function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A> { ... }
```

Added in v2.0.0

# getStructEq (function)

**Signature**

```ts
export function getStructEq<O extends { [key: string]: any }>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O> { ... }
```

Added in v2.0.0

# getTupleEq (function)

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export function getTupleEq<T extends Array<Eq<any>>>(
  ...eqs: T
): Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }> { ... }
```

**Example**

```ts
import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/lib/Eq'

const E = getTupleEq(eqString, eqNumber, eqBoolean)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
```

Added in v2.0.0

# strictEqual (function)

**Signature**

```ts
export function strictEqual<A>(a: A, b: A): boolean { ... }
```

Added in v2.0.0

# contramap (export)

**Signature**

```ts
<A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v2.0.0
