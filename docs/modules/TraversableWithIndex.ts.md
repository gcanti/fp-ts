---
title: TraversableWithIndex.ts
nav_order: 105
parent: Modules
---

## TraversableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [TraversableWithIndex (interface)](#traversablewithindex-interface)

---

# utils

## TraversableWithIndex (interface)

**Signature**

```ts
export interface TraversableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly traverseWithIndex: <G extends HKT>(
    F: Applicative<G>
  ) => <A, S, R, W, E, B>(
    f: (i: I, a: A) => Kind<G, S, R, W, E, B>
  ) => <FS, FR, FW, FE>(fa: Kind<F, FS, FR, FW, FE, A>) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, B>>
}
```

Added in v3.0.0
