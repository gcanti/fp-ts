---
title: Ordering.ts
nav_order: 60
parent: Modules
---

# Ordering overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Ordering (type alias)](#ordering-type-alias)
- [eqOrdering](#eqordering)
- [invert](#invert)
- [monoidOrdering](#monoidordering)
- [sign](#sign)
- [~~semigroupOrdering~~](#semigroupordering)

---

# Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v2.0.0

# eqOrdering

**Signature**

```ts
export declare const eqOrdering: Eq<Ordering>
```

Added in v2.0.0

# invert

**Signature**

```ts
export declare function invert(O: Ordering): Ordering
```

Added in v2.0.0

# monoidOrdering

**Signature**

```ts
export declare const monoidOrdering: Monoid<Ordering>
```

Added in v2.4.0

# sign

**Signature**

```ts
export declare function sign(n: number): Ordering
```

Added in v2.0.0

# ~~semigroupOrdering~~

Use `monoidOrdering` instead

**Signature**

```ts
export declare const semigroupOrdering: Semigroup<Ordering>
```

Added in v2.0.0
