---
title: Ordering.ts
nav_order: 67
parent: Modules
---

## Ordering overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [reverse](#reverse)
- [destructors](#destructors)
  - [match](#match)
- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
- [model](#model)
  - [Ordering (type alias)](#ordering-type-alias)
- [utils](#utils)
  - [sign](#sign)

---

# combinators

## reverse

**Signature**

```ts
export declare const reverse: (o: Ordering) => Ordering
```

Added in v3.0.0

# destructors

## match

**Signature**

```ts
export declare const match: <A, B, C = B>(
  onLessThan: () => A,
  onEqual: () => B,
  onGreaterThan: () => C
) => (o: Ordering) => A | B | C
```

Added in v3.0.0

# instances

## Eq

**Signature**

```ts
export declare const Eq: eq.Eq<Ordering>
```

Added in v3.0.0

## Monoid

**Signature**

```ts
export declare const Monoid: monoid.Monoid<Ordering>
```

Added in v3.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<Ordering>
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

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v3.0.0
