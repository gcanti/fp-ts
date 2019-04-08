---
title: Ordering.ts
nav_order: 66
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Ordering (type alias)](#ordering-type-alias)
- [semigroupOrdering (constant)](#semigroupordering-constant)
- [setoidOrdering (constant)](#setoidordering-constant)
- [invert (function)](#invert-function)
- [sign (function)](#sign-function)

---

# Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

# semigroupOrdering (constant)

**Signature**

```ts
export const semigroupOrdering: Semigroup<Ordering> = ...
```

Added in v1.0.0

# setoidOrdering (constant)

**Signature**

```ts
export const setoidOrdering: Setoid<Ordering> = ...
```

Added in v1.0.0

# invert (function)

**Signature**

```ts
export const invert = (O: Ordering): Ordering => ...
```

Added in v1.0.0

# sign (function)

**Signature**

```ts
export const sign = (n: number): Ordering => ...
```

Added in v1.0.0
