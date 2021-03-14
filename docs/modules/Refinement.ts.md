---
title: Refinement.ts
nav_order: 79
parent: Modules
---

## Refinement overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Refinement (interface)](#refinement-interface)

---

# utils

## Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v3.0.0
