---
title: Ord.ts
nav_order: 59
parent: Modules
---

## Ord overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [combinators](#combinators)
  - [getDualOrd](#getdualord)
- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getTupleOrd](#gettupleord)
  - [ord](#ord)
  - [ordBigInt](#ordbigint)
  - [ordBoolean](#ordboolean)
  - [ordDate](#orddate)
  - [ordNumber](#ordnumber)
  - [ordString](#ordstring)
  - [~~getSemigroup~~](#getsemigroup)
- [type classes](#type-classes)
  - [Ord (interface)](#ord-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [geq](#geq)
  - [gt](#gt)
  - [leq](#leq)
  - [lt](#lt)
  - [max](#max)
  - [min](#min)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

Added in v2.0.0

# combinators

## getDualOrd

**Signature**

```ts
export declare function getDualOrd<A>(O: Ord<A>): Ord<A>
```

Added in v2.0.0

# constructors

## fromCompare

**Signature**

```ts
export declare function fromCompare<A>(compare: (x: A, y: A) => Ordering): Ord<A>
```

Added in v2.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Ord'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Ord'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getMonoid

Returns a `Monoid` such that:

- its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
- its `empty` value is an `Ord` that always considers compared elements equal

**Signature**

```ts
export declare function getMonoid<A = never>(): Monoid<Ord<A>>
```

**Example**

```ts
import { sort } from 'fp-ts/Array'
import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Monoid'

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
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
]

// sort by name, then by age, then by `rememberMe`
const O1 = fold(M)([byName, byAge, byRememberMe])
assert.deepStrictEqual(sort(O1)(users), [
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])

// now `rememberMe = true` first, then by name, then by age
const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
assert.deepStrictEqual(sort(O2)(users), [
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])
```

Added in v2.4.0

## getTupleOrd

Given a tuple of `Ord`s returns an `Ord` for the tuple

**Signature**

```ts
export declare function getTupleOrd<T extends ReadonlyArray<Ord<any>>>(
  ...ords: T
): Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/Ord'

const O = getTupleOrd(ordString, ordNumber, ordBoolean)
assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
```

Added in v2.0.0

## ord

**Signature**

```ts
export declare const ord: Contravariant1<'Ord'>
```

Added in v2.0.0

## ordBigInt

**Signature**

```ts
export declare const ordBigInt: Ord<bigint>
```

Added in v2.10.0

## ordBoolean

**Signature**

```ts
export declare const ordBoolean: Ord<boolean>
```

Added in v2.0.0

## ordDate

**Signature**

```ts
export declare const ordDate: Ord<Date>
```

Added in v2.0.0

## ordNumber

**Signature**

```ts
export declare const ordNumber: Ord<number>
```

Added in v2.0.0

## ordString

**Signature**

```ts
export declare const ordString: Ord<string>
```

Added in v2.0.0

## ~~getSemigroup~~

Use `getMonoid` instead

**Signature**

```ts
export declare function getSemigroup<A = never>(): Semigroup<Ord<A>>
```

Added in v2.0.0

# type classes

## Ord (interface)

**Signature**

```ts
export interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

Added in v2.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive)

**Signature**

```ts
export declare function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean
```

Added in v2.0.0

## clamp

Clamp a value between a minimum and a maximum

**Signature**

```ts
export declare function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A
```

Added in v2.0.0

## geq

Test whether one value is _non-strictly greater than_ another

**Signature**

```ts
export declare function geq<A>(O: Ord<A>): (x: A, y: A) => boolean
```

Added in v2.0.0

## gt

Test whether one value is _strictly greater than_ another

**Signature**

```ts
export declare function gt<A>(O: Ord<A>): (x: A, y: A) => boolean
```

Added in v2.0.0

## leq

Test whether one value is _non-strictly less than_ another

**Signature**

```ts
export declare function leq<A>(O: Ord<A>): (x: A, y: A) => boolean
```

Added in v2.0.0

## lt

Test whether one value is _strictly less than_ another

**Signature**

```ts
export declare function lt<A>(O: Ord<A>): (x: A, y: A) => boolean
```

Added in v2.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export declare function max<A>(O: Ord<A>): (x: A, y: A) => A
```

Added in v2.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export declare function min<A>(O: Ord<A>): (x: A, y: A) => A
```

Added in v2.0.0
