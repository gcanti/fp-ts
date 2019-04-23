---
title: OptionT.ts
nav_order: 59
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getOptionT (function)](#getoptiont-function)

---

# getOptionT (function)

**Signature**

```ts
export function getOptionT<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT3C<M, U, L>
export function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>
export function getOptionT<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2C<M, L>
export function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M> { ... }
```

Added in v2.0.0
