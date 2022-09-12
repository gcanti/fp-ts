---
title: Invariant.ts
nav_order: 50
parent: Modules
---

## Invariant overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Invariant (interface)](#invariant-interface)

---

# type classes

## Invariant (interface)

**Signature**

```ts
export interface Invariant<F extends HKT> extends Typeclass<F> {
  readonly imap: <A, B>(
    f: (a: A) => B,
    g: (b: B) => A
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
