---
title: TraversableWithIndex.ts
nav_order: 81
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
export interface TraversableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly traverseWithIndex: <G extends TypeLambda>(
    F: Applicative<G>
  ) => <A, S, R, O, E, B>(
    f: (i: I, a: A) => Kind<G, S, R, O, E, B>
  ) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, B>>
}
```

Added in v3.0.0
