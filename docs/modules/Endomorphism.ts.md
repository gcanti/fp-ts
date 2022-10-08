---
title: Endomorphism.ts
nav_order: 19
parent: Modules
---

## Endomorphism overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Category](#category)
  - [Composable](#composable)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [model](#model)
  - [Endomorphism (interface)](#endomorphism-interface)
- [type lambdas](#type-lambdas)
  - [EndomorphismTypeLambda (interface)](#endomorphismtypelambda-interface)
- [utils](#utils)
  - [compose](#compose)
  - [id](#id)

---

# instances

## Category

**Signature**

```ts
export declare const Category: category.Category<EndomorphismTypeLambda>
```

Added in v3.0.0

## Composable

**Signature**

```ts
export declare const Composable: composable.Composable<EndomorphismTypeLambda>
```

Added in v3.0.0

## getMonoid

`Endomorphism` form a `Monoid` where the `empty` value is the `identity` function.

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<Endomorphism<A>>
```

Added in v3.0.0

## getSemigroup

`Endomorphism` form a `Semigroup` where the `combine` operation is the usual function composition.

**Signature**

```ts
export declare const getSemigroup: <A>() => Semigroup<Endomorphism<A>>
```

Added in v3.0.0

# model

## Endomorphism (interface)

**Signature**

```ts
export interface Endomorphism<A> {
  (a: A): A
}
```

Added in v3.0.0

# type lambdas

## EndomorphismTypeLambda (interface)

**Signature**

```ts
export interface EndomorphismTypeLambda extends TypeLambda {
  readonly type: Endomorphism<this['InOut1']>
}
```

Added in v3.0.0

# utils

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: (b: B) => C) => <A>(ab: (a: A) => B) => (a: A) => C
```

Added in v3.0.0

## id

**Signature**

```ts
export declare const id: <A>() => Endomorphism<A>
```

Added in v3.0.0
