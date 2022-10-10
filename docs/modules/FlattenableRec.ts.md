---
title: FlattenableRec.ts
nav_order: 24
parent: Modules
---

## FlattenableRec overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [FlattenableRec (interface)](#flattenablerec-interface)
- [utils](#utils)
  - [tailRec](#tailrec)

---

# model

## FlattenableRec (interface)

**Signature**

```ts
export interface FlattenableRec<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMapRec: <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Result<A, B>>
  ) => (a: A) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## tailRec

**Signature**

```ts
export declare const tailRec: <A, B>(f: (a: A) => Result<A, B>) => (startWith: A) => B
```

Added in v3.0.0
