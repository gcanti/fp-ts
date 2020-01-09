---
title: Ord.ts
nav_order: 59
parent: Modules
---

# Ord overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

See [Getting started with fp-ts: Ord](https://gcanti.github.io/fp-ts/getting-started/Ord.html)

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Ord (interface)](#ord-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ord (constant)](#ord-constant)
- [ordBoolean (constant)](#ordboolean-constant)
- [ordDate (constant)](#orddate-constant)
- [ordNumber (constant)](#ordnumber-constant)
- [ordString (constant)](#ordstring-constant)
- [between (function)](#between-function)
- [clamp (function)](#clamp-function)
- [fromCompare (function)](#fromcompare-function)
- [geq (function)](#geq-function)
- [getDualOrd (function)](#getdualord-function)
- [getMonoid (function)](#getmonoid-function)
- [~~getSemigroup~~ (function)](#getsemigroup-function)
- [getTupleOrd (function)](#gettupleord-function)
- [gt (function)](#gt-function)
- [leq (function)](#leq-function)
- [lt (function)](#lt-function)
- [max (function)](#max-function)
- [min (function)](#min-function)
- [contramap (export)](#contramap-export)

---

# Ord (interface)

**Signature**

```ts
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
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
export const URI: "Ord" = ...
```

Added in v2.0.0

# ord (constant)

**Signature**

```ts
export const ord: Contravariant1<URI> = ...
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

# getMonoid (function)

Returns a `Monoid` such that:

- its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
- its `empty` value is an `Ord` that always considers compared elements equal

**Signature**

```ts
export function getMonoid<A = never>(): Monoid<Ord<A>> { ... }
```

**Example**

```ts
import { sort } from 'fp-ts/lib/Array'
import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { fold } from 'fp-ts/lib/Monoid'

interface User {
  id: number
  name: string
  age: number
  rememberMe: boolean
}

const byName = pipe(
  ordString,
  contramap((p: User) => p.name)
)

const byAge = pipe(
  ordNumber,
  contramap((p: User) => p.age)
)

const byRememberMe = pipe(
  ordBoolean,
  contramap((p: User) => p.rememberMe)
)

const M = getMonoid<User>()

const users: Array<User> = [
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true }
]

// sort by name, then by age, then by `rememberMe`
const O1 = fold(M)([byName, byAge, byRememberMe])
assert.deepStrictEqual(sort(O1)(users), [
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 1, name: 'Guido', age: 47, rememberMe: false }
])

// now `rememberMe = true` first, then by name, then by age
const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
assert.deepStrictEqual(sort(O2)(users), [
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 1, name: 'Guido', age: 47, rememberMe: false }
])
```

Added in v2.4.0

# ~~getSemigroup~~ (function)

Use `getMonoid` instead

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

# contramap (export)

**Signature**

```ts
<A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

Added in v2.0.0
