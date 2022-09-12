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
  ) => <A, S, R, E, B>(
    f: (i: I, a: A) => Kind<F, S, R, E, B>
  ) => <TS, TR, TE>(ta: Kind<T, TS, TR, TE, A>) => Kind<F, S, R, E, Kind<T, TS, TR, TE, B>>
}
```

Added in v3.0.0
