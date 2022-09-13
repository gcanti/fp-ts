---
title: Zero.ts
nav_order: 114
parent: Modules
---

## Zero overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [guard](#guard)
- [type classes](#type-classes)
  - [Zero (interface)](#zero-interface)

---

# constructors

## guard

**Signature**

```ts
export declare const guard: <F extends HKT>(
  F: Zero<F>,
  P: Pointed<F>
) => <S, R = unknown, W = never, E = never>(b: boolean) => Kind<F, S, R, W, E, void>
```

Added in v3.0.0

# type classes

## Zero (interface)

**Signature**

```ts
export interface Zero<F extends HKT> extends Typeclass<F> {
  readonly zero: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
