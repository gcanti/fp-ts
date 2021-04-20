---
title: Endomorphism.ts
nav_order: 26
parent: Modules
---

## Endomorphism overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [utils](#utils)
  - [Endomorphism (interface)](#endomorphism-interface)

---

# instances

## URI

**Signature**

```ts
export declare const URI: 'Endomorphism'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getMonoid

Endomorphism form a `Monoid` where the `empty` value is the `identity` function.

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<Endomorphism<A>>
```

Added in v3.0.0

## getSemigroup

Endomorphism form a `Semigroup` where the `concat` operation is the usual function composition.

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<Endomorphism<A>>
```

Added in v3.0.0

# utils

## Endomorphism (interface)

**Signature**

```ts
export interface Endomorphism<A> {
  (a: A): A
}
```

Added in v3.0.0
