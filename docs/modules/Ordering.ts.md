---
title: Ordering.ts
nav_order: 65
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
export declare const match: <A>(onLessThan: () => A, onEqual: () => A, onGreaterThan: () => A) => (o: Ordering) => A
```

Added in v3.0.0

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

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v3.0.0
