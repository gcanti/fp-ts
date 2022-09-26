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
export interface FlattenableRec<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMapRec: <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Either<A, B>>
  ) => (a: A) => Kind<F, S, R, O, E, B>
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
