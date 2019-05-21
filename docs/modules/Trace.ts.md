---
title: Trace.ts
nav_order: 84
parent: Modules
---

# Overview

Adapted from https://github.com/garyb/purescript-debug

---

<h2 class="text-delta">Table of contents</h2>

- [spy (function)](#spy-function)
- [trace (function)](#trace-function)

---

# spy (function)

**Signature**

```ts
export function spy<A>(a: A): A { ... }
```

Added in v2.0.0

# trace (function)

**Signature**

```ts
export function trace<A>(message: (a: A) => unknown): (a: A) => A { ... }
```

Added in v2.0.0
