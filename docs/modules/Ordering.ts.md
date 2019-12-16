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
- [eqOrdering (constant)](#eqordering-constant)
- [monoidOrdering (constant)](#monoidordering-constant)
- [~~semigroupOrdering~~ (constant)](#semigroupordering-constant)
- [invert (function)](#invert-function)
- [sign (function)](#sign-function)

---

# Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v2.0.0

# eqOrdering (constant)

**Signature**

```ts
export const eqOrdering: Eq<Ordering> = ...
```

Added in v2.0.0

# monoidOrdering (constant)

**Signature**

```ts
export const monoidOrdering: Monoid<Ordering> = ...
```

Added in v2.4.0

# ~~semigroupOrdering~~ (constant)

Use `monoidOrdering` instead

**Signature**

```ts
export const semigroupOrdering: Semigroup<Ordering> = ...
```

Added in v2.0.0

# invert (function)

**Signature**

```ts
export function invert(O: Ordering): Ordering { ... }
```

Added in v2.0.0

# sign (function)

**Signature**

```ts
export function sign(n: number): Ordering { ... }
```

Added in v2.0.0
