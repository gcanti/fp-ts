---
title: internal.ts
nav_order: 50
parent: Modules
---

## internal overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [NonEmptyArray (interface)](#nonemptyarray-interface)

---

# utils

## NonEmptyArray (interface)

**Signature**

```ts
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
```

Added in v3.0.0
