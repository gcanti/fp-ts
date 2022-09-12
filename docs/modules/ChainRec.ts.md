---
title: ChainRec.ts
nav_order: 15
parent: Modules
---

## ChainRec overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [ChainRec (interface)](#chainrec-interface)
- [utils](#utils)
  - [tailRec](#tailrec)

---

# type classes

## ChainRec (interface)

**Signature**

```ts
export interface ChainRec<F extends HKT> extends Typeclass<F> {
  readonly chainRec: <A, S, R, W, E, B>(
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
