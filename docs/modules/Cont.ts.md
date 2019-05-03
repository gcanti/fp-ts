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
export interface Cont<L, A> {
  (c: (a: A) => L): L
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# cont (constant)

**Signature**

```ts
export const cont: Monad2<URI> = ...
```

Added in v2.0.0
