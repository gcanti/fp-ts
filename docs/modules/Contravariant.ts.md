---
title: Contravariant.ts
nav_order: 19
parent: Modules
---

## Contravariant overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Contravariant (interface)](#contravariant-interface)

---

# type classes

## Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F extends HKT> extends Typeclass<F> {
  readonly contramap: <Q, R>(f: (q: Q) => R) => <S, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, Q, W, E, A>
}
```

Added in v3.0.0
