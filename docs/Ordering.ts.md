---
title: Ordering.ts
nav_order: 63
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Ordering](#ordering)
- [semigroupOrdering](#semigroupordering)
- [setoidOrdering](#setoidordering)
- [invert](#invert)
- [sign](#sign)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ordering

**Signature** (type alias)

```ts
export type Ordering = -1 | 0 | 1
```

# semigroupOrdering

**Signature** (constant)

```ts
export const semigroupOrdering: Semigroup<Ordering> = ...
```

Added in v1.0.0

# setoidOrdering

**Signature** (constant)

```ts
export const setoidOrdering: Setoid<Ordering> = ...
```

Added in v1.0.0

# invert

**Signature** (function)

```ts
export const invert = (O: Ordering): Ordering => ...
```

Added in v1.0.0

# sign

**Signature** (function)

```ts
export const sign = (n: number): Ordering => ...
```

Added in v1.0.0
