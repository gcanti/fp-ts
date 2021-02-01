---
title: Ordering.ts
nav_order: 64
parent: Modules
---

## Ordering overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
  - [~~eqOrdering~~](#eqordering)
  - [~~monoidOrdering~~](#monoidordering)
  - [~~semigroupOrdering~~](#semigroupordering)
- [model](#model)
  - [Ordering (type alias)](#ordering-type-alias)
- [utils](#utils)
  - [invert](#invert)
  - [sign](#sign)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<Ordering>
```

Added in v2.10.0

## Monoid

**Signature**

```ts
export declare const Monoid: M.Monoid<Ordering>
```

Added in v2.10.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: S.Semigroup<Ordering>
```

Added in v2.10.0

## ~~eqOrdering~~

Use `Eq` instead

**Signature**

```ts
export declare const eqOrdering: E.Eq<Ordering>
```

Added in v2.0.0

## ~~monoidOrdering~~

Use `Monoid` instead

**Signature**

```ts
export declare const monoidOrdering: M.Monoid<Ordering>
```

Added in v2.4.0

## ~~semigroupOrdering~~

Use `Semigroup` instead

**Signature**

```ts
export declare const semigroupOrdering: S.Semigroup<Ordering>
```

Added in v2.0.0

# model

## Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v2.0.0

# utils

## invert

**Signature**

```ts
export declare function invert(O: Ordering): Ordering
```

Added in v2.0.0

## sign

**Signature**

```ts
export declare function sign(n: number): Ordering
```

Added in v2.0.0
