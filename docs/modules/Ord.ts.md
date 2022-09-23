---
title: Ord.ts
nav_order: 71
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
  - [reverse](#reverse)
  - [tuple](#tuple)
  - [~~getDualOrd~~](#getdualord)
  - [~~getTupleOrd~~](#gettupleord)
- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [defaults](#defaults)
  - [equalsDefault](#equalsdefault)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [~~ordBoolean~~](#ordboolean)
  - [~~ordDate~~](#orddate)
  - [~~ordNumber~~](#ordnumber)
  - [~~ordString~~](#ordstring)
  - [~~ord~~](#ord)
- [type classes](#type-classes)
  - [Ord (interface)](#ord-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [equals](#equals)
  - [geq](#geq)
  - [gt](#gt)
  - [leq](#leq)
  - [lt](#lt)
  - [max](#max)
  - [min](#min)
  - [trivial](#trivial)

---

# Contravariant

## contramap

A typical use case for `contramap` would be like, given some `User` type, to construct an `Ord<User>`.

We can do so with a function from `User -> X` where `X` is some value that we know how to compare
for ordering (meaning we have an `Ord<X>`)

For example, given the following `User` type, there are lots of possible choices for `X`,
but let's say we want to sort a list of users by `lastName`.

If we have a way of comparing `lastName`s for ordering (`ordLastName: Ord<string>`) and we know how to go from `User -> string`,
using `contramap` we can do this

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { contramap, Ord } from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

interface User {
  readonly firstName: string
  readonly lastName: string
}

const ordLastName: Ord<string> = S.Ord

const ordByLastName: Ord<User> = pipe(
  ordLastName,
  contramap((user) => user.lastName)
)

assert.deepStrictEqual(
  RA.sort(ordByLastName)([
    { firstName: 'a', lastName: 'd' },
    { firstName: 'c', lastName: 'b' },
  ]),
  [
    { firstName: 'c', lastName: 'b' },
    { firstName: 'a', lastName: 'd' },
  ]
)
```

Added in v2.0.0

# combinators

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Ord<A>) => Ord<A>
```

Added in v2.10.0

## tuple

Given a tuple of `Ord`s returns an `Ord` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...ords: { [K in keyof A]: Ord<A[K]> }) => Ord<Readonly<A>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Ord'
import * as B from 'fp-ts/boolean'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'

const O = tuple(S.Ord, N.Ord, B.Ord)
assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
```

Added in v2.10.0

## ~~getDualOrd~~

Use [`reverse`](#reverse) instead.

**Signature**

```ts
export declare const getDualOrd: <A>(O: Ord<A>) => Ord<A>
```

Added in v2.0.0

## ~~getTupleOrd~~

Use [`tuple`](#tuple) instead.

**Signature**

```ts
export declare const getTupleOrd: <T extends readonly Ord<any>[]>(
  ...ords: T
) => Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never }>
```

Added in v2.0.0

# constructors

## fromCompare

**Signature**

```ts
export declare const fromCompare: <A>(compare: (first: A, second: A) => Ordering) => Ord<A>
```

Added in v2.0.0

# defaults

## equalsDefault

**Signature**

```ts
export declare const equalsDefault: <A>(compare: (first: A, second: A) => Ordering) => (x: A, y: A) => boolean
```

Added in v2.10.0

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
export declare const getMonoid: <A = never>() => Monoid<Ord<A>>
```

**Example**

```ts
import { sort } from 'fp-ts/Array'
import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
import * as S from 'fp-ts/string'
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { concatAll } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

interface User {
  readonly id: number
  readonly name: string
  readonly age: number
  readonly rememberMe: boolean
}

const byName = pipe(
  S.Ord,
  contramap((p: User) => p.name)
)

const byAge = pipe(
  N.Ord,
  contramap((p: User) => p.age)
)

const byRememberMe = pipe(
  B.Ord,
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
const O1 = concatAll(M)([byName, byAge, byRememberMe])
assert.deepStrictEqual(sort(O1)(users), [
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])

// now `rememberMe = true` first, then by name, then by age
const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
assert.deepStrictEqual(sort(O2)(users), [
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])
```

Added in v2.4.0

## getSemigroup

A typical use case for the `Semigroup` instance of `Ord` is merging two or more orderings.

For example the following snippet builds an `Ord` for a type `User` which
sorts by `created` date descending, and **then** `lastName`

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<Ord<A>>
```

**Example**

```ts
import * as D from 'fp-ts/Date'
import { pipe } from 'fp-ts/function'
import { contramap, getSemigroup, Ord, reverse } from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

interface User {
  readonly id: string
  readonly lastName: string
  readonly created: Date
}

const ordByLastName: Ord<User> = pipe(
  S.Ord,
  contramap((user) => user.lastName)
)

const ordByCreated: Ord<User> = pipe(
  D.Ord,
  contramap((user) => user.created)
)

const ordUserByCreatedDescThenLastName = getSemigroup<User>().concat(reverse(ordByCreated), ordByLastName)

assert.deepStrictEqual(
  RA.sort(ordUserByCreatedDescThenLastName)([
    { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
    { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
    { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
  ]),
  [
    { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
    { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
    { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
  ]
)
```

Added in v2.0.0

## ~~ordBoolean~~

Use [`Ord`](./boolean.ts.html#ord) instead.

**Signature**

```ts
export declare const ordBoolean: Ord<boolean>
```

Added in v2.0.0

## ~~ordDate~~

Use [`Ord`](./Date.ts.html#ord) instead.

**Signature**

```ts
export declare const ordDate: Ord<Date>
```

Added in v2.0.0

## ~~ordNumber~~

Use [`Ord`](./number.ts.html#ord) instead.

**Signature**

```ts
export declare const ordNumber: Ord<number>
```

Added in v2.0.0

## ~~ordString~~

Use [`Ord`](./string.ts.html#ord) instead.

**Signature**

```ts
export declare const ordString: Ord<string>
```

Added in v2.0.0

## ~~ord~~

Use [`Contravariant`](#contravariant) instead.

**Signature**

```ts
export declare const ord: Contravariant1<'Ord'>
```

Added in v2.0.0

# type classes

## Ord (interface)

**Signature**

```ts
export interface Ord<A> extends Eq<A> {
  readonly compare: (first: A, second: A) => Ordering
}
```

Added in v2.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive)

**Signature**

```ts
export declare const between: <A>(O: Ord<A>) => (low: A, hi: A) => (a: A) => boolean
```

Added in v2.0.0

## clamp

Clamp a value between a minimum and a maximum

**Signature**

```ts
export declare const clamp: <A>(O: Ord<A>) => (low: A, hi: A) => (a: A) => A
```

Added in v2.0.0

## equals

**Signature**

```ts
export declare const equals: <A>(O: Ord<A>) => (second: A) => (first: A) => boolean
```

Added in v2.11.0

## geq

Test whether one value is _non-strictly greater than_ another

**Signature**

```ts
export declare const geq: <A>(O: Ord<A>) => (first: A, second: A) => boolean
```

Added in v2.0.0

## gt

Test whether one value is _strictly greater than_ another

**Signature**

```ts
export declare const gt: <A>(O: Ord<A>) => (first: A, second: A) => boolean
```

Added in v2.0.0

## leq

Test whether one value is _non-strictly less than_ another

**Signature**

```ts
export declare const leq: <A>(O: Ord<A>) => (first: A, second: A) => boolean
```

Added in v2.0.0

## lt

Test whether one value is _strictly less than_ another

**Signature**

```ts
export declare const lt: <A>(O: Ord<A>) => (first: A, second: A) => boolean
```

Added in v2.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export declare const max: <A>(O: Ord<A>) => (first: A, second: A) => A
```

Added in v2.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen

**Signature**

```ts
export declare const min: <A>(O: Ord<A>) => (first: A, second: A) => A
```

Added in v2.0.0

## trivial

**Signature**

```ts
export declare const trivial: Ord<unknown>
```

Added in v2.11.0
