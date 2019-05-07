---
title: Ordering.ts
nav_order: 64
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Ordering (type alias)](#ordering-type-alias)
- [eqOrdering (constant)](#eqordering-constant)
- [semigroupOrdering (constant)](#semigroupordering-constant)
- [invert (function)](#invert-function)
- [sign (function)](#sign-function)

---

# Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

# eqOrdering (constant)

**Signature**

```ts
export const eqOrdering: Eq<Ordering> = ...
```

Added in v2.0.0

# semigroupOrdering (constant)

**Signature**

```ts
export const semigroupOrdering: Semigroup<Ordering> = ...
```

Added in v2.0.0

# invert (function)

**Signature**

```ts
export const invert = (O: Ordering): Ordering => ...
```

Added in v2.0.0

# sign (function)

**Signature**

```ts
export const sign = (n: number): Ordering => ...
```

Added in v2.0.0
