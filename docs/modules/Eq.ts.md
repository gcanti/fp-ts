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

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Eq (interface)](#eq-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [contramap](#contramap)
- [eq](#eq)
- [eqBoolean](#eqboolean)
- [eqDate](#eqdate)
- [eqNumber](#eqnumber)
- [eqString](#eqstring)
- [fromEquals](#fromequals)
- [getStructEq](#getstructeq)
- [getTupleEq](#gettupleeq)
- [strictEqual](#strictequal)

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

# URI

**Signature**

```ts
export const URI: "Eq" = ...
```

Added in v2.0.0

# contramap

**Signature**

```ts
<A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v2.0.0

# eq

**Signature**

```ts
export const eq: Contravariant1<URI> = ...
```

Added in v2.0.0

# eqBoolean

**Signature**

```ts
export const eqBoolean: Eq<boolean> = ...
```

Added in v2.0.0

# eqDate

**Signature**

```ts
export const eqDate: Eq<Date> = ...
```

Added in v2.0.0

# eqNumber

**Signature**

```ts
export const eqNumber: Eq<number> = ...
```

Added in v2.0.0

# eqString

**Signature**

```ts
export const eqString: Eq<string> = ...
```

Added in v2.0.0

# fromEquals

**Signature**

```ts
export function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A> { ... }
```

Added in v2.0.0

# getStructEq

**Signature**

```ts
export function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O> { ... }
```

Added in v2.0.0

# getTupleEq

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export function getTupleEq<T extends ReadonlyArray<Eq<any>>>(
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

# strictEqual

**Signature**

```ts
export function strictEqual<A>(a: A, b: A): boolean { ... }
```

Added in v2.0.0
