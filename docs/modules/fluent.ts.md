---
title: fluent.ts
nav_order: 34
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fluent (function)](#fluent-function)

---

# fluent (function)

**Signature**

```ts
export function fluent<F extends URIS2, I, L>(I: { URI: F; _L: L } & I): <A>(fa: Type2<F, L, A>) => Fluent2C<F, I, L, A>
export function fluent<F extends URIS2, I>(I: { URI: F } & I): <L, A>(fa: Type2<F, L, A>) => Fluent2<F, I, L, A>
export function fluent<F extends URIS, I>(I: { URI: F } & I): <A>(fa: Type<F, A>) => Fluent1<F, I, A>
export function fluent<F, I>(I: { URI: F } & I): <A>(fa: HKT<F, A>) => Fluent<F, I, A> { ... }
```

Added in v2.0.0
