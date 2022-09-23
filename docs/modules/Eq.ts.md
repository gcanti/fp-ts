---
title: Eq.ts
nav_order: 28
parent: Modules
---

## Eq overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `E.equals(a, a) === true`
2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [combinators](#combinators)
  - [struct](#struct)
  - [tuple](#tuple)
  - [~~getStructEq~~](#getstructeq)
  - [~~getTupleEq~~](#gettupleeq)
- [constructors](#constructors)
  - [fromEquals](#fromequals)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [eqStrict](#eqstrict)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [~~eqBoolean~~](#eqboolean)
  - [~~eqDate~~](#eqdate)
  - [~~eqNumber~~](#eqnumber)
  - [~~eqString~~](#eqstring)
  - [~~eq~~](#eq)
- [type classes](#type-classes)
  - [Eq (interface)](#eq-interface)
- [utils](#utils)
  - [~~strictEqual~~](#strictequal)

---

# Contravariant

## contramap

A typical use case for `contramap` would be like, given some `User` type, to construct an `Eq<User>`.

We can do so with a function from `User -> X` where `X` is some value that we know how to compare
for equality (meaning we have an `Eq<X>`)

For example, given the following `User` type, we want to construct an `Eq<User>` that just looks at the `key` field
for each user (since it's known to be unique).

If we have a way of comparing `UUID`s for equality (`eqUUID: Eq<UUID>`) and we know how to go from `User -> UUID`,
using `contramap` we can do this

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

**Example**

```ts
import { contramap, Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'

type UUID = string

interface User {
  readonly key: UUID
  readonly firstName: string
  readonly lastName: string
}

const eqUUID: Eq<UUID> = S.Eq

const eqUserByKey: Eq<User> = pipe(
  eqUUID,
  contramap((user) => user.key)
)

assert.deepStrictEqual(
  eqUserByKey.equals({ key: 'k1', firstName: 'a1', lastName: 'b1' }, { key: 'k2', firstName: 'a1', lastName: 'b1' }),
  false
)
assert.deepStrictEqual(
  eqUserByKey.equals({ key: 'k1', firstName: 'a1', lastName: 'b1' }, { key: 'k1', firstName: 'a2', lastName: 'b1' }),
  true
)
```

Added in v2.0.0

# combinators

## struct

**Signature**

```ts
export declare const struct: <A>(eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<{ readonly [K in keyof A]: A[K] }>
```

Added in v2.10.0

## tuple

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<Readonly<A>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Eq'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'

const E = tuple(S.Eq, N.Eq, B.Eq)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
```

Added in v2.10.0

## ~~getStructEq~~

Use [`struct`](#struct) instead.

**Signature**

```ts
export declare const getStructEq: <O extends Readonly<Record<string, any>>>(eqs: { [K in keyof O]: Eq<O[K]> }) => Eq<O>
```

Added in v2.0.0

## ~~getTupleEq~~

Use [`tuple`](#tuple) instead.

**Signature**

```ts
export declare const getTupleEq: <T extends readonly Eq<any>[]>(
  ...eqs: T
) => Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }>
```

Added in v2.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare const fromEquals: <A>(equals: (x: A, y: A) => boolean) => Eq<A>
```

Added in v2.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Eq'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Eq'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## eqStrict

**Signature**

```ts
export declare const eqStrict: Eq<unknown>
```

Added in v2.5.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<Eq<A>>
```

Added in v2.6.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>() => Semigroup<Eq<A>>
```

Added in v2.10.0

## ~~eqBoolean~~

Use [`Eq`](./boolean.ts.html#eq) instead.

**Signature**

```ts
export declare const eqBoolean: Eq<boolean>
```

Added in v2.0.0

## ~~eqDate~~

Use [`Eq`](./Date.ts.html#eq) instead.

**Signature**

```ts
export declare const eqDate: Eq<Date>
```

Added in v2.0.0

## ~~eqNumber~~

Use [`Eq`](./number.ts.html#eq) instead.

**Signature**

```ts
export declare const eqNumber: Eq<number>
```

Added in v2.0.0

## ~~eqString~~

Use [`Eq`](./string.ts.html#eq) instead.

**Signature**

```ts
export declare const eqString: Eq<string>
```

Added in v2.0.0

## ~~eq~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Contravariant` instance, pass `E.Contravariant` instead of `E.eq`
(where `E` is from `import E from 'fp-ts/Eq'`)

**Signature**

```ts
export declare const eq: Contravariant1<'Eq'>
```

Added in v2.0.0

# type classes

## Eq (interface)

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v2.0.0

# utils

## ~~strictEqual~~

Use [`eqStrict`](#eqstrict) instead

**Signature**

```ts
export declare const strictEqual: <A>(a: A, b: A) => boolean
```

Added in v2.0.0
