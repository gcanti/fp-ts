---
title: struct.ts
nav_order: 96
parent: Modules
---

## struct overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)

---

# instances

## getAssignSemigroup

Return a semigroup which works like `Object.assign`.

**Signature**

```ts
export declare const getAssignSemigroup: <A extends object = never>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/struct'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
```

Added in v2.10.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<{ readonly [K in keyof A]: A[K] }>
```

Added in v2.10.0

## getMonoid

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const getMonoid: <A>(
  monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<{ readonly [K in keyof A]: A[K] }>
```

**Example**

```ts
import { getMonoid } from 'fp-ts/struct'
import * as N from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const M = getMonoid<Point>({
  x: N.MonoidSum,
  y: N.MonoidSum,
})

assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.10.0

## getSemigroup

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const getSemigroup: <A>(
  semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<{ readonly [K in keyof A]: A[K] }>
```

**Example**

```ts
import { getSemigroup } from 'fp-ts/struct'
import * as N from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const S = getSemigroup<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.10.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<{ readonly [K in keyof A]: A[K] }>
```

Added in v2.10.0
