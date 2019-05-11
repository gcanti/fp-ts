---
title: Cont.ts
nav_order: 21
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Cont (interface)](#cont-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [cont (constant)](#cont-constant)

---

# Cont (interface)

**Signature**

```ts
export interface Cont<R, A> {
  (c: (a: A) => R): R
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# cont (constant)

**Signature**

```ts
export const cont: Monad2<URI> = ...
```

Added in v2.0.0
