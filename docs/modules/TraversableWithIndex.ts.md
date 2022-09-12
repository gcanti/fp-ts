---
title: TraversableWithIndex.ts
nav_order: 106
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
export interface TraversableWithIndex<T extends HKT, I> extends Typeclass<T> {
  readonly traverseWithIndex: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (i: I, a: A) => Kind<F, S, R, W, E, B>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
```

Added in v3.0.0
