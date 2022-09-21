---
title: Endomorphism.ts
nav_order: 25
parent: Modules
---

## Endomorphism overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [HKT](#hkt)
  - [EndomorphismF (interface)](#endomorphismf-interface)
- [instances](#instances)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [utils](#utils)
  - [Endomorphism (interface)](#endomorphism-interface)

---

# HKT

## EndomorphismF (interface)

**Signature**

```ts
export interface EndomorphismF extends HKT {
  readonly type: Endomorphism<this['Invariant1']>
}
```

Added in v3.0.0

# instances

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
