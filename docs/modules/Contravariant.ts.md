---
title: Contravariant.ts
nav_order: 21
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
  readonly contramap: <B, A>(f: (b: B) => A) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
