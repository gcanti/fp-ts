---
title: EitherT.ts
nav_order: 25
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getEitherT (function)](#geteithert-function)

---

# getEitherT (function)

**Signature**

```ts
export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> { ... }
```

Added in v2.0.0
