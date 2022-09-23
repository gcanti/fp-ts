---
title: Ordering.ts
nav_order: 72
parent: Modules
---

## Ordering overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [reverse](#reverse)
- [destructors](#destructors)
  - [match](#match)
  - [matchW](#matchw)
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
  - [sign](#sign)
  - [~~invert~~](#invert)

---

# combinators

## reverse

**Signature**

```ts
export declare const reverse: (o: Ordering) => Ordering
```

Added in v2.10.0

# destructors

## match

**Signature**

```ts
export declare const match: <A>(onLessThan: () => A, onEqual: () => A, onGreaterThan: () => A) => (o: Ordering) => A
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <A, B, C>(
  onLessThan: () => A,
  onEqual: () => B,
  onGreaterThan: () => C
) => (o: Ordering) => A | B | C
```

Added in v2.12.0

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

Use [`Eq`](#eq) instead

**Signature**

```ts
export declare const eqOrdering: E.Eq<Ordering>
```

Added in v2.0.0

## ~~monoidOrdering~~

Use [`Monoid`](#monoid) instead

**Signature**

```ts
export declare const monoidOrdering: M.Monoid<Ordering>
```

Added in v2.4.0

## ~~semigroupOrdering~~

Use [`Semigroup`](#semigroup) instead

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

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v2.0.0

## ~~invert~~

Use [`reverse`](#reverse) instead.

**Signature**

```ts
export declare const invert: (o: Ordering) => Ordering
```

Added in v2.0.0
