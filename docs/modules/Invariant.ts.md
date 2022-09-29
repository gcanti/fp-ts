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
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly imap: <S, T>(
    f: (s: S) => T,
    g: (t: T) => S
  ) => <R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, T, R, O, E, A>
}
```

Added in v3.0.0
