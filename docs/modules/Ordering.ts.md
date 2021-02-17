---
title: Ordering.ts
nav_order: 58
parent: Modules
---

## Ordering overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
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

Added in v3.0.0

## Monoid

**Signature**

```ts
export declare const Monoid: M.Monoid<Ordering>
```

Added in v3.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: S.Semigroup<Ordering>
```

Added in v3.0.0

# model

## Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v3.0.0

# utils

## invert

**Signature**

```ts
export declare const invert: Endomorphism<Ordering>
```

Added in v3.0.0

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v3.0.0
