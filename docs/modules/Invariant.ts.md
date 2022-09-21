---
title: Invariant.ts
nav_order: 52
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
  readonly imap: <S, T>(
    f: (s: S) => T,
    g: (t: T) => S
  ) => <R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, T, R, W, E, A>
}
```

Added in v3.0.0
