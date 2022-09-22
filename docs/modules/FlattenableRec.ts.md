---
title: FlattenableRec.ts
nav_order: 30
parent: Modules
---

## FlattenableRec overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FlattenableRec (interface)](#flattenablerec-interface)
- [utils](#utils)
  - [tailRec](#tailrec)

---

# type classes

## FlattenableRec (interface)

**Signature**

```ts
export interface FlattenableRec<F extends HKT> extends Typeclass<F> {
  readonly flatMapRec: <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Either<A, B>>
  ) => (a: A) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0

# utils

## tailRec

**Signature**

```ts
export declare const tailRec: <A, B>(f: (a: A) => Either<A, B>) => (startWith: A) => B
```

Added in v3.0.0
